## Andrew's Epic Paint Tool
# By Andrew Nolan

https://a4-acnolan.glitch.me/

This application is like microsoft paint. If paint was in the browser and made by a student in a week
instead of a nearly billion dollar company and a team of professionals.

Within the app you can draw or edit images. Basic functionality includes clicking on a canvas and 
moving the mouse to draw things. You can change the color, size, and shape of the brush. You can
also fill or clear the canvas if you want. Most cool is you can load images to edit, and save
your beautiful masterpieces.

I added music from The Joy of Painting with Bob Ross, along with dancing Shaggy and Carl
to give the site a more cozy vibe.

The web technology I used was canvas with 2d context.

Users can interact by changing the brush color, size, and linecap.
There are three linecap styles for canvas, round, square, and butt.
I didn't make up butt, that's a real thing.
The user can also load and save images, fill the canvas, select 
custom colors, and of course draw stuff.

The main challenge I faced in this assignment was getting the modules to work.
I did eventually get modules to work by including an additional module called
loader, that loaded after the main.js module. This loader module
assigns functions from the module to buttons that need to use them. onclick
in the markup was not working. 

The modules were attempted to be split up based on functionality alerts,
files, and painting stuff (kept in main due to variable declarations I was
having trouble messing around with).

Only one HTML file is used in this assignment, index.html.
index.html does validate according to: https://validator.w3.org/
However, it still gives a warning that the color selector is not
supported in all browsers. In my testing I have found that
IE and Edge do not support this feature. However the html
has no errors, just the one warning.

All of the css styling is done in my file style.css.
I validated it using https://jigsaw.w3.org/css-validator/
according to this site the css has no errors. Awesome!

The linter I used was semistandard. The full rules can be found here: https://standardjs.com/rules.html
Except semistandard adds the bonus rule of lines need to end with semicolons.
I chose this linter because I really really like semicolons!
A general idea of things this linter includes are: single quotes for strings, 2 space indentation,
no unused variables, space after keywords, space after and before {}, space around operators,
space after commas, a whole lot of other things, and most importantly SEMICOLONS!



## Technical Achievements
- **Tech Achievement 1**: Users can load files from their local PC and edit them in this app.
                          The program does not allow users to load files that are not images (jpg, png, gif, etc...)
- **Tech Achievement 2**: The paint canvas is 800px X 500 px. If an image does not fit in the canvas and
                          is loaded I have written code to scale it to fit while maintaining it's aspect ratio.
- **Tech Achievement 3**: After a user is done working on an image they can save it! The javascript includes code
                          to download and save the canvas as a .png file.
### Design/Evaluation Achievements
- **Design Achievement 1**: I tested the program in various browsers to ensure it works:
                            It works fully on desktop chrome, firefox, and safari                            
                            Everything except the custom color selector works in Edge
                            The app does not work in IE :(
                            Drawing on the canvas does not work on mobile :(
- **Design Achievement 2**: I had my roommate try to break the app. He was unable to do
                            anything malicious. Unlike with my past assignments...
- **Design Achievement 3**: I added some dancing shaggy and carls as well as Bob Ross music
                            to create a nice vibe for drawing.

