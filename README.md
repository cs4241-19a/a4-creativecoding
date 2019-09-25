## 3D Audio Visualization

http://a4-percyjiang.glitch.me

- **Goal**: Interactive audio visualization using Three.js, Canvas, and Web Audio API.
- **Challenges**: 
    - Some features in 'Audio Context' are deprecated so my switching songs feature is crippled.
    - Switching one song to another works fine, but switching it back to an already played song doesn't work.
    - Reattaching audio source using the 'disconnect()' function does not work for already played songs.
    - I did a lot of research, it seems like everyone is getting this problem and there's no solution yet.
- **Server**: Express, includes 'compression' and 'helmet'. On Glitch.
- **Frameworks**: Mainly 'Three.js'. Also 'canvas' and 'Web Audio API'.
- **User Interaction**: 'dat.gui' with 9 parameters.
- **Dismissable Documentation**: Shows up at the beginning, dismissable, redisplayable.
- **Modules**: Featured 4 modules.
- **Linter**:
    - Visual Studio Code has built-in eslint.
    - Installed 'standard.js' and ran 'npx standard'
    - Tons of erros found in 'build files', where I downloaded from 'Three.js' GitHub.
    - Tons of conflicts with Visual Studio Code built-in formatter. 
    - Ex: 'Newline required at end of file but not found.' (but VScode automatically deletes new line at end of file)
    - I installed numerous VScode extention formatters to validate html, css, and js. It works better than linter.

## Technical Achievements
- **Audio Control**:
    - Implemented functionalities to play, pause, and stop the music.
    - Developed features to change songs.
    - There are drawbacks, please see the 'Challenge' section.
- **Frequency Manipulate**: Implemented frequency data to make the cubes rotate and change color along with music.
- **Three.js Components**: Researched a lot of 'Three.js' documentations, used spotlight to make better visualization.
- **Extra Geometry**: I tested the visualization with multiple 'Three.js' geometries, decided to use 'cube' in the end.
- **Sweet Alert**: Shows the dismissable documentation. Asks for confirmation when user tries to change song.
- **Font Awesome**: Beautiful icons for inline elements. I used it on the navbar.

### Design/Evaluation Achievements
- **Extra Control Parameters**: I have 9 parameters for user control.
- **Navigation Bar**: Navigation bar to hold buttons.
- **User Testing**:
    - I asked my friends to test the project and give feedback.
    - The results of user testing leads to better visualization.
    - Other feedback lead to songs that makes the visualization cool.
- **Test Driven Development**: Kept a TODO list along developing and tested each feature once completed an item on TODO list.