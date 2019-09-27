Assignment 4 - Creative Coding: Interactive Multimedia Experiences
===

## Character Creator

http://a4-michaelbosik.glitch.me

This application is intended to be a demonstration of three.js and Node.JS modules. It utilises the three.js library to render a model
to the screen that can be manipulated by user input. The size, shape and color of the model can all be changed using the sliders and
color pickers below the model.

The goal of this application was to originally be a character creation and a small game using the created character, however I did not have
enough time to create a game.

The biggest challenge I had in creating this project was attempting to bundle my modules into one bundle.js file. I kept getting the error of
only modules can export and import things which confused me because this prevented me from creating the modules in the first place. Eventually,
I discovered a missing piece of syntax in my browserify command that allowed me to successfully bundle my modules.

The JS linter I used is eslint that extends the Google lint rules. I had disabled the no-unused-vars rule because during development I had
functions that I was still working on or functions that were not directly used within that class that the linter still believed to be unused.
Otherwise, the linter checks for proper documentation, line length and declaration of variables. It automatically fixed most errors I had in terms of syntax.

## Technical Achievements
- **Tech Achievement 1**: I wrote my own custom character creation and scene creation modules that I bundled into one JS file
- **Tech Achievement 2**: I created my own animation using three.js mesh transformations
- **Tech Achievement 3**: I allowed the head on the model to be changed by generating different mesh shapes in three.js
- **Tech Achievement 4**: Used reactive programming to handle user entered events and treat them accordingly

### Design/Evaluation Achievements
- **Design Achievement 1**: I uses SASS to style my page and re-compiled into CSS for the HTML to read
- **Design Achievement 2**: I followed best practices for accessibility
- **Design Achievement 3**: I have clean linted and documented code
