Assignment 4 - Creative Coding: Interactive Multimedia Experiences
===

## Conway's Game of Life

http://a4-samtalpey.glitch.me

- This application runs John Conway's game of life in the browser, allowing the user to manipulate various aspects of the simulation and run diferent layouts
- I was originally planning on creating a 3d audio visualizer, but I had too much trouble trying to figure it out and scrapped the project to switch to the game of life. This presented a large time challenge.
- For my JS linter, I used JSHint and it's default list of warnings. This includes items such as semicolons, properly scoped variable references, and many more options (all of which can be found at https://jshint.com/docs/options/)
- A useful reference for strictness is located here https://devhints.io/jshint

## Technical Achievements
- **Trailing Effect**: Implemented a trailing effect on canvas animations by adding a semi-transparent white layer
- **Zoom Functionality**: Implemented the ability to zoom by scaling the display function's size for each pixel
- **Dynamic Layout Changes**: Layout changes when selected and retains other variables from the GUI
- **Stop/Start Functionality**: Implemented stop/start so that the game resumes from where it was stopped without rebuilding the board
- **dat.GUI**: Implemented dat.GUI for multiple variable including a color controller, selector, and booleans

### Design/Evaluation Achievements
- **Semantic HTML**: I followed best practices for accessibility by using semantic HTML. There are no `<div>` or `<span>` elements in my document.
- **Color Change**: Added functionality to change the color of cells on the grid for users
