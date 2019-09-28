## Audio Visualizer

https://yangjack1998-a4-creativecoding-1.glitch.me/public/

This is a audio visualizer which allows user to upload music and visualize these music. Users can choose either click 
to choose the file or simply drag it in. They can also custom the scale and color of the visualizer. 

The biggest challenge
for this is the drag-in part since the browser open the file in default. It also took me a long time to learn how to get 
the file and decode it to array that can be applied to three.js
Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:

This project used standard.js linter which is easy to use(no configuration), help you format code and find potential errors. 
Some of its rules are:use two spaces as indentation, use single quotation mark for strings, no redundant variables, no semicolons, space after if, etc.
In this project, most of the errors are fix automatically and manually. Some errors still existed either since it is in a library js like dat.gui.js and OrbitControl.js or it is just have to be in that way.



## Technical Achievements
- **Multiple Uploading Ways**: Created two ways for users to upload music, either have a search window to browser or just simply drag the file in.
- **User Interactivity**: User are able to choose songs, scale and color

### Design/Evaluation Achievements
- **Gradual Change in Color**: The color of the cubes reflects the frequency of the music. The darker color, the lower frequency
- **Hidden Input Element**: In `index.html`, the input element with type 'file' is actually hidden since the style of it is not
fit the webpage. Thus, I made it invisible and used a clickable text to cover it.
- **Custom Scale and Color**: Users can change the scale and color based on their preference.

