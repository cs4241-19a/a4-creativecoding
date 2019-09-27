## 3D Mario Viewer

https://a4-benemrick.glitch.me

This project uses three.js (https://threejs.org/) to display a 3D graphic of Mario in the browser. The application used `OrbitControls` in the three.js library to allow the user to rotate around the object and manipulate the viewing angle. The user can also interact with the visual element by scrolling to zoom in & out.

- The application uses an Express server with both `compression` and `helmet` middleware
- I used ES6 module to deliver the `dat.gui` UI controls to the `main.js` file
- I installed the ESLint plugin in VS Code to execute the ESLint linter to statically analyze the Javascript code. The ESLInt configuration enforces that the javascript execute in both the browser and node as well as comply with ES6 standards.
- I struggled significantly with implementing the module stack including `browserify` + `babel` + `gulp`. I was unable to successfully implement this build process while maintianing the functionality and dependecny structure that three.js relies on. This struggle prevented me from building my desired functionality of the application.

## Technical Achievements
- **Tech Achievement 1**: I utilized the `MTLLoader` and `OBJLoader` classes in three.js to build a 3D object in the DOM. 

### Design/Evaluation Achievements
- **Design Achievement 1**: I used Font Awesome to display the question mark icon which toggles the application's basic documentation.
