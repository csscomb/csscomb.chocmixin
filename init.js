/*!
 * CSScomb mixin for Chocolat
 * Copyright(c) 2012 Nicholas Penree <nick@penree.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Comb = require('csscomb');

var COMPATIBLE_SCOPES = [
  'plain.text',
  'css.source',
  'less.source',
  'sass.source'
];

/**
 * Hook up menu items.
 */

Hooks.addMenuItem('Actions/CSS/Sort via CSScomb', 'control-shift-c', function() {
  var output = '', err = '', sel, text, scope;
  
  Recipe.run(function(recipe) {
    sel = (!recipe.selection.length)? new Range(0, recipe.length) : recipe.selection;
    text = recipe.textInRange(sel);
    scope = Document.current().rootScope();
    
    if (!text || COMPATIBLE_SCOPES.indexOf(scope) === -1) {
      Alert.beep();
      return;
    }
    
    recipe.replaceTextInRange(sel, new Comb().processString(text));
    
    return undefined;
  });
});
