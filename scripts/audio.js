 
let sound = function(src) {
        let s = document.createElement("audio");
        s.src = src;
        s.setAttribute("preload", "auto");
        s.setAttribute("controls", "none");
        s.style.display = "none";
        document.body.appendChild(s);
        return s
}

let play = function(n){
    n.play();
}

let stop = function(n){
    n.pause();
}

let loop = function(n){
    n.loop = true;
    n.play();
}
      
export {play, stop, loop, sound}

       

       