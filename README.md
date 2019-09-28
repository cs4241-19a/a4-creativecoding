Assignment 4 - Creative Coding: Interactive Multimedia Experiences
===
## 3D Lamborgini Environment Viewer

The professor gave me an extension on this assignment.

a4-amandaeze97.glitch.me

This project is a 3D environment view of a lamborgni. It uses three.js to display the 3D graphic of the lamborgini.
The application uses `OrbitControls` in the three.js library. This allows the user to rotate around the object and
manipulate the viewing angle. The user can also interact with the visual element by scrolling to zoom in & out.

- The application uses an Express server with both `compression` and `helmet` middleware
- I used ES6 modules to deliver the `dat.gui` UI controls to the `main.js` file
- A challenge I faced was that sometimes my code would run properly on glitch and sometimes glitch would "glitch",
  resulting in my code not running. I wasn't able to figure out the issue before the deadline.
- Sometime you might have to wait a while for the application to render all the images of the lambo object.
  
- **Tech Achievement 1**: I used the `MTLLoader` and `OBJLoader` classes in three.js to build a 3D object. 
