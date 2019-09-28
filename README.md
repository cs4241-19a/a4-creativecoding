LifeGrid
===

https://a4-thearst3rd.glitch.me/

LifeGrid is an implementation of Conway's Game of Life using three.js to render each cell as an object. This object grows with complexity the longer the cell is alive, growing from a simple sphere to a complex torus knot.

Some challenges I faced: It took me a while to figure out how to go from 2D mouse coordinates to the 3D world coordinates into `(i, j)` coordinates. In fact, I am totally cheesing it based on numbers that _should_ be correct. I tested it out with multiple different window sizes though and it seems to work perfectly.

Figuring out how to line up all of the mesh elements on the grid took a some time. Eventually I got it, but figuring out the equations and making them all work properly was challenging, because sometimes I would mess it up and all of the elements would be totally off screen and I could not see them at all.

I used `standard.js` for my linting. All of the javascript files are properly linted as of this submission. It follows a bunch of rules that I actually really do not prefer but it was easy to set up so whatever... Additionally, my website properly validated with both https://validator.w3.org and http://jigsaw.w3.org/css-validator/. Please don't take my word for it - check!

The changeable parameters of my application are:
- Running state (on/off) - you can also Single Step through
- How many iterations per second
- How fast the cells' objects rotate
- Editing the board - being able to toggle any cell to be on or off
- The rules of the game - How few cells will cause starvation? How many cells will cause overpopulation? What number of cells will cause a new cell to be born?
- Technically that's only 5 but the rules of the game are 3 different rules, AND the board is 20x20 so really you can change over 400 things in my project :) In all seriousness I do hope that this fulfills the requirements

My two modules are:
- My implementation of the Game of Life game mechanics, and
- A helper that generates my dat.GUI element

I used browserify to get the two modules inserted for use with the webpage. The command I use is:

`$ browserify public/client.js -o public/bundle.js`

## Technical Achievements
- **Complete Implementation of Conway's Game of Life**: The game is fully, properly implemented. You can change the rules using a dat.GUI menu which allows for some interesting results.
- **Full, efficient board layout using three.js**: I create a small number of geometry and material objects, and then reuse those throughout the board for more efficient memory usage and faster performance. Additionally, I will only change the geometries and materials of the meshes exactly when the contents of the board changes. The objects are not reading the contents of the board every frame, only on the "game" ticks.
- **Adaptable 2D -> 3D Screen Coordinates**: Upon resizing the window, not only does the canvas properly resize itself, but also the mouse input handler recognizes the new size and will properly determine which cell your mouse is hovering over

### Design/Evaluation Achievements
- **Best Practices**: I followed best practices for accessibility, including providing alt attributes for images and using semantic HTML. There are no `<div>` or `<span>` elements in my document. This one was actually quite annoying to do because a lot of the examples had full-screen canvases using a `div`. Also, with the popup element, the HTML validator gave me trouble if I kept them all as a `p` element and I needed to split them up into headers without using a `div` or `span`.
- **Mouseover Indication in Edit Mode**: I added a simple transparent cube that will move to the cell that you are hovering over in Edit Mode.
- **Different Models for Each Cell**: I gave different lifespans of each cell a new model and material, so that the board looks much more dynamic. You can observe how long a cell has been alive just by looking at the model and color.
