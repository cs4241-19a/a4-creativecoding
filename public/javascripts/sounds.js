let audioContext = new AudioContext();
let gain = audioContext.createGain();
let oscillator = audioContext.createOscillator();
let pan = audioContext.createStereoPanner();
let reverb = audioContext.createConvolver();
let analyser = audioContext.createAnalyser();
oscillator.connect(gain).
    connect(pan).
    connect(analyser).
    connect(audioContext.destination);

let isOscillatorStopped = false;
let oscs = [];

function init() {
  oscillator.start();
  $(document).keyup((e) => {
    if (e.which === 32) {
      toggleOscillator();
    }
  });

  $('canvas').click(function(e) {
    let osc = audioContext.createOscillator();
    let gain = audioContext.createGain();
    let bounds = e.target.getBoundingClientRect();
    let x = e.clientX - bounds.left;
    let y = $(this).innerHeight() - (e.clientY - bounds.top);
    osc.frequency.value = scale(x, 0, $(this).innerWidth(), 27.5, 4000);
    osc.type = $('#type').val()
    gain.gain.value = scale(y, 0, $(this).innerHeight(), .001, 1);
    osc.connect(gain).connect(analyser).connect(audioContext.destination);
    osc.start();
    oscs.push({osc: osc, gain: gain});
  });

  $('canvas').mousemove(function(e) {
    let bounds = e.target.getBoundingClientRect();
    let newX = e.clientX - bounds.left;
    let newY = $(this).innerHeight() - (e.clientY - bounds.top);
    if (!isOscillatorStopped) {
      oscillator.frequency.value = Math.round(
          scale(newX, 0, $(this).innerWidth(), 27.5, 4000));
      gain.gain.value = scale(newY, 0, $(this).innerHeight(), .001, 2);
    }
    $('#freq').text = oscillator.frequency.value + ' Hz';
  });

  $('#reverb').change(function() {
    if ($(this).val() === '') {
      reverb.disconnect();
      gain.connect(pan);
    }
    fetch(`IMreverbs/${$(this).val()}.wav`).
        then((response) => response.arrayBuffer()).
        then((buffer) => {
          audioContext.decodeAudioData(buffer, (impulse) => {
            reverb.buffer = impulse;
            gain.disconnect();
            gain.connect(reverb).connect(pan);
          });
        });
  });
  $('#pan').change(() => {
    pan.pan.value = $('#pan').val();
  });
  $('#type').change(function() {
    oscillator.type = $(this).val();
  });
}

function toggleOscillator() {
  if (isOscillatorStopped) {
    gain.gain.setValueAtTime(gain.gain.value, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(1, audioContext.currentTime + .03);
  } else {
    gain.gain.setValueAtTime(gain.gain.value, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.00001,
        audioContext.currentTime + .03);
  }
  isOscillatorStopped = !isOscillatorStopped;
}

function scale(num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

module.exports = {init: init, toggle: toggleOscillator, analyzer: analyser};
