# CS 4241 Assignment 4: Audio Visualizer

Author: Rui Huang

## How to use the web app?

### Run locally

Install `npm` and `Node.js`, then run:

`
$ npm install
`

`
$ npm start
`

And go to `localhost:3000`

### Online application

Or you can also view the online application here:

Link to the web app: http://a4-ryc1x.glitch.me

## Summary

- This is a audio visualizer application implemented using mainly Three.js and Web Audio API
- Used three modules in js/modules file
- User can interact with the app through dat.GUI, which provides 10 parameters interactions
- Uses Express.js as back-end framework
- Used ESlint for code validate code

### Technical Achievements

- **Audio Control**: Allow user to play/pause/stop music
- **File Upload**: Allow user to upload their local music file to the app
- **Geometry**: Used Three.js plane and cylindric geometry and tweaked parameters
- **User Interactivity**: let user to define parameters like intensity, color, width, rotation, etc.

### Design/Evaluation Achievements

- **Sweet Alert**: Designed the help message with sweet alert package
- **Nav bar**: Designed the nav bar and put audio functionalities in it
- **Visualizer**: Tweaked the mesh materials of the geometry to make it looks better
- **Project Structure:** The project is well-structured, static files are in /public folder. Modules are in js/modules folder
- **User Test**: Test the app with 5 different students and made some improvements based on the suggestions.

## Note

The web app uses resources from following sites:

- Three.js
- Dat GUI
- Booststrap
- SweetAlert
- jQuery
- Google Fonts