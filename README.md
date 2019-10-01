Readme
---

## AudiViz - A digital audio visualizer

Link: https://a4-jchengz.glitch.me/

The application I built is an audio visualizer. I was inspired to create the visualizer with two concentric rings of rotating cubes, where the rings are 
rotating in opposite directions for effect. There are three songs included: techno, musician, and pop. There is a feature to upload an MP3 file. 

Controls for the user: 
Menu: 
- Play => Play audio
- Pause => Pause audio
- Reset => Set audio to play from start
- Choose File => Click to upload MP3 file locally

Dat.Gui:
- cameraX => change the x position of the camera
- cameraY => change the y position of the camera
- cameraZ => change the z position of the camera
- colorOuterRing => change the color of the blocks in the outer ring
- colorInnerRing => change the color of the blocks in the inner ring
- colorIcosahedron => change the color of the icosohedron (geometry in the center)


I had a lot of difficulty coming up with original ideas and ideas that would address all of the requirements of this project, yet also be a feasible project for me
to complete with the allotted time. In particular, I had a lot of difficulting with the modularization of js files, as well as "installing" a linter. I searched for an online 
JS linter and found JSHint:https://jshint.com/. Details on the specifics of the rules followed by this linter can be found at: https://jshint.com/docs/ , 
but the linter checked for presence of semicolons, double quotes, and flagged extra spaces (spaces between and after lines) as well as proper selective importing. Additionally,
this linter also checked for unused resources, improper construction of objects, as well as flagging for ES versions. Camel Case was accounted for externally. 
One of the most difficult technical challenges was getting the cubes to rotate and appear as they do, as well as figuring out how to get the camera to be properly placed
with the correct field of view. It's not perfect but it does the job. Similarly, it took a lot of time to figure out how to properly read a mp3 file in. I found an implemented 
a solution that allowed me to be play the audio as well as process the frequency to be used for the animations.

## Technical Achievements
- **Tech Achievement 1**: Orbital Controls enable the use of clicking and dragging to change view.
- **Tech Achievement 2**: Three.js 3D shapes controlled by audio frequency
- **Tech Achievement 3**: MP3 File uploading & data processing (to be analysed by the analyser)


### Design/Evaluation Achievements
- **Design Achievement 1**: Bootstrap for styling buttons and formatting buttons + dropdown menu.
- **Design Achievement 2**: Cross-browser utilization for popular browers like Chrome & Edge
- **Design Achievement 3**: Play, Pause, and reset for music (with multiple music options) and gemoetry shading features.

