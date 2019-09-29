var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

modal.style.display = "block";

span.onclick = function() {
  modal.style.display = "none";
};

function display() {
  modal.style.display = "block";
}

module.exports = {
  modal,
  display
};
