## Canvas Conway's Game of Life

http://a4-pjjankowski.glitch.me

I implemented Conway's Game of Life on canvas. My implementation
allows users to generate random configurations on an 80x80 grid based on a random number of starting cells,
while also allowing for them to see several premade configurations that are available as preset options.
  
I use three of my own modules in this application, (one of which is just for handling alerts), along with dat.gui, 
which are loaded in using require syntax from node in main.js, and bundled into bundle.js with browserify.
Although the specifications of the assignment said to use ES6 modules, Professor Roberts said that including my modules in this manner 
was acceptable.
  
dat.gui allows for users to adjust aspects of the game as follows:
1. Background color
2. Cell color
3. Pausing and resuming the game
4. Initial number of cells if a random configuration
5. Using a preset or random configuration
6. Resetting the game based on the last saved configuration

Additionally, the user can adjust aspects of the game as follows:
7. Clicking on an individual cell while the game is paused changes it from living to dead, or vice versa. 

The main challenge in making this application was in trying to modularize the generation and configuration of the game seperately.
I also wanted to give users who did not know much about how complex the game can actually get something that they could
enjoy, so I setlled on allowing for premade configurations, randomly generated configurations, and allowing users to individually
change cells themselves.
  
My JS linter was semistandard. With it, the following rules were enforced on my code:
1. All rules at https://github.com/standard/standard/blob/master/RULES.md from the standard linter, such as using two spaces for indentation, single quotes for strings, and camel case for naming variables and functions.
2. Semicolons are enforced where necessary. I just like having them.
Note that since I used browserify to generate my bundle.js file, bundle.js is not styled according to the semistandard linter rules.
All js files that I have written myself follow the semistandard linter, though.

For HTML, (index.html), I used the validator at https://validator.w3.org.
For CSS, (what little I use in style.css), I used the validator at http://jigsaw.w3.org/css-validator/.

## Technical Achievements
- **Tech Achievement 1**: I have implemented an algorithm which allows users to randomly generate patterns based on a number of starting cells from 0 to 5000.

### Design/Evaluation Achievements
- **Design Achievement 1**: I have included several premade configurations for users, including a recreation of the famous Gosper's glider gun.
- **Design Achievement 2**: After testing on desktop and mobile, I chose a canvas size of 400x400 for as large of a view as possible
  without requiring much scrolling while viewing on mobile.
- **Design Achievement 3**: I followed best practices for accessibility, and there are no <div> or <span> elements in my document.
