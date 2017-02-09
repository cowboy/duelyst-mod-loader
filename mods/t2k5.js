// A few scripts from https://duelyststats.info/scripts/scriptlist.html
mods.run.when('t2k5 scripts', () => global.$, () => {
  $.getScript('https://duelyststats.info/scripts/deckTracker.js');
  $.getScript('https://duelyststats.info/scripts/newstatscript.js');
  $.getScript('https://duelyststats.info/scripts/collectionEnhancement.js', () => {
    global.collectionMod = new CollectionEnhancementModule();
  });
  $.getScript('https://duelyststats.info/scripts/rememberChat.js');
  $.getScript('https://duelyststats.info/scripts/UIHelper.js', () => {
    global.UIHelperMod = new UIHelperModule();
  });
});
