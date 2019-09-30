Assignment 4 - Creative Coding: Interactive Multimedia Experiences
===
Deliverables
---


## Music Visualizer

NOTE: Please run this as localhost in a FireFox browser and enable autoplay 
(Preferences -> Privacy & Security -> Permissions -> Autoplay -> Allow Audio & Video)

For my project, I created a music visualization app using the three.js library to render a "3-D" experience. In order to make my application respond to the music, I first pull out all the frequency data and put it into an array. This array is updated multiple times a second, and I use arbitrary elements in the array to alter things such as the color of the cubes, their rotation speed, and the camera rotation. You are also able to change multiple fields in the visualizer through the datGUI such as the camera distance, lighting, the rotation speed of the cubes, etc. 


- The goal of the application was to have three.js objects influenced by the frequency data of a given mp3.
- A huge challenge I faced deploying this project. I don't have any experience with other hosting options, so I really tried to get this working through glitch, but in the end I figure I should just show you guys that I actually did a lot of work on this project and upload what I have working through localhost.
- The linter I used was ESLint, which is the standard option in Webstorm.

## Technical Achievements
- **Tech Achievement 1**: My audiovisualizer uses frequency analysis to drive visualization.
- **Tech Achievement 2**: My application provides the user with 10 separate fields that alter the visualization
- **Tech Achievement 3**: My application provides statistics in the top left of the screen regarding the fps the application is running at.


