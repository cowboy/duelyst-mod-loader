// in console:
// eval(fs.readFileSync('../bootstrap.js', 'utf8'))

// in index.html:
// <script src="../../../../bootstrap.js" crossorigin></script>

const MOD_DIR = '../mods';

const fs = require('fs');
const path = require('path');

fs.readdirSync(MOD_DIR).forEach(modFile => {
  const script = fs.readFileSync(path.join(MOD_DIR, modFile), 'utf8');
  if (/MOD:UNSAFE/.test(script)) {
    eval(script);
  }
  else {
    const require = undefined;
    eval(script);
  }
})
