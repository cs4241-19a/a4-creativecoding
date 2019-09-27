Assignment 4 - Creative Coding: Interactive Multimedia Experiences
===
## Rainbow Cube Viewer
http://a4-nbloniarz.glitch.me

This website displays a editable cube that flashes rainbow colors and plays rainbow road on loop.

The rainbow road audio is from https://downloads.khinsider.com/game-soundtracks/album/mario-kart-8

- A challenge I faced in the application was getting the audio to play after the first interaction. Based on the loading speed of the page initially the audio would play with no interaction needed, but this was then later blocked by Chrome. Another challenge was that my auto format would conflict with the linter, and therefore there are overrides regarding some formatting aspects.
- The linter I used was eslint. A minor problem I had wne using it was I overrode the default formatter so there are quite a few ignore spacing comments at the top of my files. I mainly used the linter to enforce semicolons and that all variables declared are used. Once again this was overridden in the visuals.js file to supress the warning about THREE not being defined.

## Technical Achievements
- **Used PUG for the Page Generator**: The index and layout files use pug to dynamically insert data. Used to insert title of page and put that in a paragraph on the webpage
- **Audio Integration Using Three.JS**: My page uses Three.JS to load an audio file and play the audio on loop.

### Design/Evaluation Achievements
- **Dynamic Layout**: I ensured that the dat.gui interface would always be locked next to the Three.JS scene to make sure the controls were clear.
- **Cube Animation**: The cube in the Three.JS scene rotates at and editable pace and the rate of color change can be edited as well.
