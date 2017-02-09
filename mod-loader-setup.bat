<!-- : Begin batch script
@echo off
cscript //nologo "%~f0?.wsf"
echo.
pause
exit /b

----- Begin wsf script --->
<job><script language="JScript">

var MODLOADER_BRANCH = 'master';

function log() {
  WScript.Echo([].slice.call(arguments).join(' '));
}

log('==============================================');
log('=            Duelyst mod loader v1           =');
log('==============================================');
log('=   Copyright (c) 2017 "Cowboy" Ben Alman    =');
log('==============================================');
log('= https://github.com/duelyst-mods/mod-loader =');
log('==============================================');

log();

var fso = new ActiveXObject('Scripting.FileSystemObject');

function fetchUrl(url, path) {
  log('Downloading:', url);
  var xmlHttp = new ActiveXObject('MSXML2.XMLHTTP');
  xmlHttp.open('GET', url, false);
  xmlHttp.send();
  if (xmlHttp.status === 200) {
    var stream = new ActiveXObject('ADODB.Stream');
    stream.open();
    stream.type = 1;
    stream.write(xmlHttp.ResponseBody);
    stream.position = 0;
    log('Writing file:', path);
    stream.saveToFile(path, 2);
    stream.close();
  }
}

function getFetcher(baseUrl) {
  return function(path, filePath) {
    var url = baseUrl + '/' + path;
    if (!filePath) {
      filePath = path.replace(/\//g, '\\');
    }
    fetchUrl(url, filePath);
  }
}

var fetchAsset = getFetcher('https://raw.githubusercontent.com/cowboy/duelyst-mod-loader/' + MODLOADER_BRANCH);

function readFile(path) {
  log('Reading file:', path);
  var f = fso.OpenTextFile(path, 1);
  var result = f.ReadAll();
  f.Close();
  return result;
}

function readJsonFile(path) {
  var json = readFile(path);
  eval('var obj = ' + json);
  return obj;
}

function createDir(path) {
  if (!fso.FolderExists(path)) {
    log('Creating directory:', path);
    fso.CreateFolder(path);
    return true;
  }
}

log('Running setup!');
log();

try {
  var installs = readJsonFile('..\\installs.json');
  log('> Duelyst version', installs.duelyst.version, 'detected');
  log();
} catch (err) {
  log();
  log('Error parsing Duelyst "installs.json" file.');
  log('Ensure this .bat file is located in the ".counterplay\\duelyst" directory.');
  WScript.quit(1);
}

createDir('mod-loader');
fetchAsset('mod-loader/setup.js');
eval(readFile('mod-loader\\setup.js'));

</script></job>
