//////////////////////////////////////////
//////////////////////////////////////////
//       PROJECT REQUIRED MODULES       //
//////////////////////////////////////////
//////////////////////////////////////////
import graphicsFunction from "./visuals.js";
import controlFunction from "./pageControl.js";
//////////////////////////////////////////
//////////////////////////////////////////
//                 CLOSE                //
//////////////////////////////////////////
//////////////////////////////////////////

window.alert("Help:\n To toggle controls use the GUI on the right-hand side of the page.\nControls:\nrotate: controls rotation speed on the named axis\nscale: controls scale of cube on the named axis\nanimationSpeed: controls speed of the color changes");
controlFunction.loadSound;

document.querySelector("#helpImage").addEventListener("click", controlFunction.toggleHelp);

//RUNNING THREEJS FILE
graphicsFunction();