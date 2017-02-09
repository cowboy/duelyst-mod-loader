// Duelyst mod loader
// Copyright (c) 2017 "Cowboy" Ben Alman
// https://github.com/cowboy/duelyst-mod-loader

const MOD_DIR = '../mods';

const fs = require('fs');
const path = require('path');

const mods = {};

// When some condition is met, run some code. Ugly polling. Whatever.
mods.run = {
  log(...args) { console.log('[mods.run]', ...args); },
  timeoutId: null,
  tests: [],
  when(name, testFn, runFn) {
    this.tests.push({ name, testFn, runFn });
    this.log('register:', name);
    if (!this.timeoutId) {
      this.checkTests();
    }
  },
  checkTests() {
    this.log('check tests');
    const { tests } = this;
    for (let i = 0; i < tests.length; i++) {
      const { name, testFn, runFn } = tests[i];
      if (testFn()) {
        this.log('run:', name);
        runFn();
        tests.splice(i, 1);
        i--;
      }
    }
    if (tests.length > 0) {
      this.timeoutId = setTimeout(() => this.checkTests(), 30);
    }
    else {
      this.timeoutId = null;
    }
  },
};

// Load and eval each mod script.
fs.readdirSync(MOD_DIR).forEach(modFile => {
  const script = fs.readFileSync(path.join(MOD_DIR, modFile), 'utf8');
  if (/MOD:UNSAFE/.test(script)) {
    eval(script);
  }
  else {
    const require = undefined;
    eval(script);
  }
});
