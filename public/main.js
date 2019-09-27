import {create} from "/image.js";
import {updatePage} from "/input.js";


document.getElementById ("create").addEventListener ("click", create, false);
document.getElementById ("help").addEventListener ("click", help, false);
document.getElementById ("close").addEventListener ("click", close, false);


function help() {
    var x = document.getElementById("instructions");
  x.style.display = "block";
}

function close(){
  var x = document.getElementById("instructions");
  x.style.display = "none";
}

window.addEventListener('load', 
  function() { 
    updatePage();
    help();
    create();
  }, false);


// window.onload(create());