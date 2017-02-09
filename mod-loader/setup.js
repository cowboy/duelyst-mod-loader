// Duelyst mod loader
// Copyright (c) 2017 "Cowboy" Ben Alman
// https://github.com/cowboy/duelyst-mod-loader

var MODS_BRANCH = 'cowboy-patch-1';

function writeFile(path, text) {
  log('Writing file:', path);
  var f = fso.CreateTextFile(path, true);
  f.Write(text);
  f.Close();
}

function deleteFile(path) {
  log('Deleting file:', path);
  if (fso.fileExists(path)) {
    fso.deleteFile(path);
  }
}

function getTempFilePath() {
  return fso.GetSpecialFolder(2) + '\\' + fso.GetTempName();
}

var fetchMod = getFetcher('https://raw.githubusercontent.com/duelyst-mods/mods/' + MODS_BRANCH);

function fetchMods() {
  var temp = getTempFilePath();
  fetchMod('mods.json', temp);
  var mods = readJsonFile(temp);
  for (var key in mods) {
    var mod = mods[key];
    log('Fetching mod:', mod.name, '(' + mod.description + ')');
    fetchMod('mods/' + key + '.js');
  }
  deleteFile(temp);
}

fetchAsset('mod-loader/mod-loader.js');

if (createDir('mods')) {
  fetchMods();
}

var base = 'v' + installs.duelyst.version + '\\resources\\app\\src\\';
var src = base + 'index.html';
var bak = src + '.bak';

var html = readFile(src);

var script = '<script id=modloader src="../../../../mod-loader/mod-loader.js" crossorigin><\/script>';

var newHtml = html.replace(/<script( id=modloader)?[\s\S]*?<\/script>/, function(match, isModloader) {
  if (isModloader) {
    if (match === script) {
      log('> Up-to-date mod loader script tag detected.');
      return match;
    }
    log('> Out-of-date mod loader script tag detected, updating...');
    return script;
  }
  log('> No mod loader script tag detected, adding...');
  return script + match;
})

if (newHtml !== html) {
  log('Creating backup of Duelyst index...');
  writeFile(bak, html);
  log('Updating Duelyst index...');
  writeFile(src, newHtml);
}
else {
  log('No changes needed!');
}
