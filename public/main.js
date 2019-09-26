import {mixer, mixer_loader} from './mixer.js'
import {openOverlay, closeOverlay} from "./overlay.js";

window.onload = function () {
    openOverlay();

    const left = mixer('Left');
    const right = mixer('Right');

    // Weird workaround to not create audio until user interacts with page
    let left_runner, right_runner;
    const init_audio = function () {
        left_runner = left.init();
        right_runner = right.init();
        mixer_loader('Left', left, left_runner);
        mixer_loader('Right', right, right_runner);
        document.removeEventListener("click", init_audio);
    };
    document.addEventListener("click", init_audio);
};

document.getElementById('openHelp').onclick = openOverlay;
document.getElementById('overlay').onclick = closeOverlay;
