## Brian's Paint Program

your hosting link e.g. http://a4-charlieroberts.glitch.me

My application is a simple paint program which allows the user to draw using an array of colors and brush sizes.To start drawing, simply hold down the left mouse button and move your mouse around the screen. This will make you draw with the currently selected color. Additionally, you can also select the eraser brush to erase parts of your drawing. On the top right of the page you will find the options menu, with this you are able to choose your brush, your brush color, and your brush size. Additionally, you can clear the current drawing or change the background color. From this menu you can also save your current drawing or load a picture to draw on. To bring the help documentation back up, press the "Welcome" button.

There are a few challenges I faced while developing, one of which is that I had trouble figuring out how to get it so the user can select an image from their computer to load into the canvas. Another challenged I face was making the modules in the first place and getting them interact with HTML elements in the way that I wanted. 

The linter I used ESLint through Visual Studio Code. The rules my linter followed was adding semicolons at the end of all the line, correcting improper indentation using tabs, and deleting unnecessary spaces in parens and after semicolons.

## Technical Achievements
- **Tech Achievement 1**: Implemented jQuery, jQuery UI and jQuery Confirm for manipulating HTML elements, handling the "Welcome!!" popup documentation and handling confirmation popups
- **Tech Achievement 2**: Allow for the loading of images onto the canvas to be drawn on and to have the canvas be saved as an image
- **Tech Achievement 3**: Implemented dat.GUI handle the GUI seen in the top right corner

### Design/Evaluation Achievements
- **Design Achievement 1**: Implemented dat.GUI to create a menu in the top right corner that can also be collapsed
- **Design Achievement 2**: Allowed the "Welcome!!" popup documentation to be brought back up by pressing a button
- **Design Achievement 3**: Allow users to change the background color of the drawing canvas 
- **Design Achievement 4**: Made confirmation dialogue boxes before the user clears their drawing such as when when they change the background or use the "Clear" button
- **Design Achievement 5**: Allow users to save their drawing as an image to their desktop