Assignment 4 - Creative Coding: Interactive Multimedia Experiences
===
Baseline Requirements
---
My application implements the minimal requirements and functionalities:

1) Server using express that uses compression and helmet.

2) A client-side interactive experience that uses Canvas.

3) User Control Parameters:
   - Keyboard ^ button moves red block user north
   - Keyboard > button moves red block user east
   - Keyboard "down" button moves red block user south
   - Keyboard < button moves red block user west
   - Bedtime Button, when clicked, enables user to see the time to gauge their bedtime.
   - Goal and How to Move Buttons display an alert that provide users with more instruction on how the game works.
   - When the initial directions are clicked, they disappear to create more space. They are then replaced by a shorter and inspirational(positive) message.
   - Enter Brick You Landed On button prompts users to type in what tile they are currently on after they have moved. It then gives the user a message back indicating another action before the user has to roll the die again.
   - The yellow "HELP!!" field at the bottom of the page lets the user just hover their mouse to get easy directions.
   
4) My application initially displays basic documentation for the user interface when the application first loads.It can disappear once clicked on as explained in the user control parameters above^

5) My application has index.html, main.js, second.js, and third.js

6)  My application uses the ES Linter through Webstorm.

7) My HTML and CSS validates through Webstorm.
----------------------------------------------------------------------------------------
4. Ensure that your project has the proper naming scheme `a4-yourname` so we can find it.

6. Create and submit a Pull Request to the original repo. Name the pull request using the following template: `a4-gitname-firstname-lastname`.

## Application Name: Zoo Adventure

the hosting link e.g. http://a4-charlieroberts.glitch.me

### Zoo Adventure is an online and interactive board game that a user can play online and on the go. The user is able to move the piece with their keyboard and also interact with the buttons and instructions provided. They can play this game on the go as a mess-free way to relax before bedtime.

- Goal of the Application: 
  - The user has to navigate through the game by rolling a die, moving the red block piece to the correct tile, and the executing the movement for the tile they have landed on by pressing the button. They have to make it to the end of the path to the picnic basket before their bed time. Time button is provided so the user can keep track of the time while using the application without exiting it.

- Challenges:
   - My canvas(board game layout) disappeared each time I tried to implement ES6 modules. I have included the code in my files such as the import and export system, but that may be a bug with just canvas. Right now I have made sure that the interface allows the user to interact with it, but my ES6 code is present in my files.
   - Other things to note: I originally had a visualization with dat.gui and three js, but that unexpectedly stopped working properly yesterday so I had to place a large part of my energy and soul into creating this new project in time.
- Linter:
   - I used ES Lint via Webstorm, and it alligns my starting and closing tags. It enforces the consistent use of either function declarations and expressions

## Technical Achievements
- **Tech Achievement 1**: I implemented Javascript functions using the Date and Math libraries(getting time and selecting a random number between 1 and 6 for the die roll)
- **Tech Achievement 2**: I implemeted more than 6 ways that the user can interact with the board game interface and had to write multiple respective functions.

### Design/Evaluation Achievements
- **Design Achievement 1**: The application is minimalistic is color so that all the attention can be focused on the colorful board game. The other user interface buttons are alligned neatly and are out of the way of the gameboard.
- **Design Achievement 2**:The application is very convenient to use. The user can simulate rolling a die and even getting a response for the tile they land on without 3d objects such as dice and cards! The game is mess free! In addition, the user can play the game at their own pace and does not have to wait for another player.
- **Design Achievement 3**: The application is relaxing and requires repetitive actions. It is great for users to play when they are winding down, relaxing, and trying to fall asleep. The user can even check the time within the application to make sure that it is not their bedtime.

## Other Resources:
- https://i.pinimg.com/originals/db/29/31/db2931e5414bdaf6fe15ba8df10e2cde.jpg
- w3 schools- especially for the movement of the red block on the canvas
- codepen
- canvas and javascript documentation online
