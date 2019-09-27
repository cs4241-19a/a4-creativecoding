## 3D Animation Interactions

https://a4-randyagudelo.glitch.me/

- The goal of the application is for the user to have fun with animations through interactions (through the use of three.js). 
The application displays several icosahedrons where the user can interact with a range of aspects such as the number of shapes,
size, rotation, background color, and camera/perspective. 

- Initial challenges I faced were: 

 1. Trying to give the dat.gui functionality in a way that interacts with three.js elements. 

2. It was quite difficult to figure out how exactly to incorporate mouse controls so that the user is able to control the camera through OrbitControl.js as
I was having trouble trying to implement it. 

3. Creating a function that is able to update (increase/decrease) the number of shapes in the background based off the user interface was
quite difficult to figure out.

- I used standard.js as the linter. Some of its rules are use 2 spaces for indentation, no un-used variables, always use strict equality and inequality ('==='),
commas have a space after them, else statements are on the same lines as their curly braces, no semicolons, multiple blank lines are not allowed, and more. The rules can be seen online. 
I did not use the linter on the OrbitControls.js file because that is just a library/package. I have it 'hard coded' because the other methods to include it did not work for me.

## Technical Achievements
- **Tech Achievement 1**: Created a function that was able to maintain the center of focus on the main shape in the center when the window gets resized. 
This means that if the window gets resized the main shape will always be in the center no matter what. 
- **Tech Achievement 2**: Created more than 6 parameters for user control. (These parameters include changing the background color, 
adjusting the rotation of the background shapes on the x,y,z axes, adjusting the scale of the background shapes on the x,y,z axes, 
increasing or decreasing the number of background shapes, changing the display of the background shapes to wireframe, changing the 
camera position on either x or z axes, and user controlled camera option) 
- **Tech Achievement 3**: Created the functionality/option for the user to be able to freely control the camera/perspective using mouse control 
while also allowing the user to return to the default camera position. 

### Design/Evaluation Achievements
- **Design Achievement 1**: I ensured that my application would be able to be viewed correctly and possibly run on both desktops / mobile devices by adding 
the meta tag viewport and adding functionality that ensures that the main shape will always take the center of focus on whatever screen. This is done primarily
so that the webpage is able to optimize the view when on mobile devices.
- **Design Achievement 2**: I followed best practices for accessibility as there are no `<div>` or `<span>` elements in my document.
