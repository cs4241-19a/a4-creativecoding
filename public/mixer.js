const mixer = function (side) {
    const obj = {};
    obj.side = side;

    const audio = document.querySelector("#audio" + side);
    const track_img = document.createElement('img');
    const playbackSpeed = document.querySelector('#speed' + side);
    const timeScrubber = document.querySelector('#scrub' + side);
    const ppButton = document.querySelector('#pause' + side);
    const canvas = document.getElementById("canvas" + side);
    const volumeControl = document.querySelector('#mixerSlider');

    let current_angle = 0;
    let isPlaying = false;

    obj.setSrc = function (name) {
        track_img.src = 'audio/' + name + '.jpg';
        audio.src = 'audio/' + name + '.mp3';
        audio.load();
        audio.pause();
        audio.playbackRate = playbackSpeed.value;
        isPlaying = false;
        current_angle = 0;
        ppButton.value = 'Play';
        ppButton.removeAttribute('disabled');
    };

    obj.init = function () {
        const context = new AudioContext();
        const gainNode = context.createGain();
        const src = context.createMediaElementSource(audio);
        const analyser = context.createAnalyser();

        // update audio level on change of mixer slider
        audio.onloadeddata = function () {
            timeScrubber.max = audio.duration;
            gainNode.gain.value = side === 'Right' ? volumeControl.value : -volumeControl.value;
        };
        // update playback speed on change of user slider
        playbackSpeed.addEventListener('change', function () {
            audio.playbackRate = this.value;
        });
        // Time Scrubbing
        // update progress bar with current time
        audio.addEventListener('timeupdate', function () {
            timeScrubber.value = this.currentTime;
        });
        // reset progress bar and rotation when track ends
        audio.addEventListener('ended', function () {
            isPlaying = false;
            audio.pause();
            current_angle = 0;
            timeScrubber.value = 0;
            ppButton.value = 'Play';
        });
        // update track location on progress bar change by user
        timeScrubber.addEventListener('change', function () {
            audio.currentTime = this.value;
        });

        // Volume control
        volumeControl.addEventListener('input', function () {
            gainNode.gain.value = side === 'Right' ? this.value : -this.value;
        });

        src.connect(gainNode).connect(context.destination);

        // Play/Pause
        ppButton.addEventListener('click', function () {
            if (isPlaying) {
                isPlaying = false;
                audio.pause();
                ppButton.value = 'Play';
            } else {
                isPlaying = true;
                audio.play();
                ppButton.value = 'Pause';
            }
        });

        canvas.width = 450;
        canvas.height = 450;
        const ctx = canvas.getContext("2d");

        src.connect(analyser);
        analyser.connect(context.destination);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const bar_width = 2;
        const bars = 150;
        const rotation = 0.5;

        let center_x = canvas.width / 2;
        let center_y = canvas.height / 2;
        let image_x = center_x / 2 + 12;
        let image_y = center_y / 2 + 13;
        let radius = 100;

        track_img.onload = function () {
            ctx.drawImage(track_img, image_x, image_y, radius * 2, radius * 2);
        };

        const run = function render() {
            // reset
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            requestAnimationFrame(render);

            //draw a circle
            ctx.beginPath();
            ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();

            // Cut out circle
            ctx.save();
            ctx.beginPath();
            ctx.arc(radius + image_x, radius + image_y, radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            // Draw rotated image
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(current_angle * Math.PI / 180);

            // spin image if the track is playing
            if (isPlaying) {
                current_angle = (current_angle + rotation * audio.playbackRate) % 360;
            }

            ctx.drawImage(track_img, -radius, -radius, radius * 2, radius * 2);
            ctx.restore();

            // Cut out circle
            ctx.beginPath();
            ctx.arc(image_x, image_y, radius, 0, Math.PI * 2, true);
            ctx.clip();
            ctx.closePath();
            ctx.restore();

            analyser.getByteFrequencyData(dataArray);

            //divide a circle into equal parts
            let rads = Math.PI * 2 / bars;

            // Draw each bar
            for (let i = 0; i < bars; i++) {
                let bar_height = dataArray[i] * 0.5;

                let x = center_x + Math.cos(rads * i) * (radius);
                let y = center_y + Math.sin(rads * i) * (radius);
                let x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
                let y_end = center_y + Math.sin(rads * i) * (radius + bar_height);

                ctx.strokeStyle = "rgb(0,0,205)";
                ctx.lineWidth = bar_width;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x_end, y_end);
                ctx.stroke();
            }
        };
        return run;
    };
    return obj;
};

const mixer_loader = function (side, mixer_obj, runner_ojb) {
    const selector = document.getElementById('selection' + side);

    document.getElementById('load' + side).onclick = function () {
        mixer_obj.setSrc(selector.value);
        runner_ojb();
    };
};


export {mixer, mixer_loader};