let s = document.createElement("audio");
 
let sound = function(src) {
        s.src = src;
        s.setAttribute("preload", "auto");
        s.setAttribute("controls", "none");
        s.style.display = "none";
        document.body.appendChild(s);
}

let play = function(){
    s.play();
}

let stop = function(){
    s.pause();
}

let loop = function(){
    s.loop = true;
    s.play();
}
      
export {play, stop, loop, sound}

       

       