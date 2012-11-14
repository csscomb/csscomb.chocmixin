/*!
 * CSScomb mixin for Chocolat
 * Copyright(c) 2012 Nicholas Penree <nick@penree.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var spawn = require('child_process').spawn;

/**
 * Hook up menu items.
 */

Hooks.addMenuItem('Actions/CSS/Sort via CSScomb', 'control-shift-c', function() {
  var output = '', err = '', sel, text, comb;
  
  Recipe.run(function(recipe) {
    sel = (!recipe.selection.length)? new Range(0, recipe.length) : recipe.selection;
    text = recipe.textInRange(sel);
    
    if (!text || Document.current().rootScope() !== 'css.source') {
      Alert.beep();
      return;
    }
    
    comb = spawn('php', [ __dirname + '/run.php', text ]);
    
    comb.stdout.on('data', function (data) {
      output += data.toString('utf8');
    });
    
    comb.stderr.on('data', function (data) {
      err += data.toString('utf8');
    });
    
    comb.on('exit', function (code) {
      if (code !== 0) return undefined;
      
      if (err) {
        Alert.show('Unable to sort via CSScomb.', err, [ 'OK' ]);
        return;
      }
      
      Recipe.run(function(r) {
        r.replaceTextInRange(sel, output);
      });
    });
    
    return undefined;
  });
});