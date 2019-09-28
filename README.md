## Octagonal Bar Audio Visualizer

Link: https://a4-jwplante.glitch.me/

This web application creates a bar visualization centered around an octagonal base of a preset song (defined by the /public/data/test.mp3 file. Users that wish to deploy this web application on their own have to supply their own MP3 file.). The song that is hosted on the main webpage is "Teamwork" by Scott Holmes. Additionally, the user can interact with a GUI to play and pause the song (one interactive element), determine the background color, the color of the base, the gradient colors of bars (two interactive elements), and the maximum length of the bars. A help window is also provided when the user loads the page giving instructions as to how to use the application. The main difficulties in creating this application were creating the visualization, since it was difficult to align the bars to match the sides of the base, and modularizing the application using ES6 modules and browserify.

## Technical Achievements
- **Splitting the Frequencies into Eight Averaged Bins**: I wrote my own custom way to visualize the eight bars by averaging the elements of a set number of bins.


### Design/Evaluation Achievements
- **Sane Default Colorscheme**: While users can deign unlimited colorschemes using the visualization tools, I used the GUI to find a sane default colorscheme with green and red bars, as well as a dark grey base.
