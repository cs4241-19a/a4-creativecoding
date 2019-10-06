const canvas = require('./canvas.js');
const sounds = require('./sounds.js');

window.onload = () => {
  canvas.init();
  sounds.init();
  $('body').keyup((e) => {
    if (e.key === ' ') {
      sounds.toggle();
    }
    if (e.key === '?') {
      introJs().start();
    }
  });
  introJs().start();
};

