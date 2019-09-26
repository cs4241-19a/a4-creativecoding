import interact from "./piano-interact.js";


window.onload = function () {
    interact.setup();
};


// Modal

const modal = document.getElementById("helpModal");
const btn = document.getElementById("help");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
};

span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};