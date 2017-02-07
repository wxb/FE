define(function(require) {

  var Spinning = require('./spinning');
  console.log(Spinning);

  var s = new Spinning('#container');
  s.render();

});

