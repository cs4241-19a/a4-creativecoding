## The Big Bang Theory TV Show Viewer

http://a4-danielcaffrey.glitch.me

This project uses d3.js and dat.gui to display information about the show "The Big Bang Theory".

- The goal is to give a small taste of how D3 can visualize data by letting the user affect the visualization
- Integrating d3.js and dat.gui was a challenge, as I have never used either and there were not too 
many examples that I found online
- I have been using the standard.js linter, which has been checking for syntax errors and 
coding style violations. The only problems being flagged by the linter currenlty are:
  - Undefined variables (which are really just variables like d3 that are defined using the imported scripts)
  - Two instances of using '==' as opposed to '===' (which was done for convenience as I coded and changed how
variables would be passed in)
  - Addition of strings being used as opposed to "path.join()" when making the response to a get request in server.js
  
Notes:
- When a user goes straight from the help screen to an episode/series, the help screen goes away, but the drop down menu for the help screen does not update
- When a user types a number into sroll bar, this sometimes causes the data to be printed twice

## Technical Achievements
- **Tech Achievement 1**: Using d3.js, visualized data from a JSON file containing information about the TV Show "The Big Bang Theory" 
- **Tech Achievement 2**: Using dat.gui, allowed the user to select either an episode or a season of the show, and to view information accordingly
- **Tech Achievement 4**: Using dat.gui, allowed the user to customize the colors they saw when viewing episodes in a particular series
- **Tech Achievement 5**: Using dat.gui, created a help screen that can be dismissed and brought back at any point
- **Tech Achievement 6**: Used a standard.js as a linter 
- **Tech Achievement 7**: Implemented functions for gathering data from the JSON file in modules
- **Tech Achievement 8**: Use of express with compression and helmet middlewears


### Design/Evaluation Achievements
- **Design Achievement 1**: I followed best practices for accessibility, including providing alt attributes for images and using semantic HTML. There are no `<div>` or `<span>` elements in my document.
