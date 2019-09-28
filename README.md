Assignment 4 - Creative Coding: Interactive Multimedia Experiences
## Your Web Application Title

Ching Wing Cheng https://chingwing-a4.glitch.me/

The Project allows you to choose a Final Fantasy Character of your choice: Gladio Amicitia, Ignis Scientia, Noctis Lucis Caelum, Prompto Argentum. Choose any character by clicking on his image. It will then bring you to a to another page where you can move the character around as you like using the w, a, s, d keys. Press j to attack and press k for a special attack. Press u and the character does a little action. Press h during the game to see game controls again.

The goal of the application was to create the a mini game where the player chooses a character and has the freedom to roam around the canvas and invoke a few cool animations of the characters. One of the biggest challenges was the animation of the characters and movement around the canvas. I used the JS linter built in Webstorm, the environment I used to code my project. I allowed it to tolerate for statements and "this" and had it assumed ES6, a brower, and node.js.

## Technical Achievements
- **Animations**: Created anmiations of game characters using sprite sheets. Animated by sectioning sprite sheets and setting them in frames to be animated in intervals. Also fixing position of character as the character is not always at the same place when changing to a different sprite sheet for a different action. Fixing the positions created a smoother transition from one action to another.
-**Key Actions**: Assign animations of different actions to keyboard keys.
-**PopUp**: Set a pop up for "help", showing the the game controls, using sweetAlert. 

### Design/Evaluation Achievements
- **Canvas Size and Background**: Set canvas to match the size of window. Backgroud would repeat itself when canvas in larger than the window. Edited the background image so it would look smoother when it is repeated. 
