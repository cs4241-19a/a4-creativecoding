(function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = 'function' == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error('Cannot find module \'' + i + '\'');
          throw a.code = 'MODULE_NOT_FOUND', a;
        }
        var p = n[i] = {exports: {}};
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }
      return n[i].exports;
    }

    for (var u = 'function' == typeof require && require, i = 0; i <
    t.length; i++) o(t[i]);
    return o;
  }

  return r;
})()({
  1: [
    function(require, module, exports) {
      const sounds = require('./sounds.js');
      const analyzer = sounds.analyzer;
      analyzer.fftSize = 2048;
      let bufferLength = analyzer.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);
      let isFreqAnalysis = false;
      let canvas;

      function init() {
        canvas = document.querySelector('#scope').getContext('2d');
        canvas.clearRect(0, 0, window.innerWidth, window.innerHeight * 2 / 3);
        canvas.canvas.width = window.innerWidth;
        canvas.canvas.height = window.innerHeight * 2 / 3;
        draw();

        $('.fa-clock').click(() => {
          analyzer.fftSize = 2048;
          bufferLength = analyzer.frequencyBinCount;
          dataArray = new Uint8Array(bufferLength);
          canvas.clearRect(0, 0, canvas.canvas.innerWidth,
              canvas.canvas.innerHeight);
          isFreqAnalysis = false;
        });

        $('.fa-signal').click(() => {
          analyzer.fftSize = 256;
          bufferLength = analyzer.frequencyBinCount;
          dataArray = new Uint8Array(bufferLength);
          canvas.clearRect(0, 0, canvas.canvas.innerWidth,
              canvas.canvas.innerHeight);
          isFreqAnalysis = true;
        });
      }

      let fpsInterval = 1000 / 15;
      let then = Date.now();

      function draw() {
        requestAnimationFrame(draw);
        let now = Date.now();
        let elapsed = now - then;

        // if enough time has elapsed, draw the next frame

        if (elapsed < fpsInterval) {

          // Get ready for next frame by setting then=now, but also adjust for your
          // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
          return;
        }
        then = now - (elapsed % fpsInterval);
        if (!isFreqAnalysis) {
          analyzer.getByteTimeDomainData(dataArray);

          canvas.fillStyle = 'rgb(5,26,96)';
          canvas.fillRect(0, 0, window.innerWidth, window.innerHeight * 2 / 3);
          canvas.lineWidth = 2;
          canvas.strokeStyle = 'rgb(255,255,255)';
          canvas.beginPath();
          let sliceWidth = window.innerWidth / bufferLength;
          let x = 0;
          for (let i = 0; i < bufferLength; i++) {

            let v = dataArray[i] / 128.0;
            let y = v * window.innerHeight * 2 / 3 / 2;

            if (i === 0) {
              canvas.moveTo(x, y);
            } else {
              canvas.lineTo(x, y);
            }

            x += sliceWidth;
          }
          canvas.lineTo(window.innerWidth, (window.innerHeight * 2 / 3) / 2);
          canvas.stroke();
        } else {
          analyzer.getByteFrequencyData(dataArray);
          canvas.fillStyle = 'rgb(5, 26, 96)';
          canvas.fillRect(0, 0, window.innerWidth, window.innerHeight * 2 / 3);
          let barWidth = (window.innerWidth / bufferLength) * 5;
          let barHeight;
          let x = 0;
          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 2;

            canvas.fillStyle = 'rgb(' + 255 + ',255,255)';
            canvas.fillRect(x, 0, barWidth, barHeight);

            x += barWidth + 1;
          }
        }
      }

      module.exports = {init: init, draw: draw, isFreqAnalysis: isFreqAnalysis};

    }, {'./sounds.js': 3}], 2: [
    function(require, module, exports) {
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

    }, {'./canvas.js': 1, './sounds.js': 3}], 3: [
    function(require, module, exports) {
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
          gain.gain.exponentialRampToValueAtTime(1,
              audioContext.currentTime + .03);
        } else {
          gain.gain.setValueAtTime(gain.gain.value, audioContext.currentTime);
          gain.gain.exponentialRampToValueAtTime(.00001,
              audioContext.currentTime + .03);
        }
        isOscillatorStopped = !isOscillatorStopped;
      }

      function scale(num, in_min, in_max, out_min, out_max) {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) +
            out_min;
      }

      module.exports = {
        init: init,
        toggle: toggleOscillator,
        analyzer: analyser,
      };

    }, {}],
}, {}, [2]);
