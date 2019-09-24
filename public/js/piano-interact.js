
function setup() {
    const lPiano = pianoClosure("piano1");
    const rPiano = pianoClosure("piano2");
    lPiano.init(keyPressed);
    rPiano.init(keyPressed);
}

let keyPressed = () => console.log("key press not bound");

// function keyPressed(startNote, endNote, duration) {
//
// }

function pianoClosure(pianoId) {
    const piano = document.getElementById(pianoId);

    const init = function (f) {
        piano.querySelectorAll("rect").forEach(function (key) {
            key.onclick = f;
        })
    };

    return {init}
}

export default {setup}