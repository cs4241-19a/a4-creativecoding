Assignment 4 - Creative Coding: Interactive Multimedia Experiences
===

Brick Breaker (but spooky)
===

Hosting Link: https://a4-ktrose1.glitch.me/

Brick Break has (and still is) always been my favorite computer game. I used to play it for hours as a kid and it wouldn't cease to entertain me. In the past
I have created 2D versions of this game so that I could play it whenever/wherever I wanted to but this assignment seemed like the perfect opportunity to 
create a 3D version of it for myself. The classic game can be played all day long, and with my user controls pros can make the game harder while others can
keep with the easy level that it initialized at. While the math/logic behind the game/hits was easy because I had created the game before in 2D, using THREE.js
was definitely a steep learning curve. Luckily there are loads of interactive tutorials online so I was able to make some easy games as practice and use a lot
of the same thinking/strategies when building my game. Making Brick Breaker wasn't the most creative choice but it was a ton of fun to make and I'm excited to 
have a version to play anytime I want.

## Explanation of required functionalities:
- Express server
- A user interface for interaction with your project, which must expose at least six parameters for user control: These include the h key for documentation, the space bar to start the game, the right arrow to move the bar right, the left arrow to move the bar left, the up arrow to speed up the ball (sometimes it needs to be pressed twice for noticibale change in velocity), and the down arrow to slow down the ball (sometimes it needs to be pressed twice for noticibale change in velocity)
- My application displays basic documentation for the user interface when the application first loads. Additionally the user can use the 'h' key to reexpose the documentation.
- The modules I used are the three.js module that was imported and a constants.js module containing my constant global variables.
- I used JSLint through WebStorm
- My HTML and CSS validates which I checked using the W3C Validator.
- THREE.js - A simple 3D game

## Technical Achievements
- **Tech Achievement 1**: Consice function for dealing with all different "hit" scenarios including walls, blocks, the baseBlocks, and the 'ground'
- **Tech Achievement 2**: Ability to enter scores and show a score board with all the score data
- **Tech Achievement 3**: Persistant non trivial database using lowdb
- **Tech Achievement 4**: Dynamic lighting, the lighting decision I'll talk more about in the design achievements but right now I have lighting solely around
the ball. I had originally a function to initialize the lighting (which is still there) but I commented out the call. There are many lighting choices that could have
been made with this game.

### Design/Evaluation Achievements
- **Design Achievement 1**: The application was tested with n=6 users, finding that people prefered the score during the game at the bottom, that people liked the final color
scheme I settled on, and people prefered the old video game style text
- **Design Achievement 2**: Lighting choices, while my game can easily be completely lit up by simply uncommenting a line of code, all the people who tested my game
liked the mystery of just the ball being lit up. Additionally I think my game was a bit too easy without this feature so it adds a little bit of excitement to the game
