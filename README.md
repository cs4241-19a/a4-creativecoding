## Audio Visualizer

![App](/public/media/app.png)

Hosted on Glitch: https://a4-manasmehta18.glitch.me

- **Goal**: Audio Visualizer is a web application that visualizes different genres of music and allows the user to control different aspects of the visualization.

- **Challenges**: I had to think hard about transferring data between modules and minimize the use if global variables by maximizing parameters to functions. Also had to figure out changing which variables 
will change which aspects of the visualizer. Biggest challenge was to change parameters in realtime without triggering an audio playback.

- **JS linter**: I used the `standard.js` linter

## Technical Achievements
- **Tech Achievement 1**: Integrated two frameworks (Web Audio API and Canvas) to implement an audio visualizer
- **Tech Achievement 2**: The parameters for the visualizer are updates in realtime without restarting the song
- **Tech Achievement 3**: Server implements serve-favicon middleware and the html shows a panda favicon
- **Tech Achievement 4**: Minimized duplication of functions by making 4 modules with all the major functions in them
- **Tech Achievement 5**: Minimized use of global variables and modularized the code by passing all components of the visualizer as parameters to the functions in the modules
- **Tech Achievement 6**: Implemented video element

### Design/Evaluation Achievements
- **Design Achievement 1**: Hard coded all the css stylesheet
- **Design Achievement 2**: The bars in the visualizer show a gradient of colors and brightness that varies depending on the bar height and width
- **Design Achievement 3**: Built a custom info menu as a pop up semi-transparent screen which can be triggered using a button - built this from scratch (without using the in built pop up box)
- **Design Achievement 4**: Created an aesthetic css stylesheet for the pop up window
- **Design Achievement 5**: The pop up window can be toggled while the visualizer is still running and the visualizer can be seen through the semi-transparent pop up
- **Design Achievement 6**: Made a gradient of red -> blue -> green for the title
- **Design Achievement 7**: The color buttons use transitions and change color depending on which color they add to the visualization
- **Design Achievement 8**: All the spacing, color schemes and minute details are well thought 
