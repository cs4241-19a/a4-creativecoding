Assignment 4 - Creative Coding: Interactive Multimedia Experiences
===

## Medieval Battle Simulator Online

See the site at http://a4-kdoje.glitch.me

For my project I wanted to create a battle simulator that used the emergent behavior of the different entities to simulate a battle. In this simulator, the red an blue knights will patrol (walk left and right), until they see a knight of the other color. They will run toward the nearest enemy and attack them, reducing their health. Once a knight's health is 0 they're removed from the simulator. To user is able to pause the simulator to remove and add knights as they wish. The screen can be cleared with the X button, and additional information can be shown/hidden with the question button. The strength (damage the knight does) and health (amount of damage it can take before being removed) can be set the text boxes.

- Challenges
    * The main challenge I faced was creating a way for the entities to move around and interact with each other. For instance they need to be able to share, access and modify states of other objects on the canvas. To overcome this I created a gameManager singleton that holds all object data
    * The second challenge was creating a way to manage input from the user. I accomplished this by adding a game object to the game manager that attached listeners on startup and broadcasted its state to other game objects in the manager.
    * The last challenge was glitch's strange behavior with the canvas. In certain cases it wouldn't display the canvas, and showed no errors. To fix this, I ensured the page was loaded before initializing the gameManager.

## Technical Achievements
- **Build tool choice**: I evaluated multiple build tools and determined the best one for my use case. I used npm scripts, browserify, babelify and nodemon for the build system.
- **Singleton gameManager**: Created a singleton gameManager instead of using a global. This makes testing and expandablity easier
- **Front-end testing**: I created tests for the front-end of the application by using jasmine and spies. This allowed me to confirm the operation of the gameManager without needing real DOM objects.
- **Engine Expandability**: I created an engine using the gameManager and stateManager that can be easily expanded for future projects

### Design/Evaluation Achievements
- **Materialize**: I continued to use materialize.css to maintain a clean and uniform look
- **Input confirmation**: I ensured that all successful user interactions are confirmed with a visual (ripple or toast). This ensures the user knows how their input is used by the system.
