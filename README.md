## Where to?

Live at: https://a4-jcharante.glitch.me

Server source code: Here

Website source code: https://github.com/JCharante/where-to (there is a 1.0.0 release)

Where to? Is a tool that allows you to enter the names of Capital Cities you've been to, and build a spherical [Voronoi Diagram](https://en.wikipedia.org/wiki/Voronoi_diagram) from it. It also allows you to rotate the globe, and remove entries. This is a tool to help expose areas where you have not been to before, to help suggest where your travels should take you.

![Screenshot from 2019-09-27 22-58-46](https://user-images.githubusercontent.com/13973198/65810626-94c97080-e17a-11e9-9ce9-f5e0d14f5670.png)

![Screenshot from 2019-09-27 22-59-48](https://user-images.githubusercontent.com/13973198/65810627-95fa9d80-e17a-11e9-8791-a2b1392cb898.png)


## challenges you faced in realizing the application

I had a lot of issues with finding inspiration for the project. Eventually I realized that I wanted an easier way to see where I haven't been, which lead me to learning about Voronoi Diagrams. I had a lot of challenges getting my data to work and I tried multiple ways of rendering (svg or canvas) with multiple different libraries until I found one that worked. Future work would involve overlaying a map of the world in the background.

## a brief description of the JS linter you used and what rules it follows (we'll be looking at your JS files for consistency)

Source code for the website is hosted at https://github.com/JCharante/where-to (there is a 1.0.0 release).

I used ESLint for the website and in the repository you can find my [.eslint.js](https://github.com/JCharante/where-to/blob/master/.eslintrc.js) file. It has great integration with WebStorm, and I originally based my rules off Airbnb's configuration, but over time I have added adjustments of my own. Most of my code is in [Index.vue](https://github.com/JCharante/where-to/blob/master/src/pages/Index.vue).

For the server I used WebStorm's built in linter because there was not enough code to justify setting up ESLint again.

## Notes about requirements

Two javascript modules were required. All the code for the website is transpiled and are modules, as you can see the `export default` syntax in [Index.vue](https://github.com/JCharante/where-to/blob/master/src/pages/Index.vue). The other module is a bit more obvious in [spai.js](https://github.com/JCharante/a4-creativecoding/blob/master/spai.js)

## Technical Achievements
- **Stored help dialog preferences in local storage**: I added a "do not show again" toggle to the help dialog, and added a watcher so when the value changes, it is written into local storage. When the page loads, it reads the local storage and initializes the variables to show or not show the dialog.
- **Spai.js**: For one of the modules, I am asynchronously sending details about the requesters to an endpoint under my control. This will allow me to understand what types of browsers users are using, and ~**help me find out the IP addresses of the TAs for future use**~.
- **My server.js file is 36 lines long**: I extensively used modules to simplify the code in server.js, and .made good use of pre-existing middleware so that it is very easy to see what is going on.
- **Use of GeoJSON**: For the website, it gets its list of capital cities by using an already published dataset. **This allows me to not be as responsible for what sovereignty I may be inadvertantly recognizing**, and makes it easy to add further data by swapping which dataset I use, since [GeoJSON is a standard](https://geojson.org/).  
- **Lightweight Visualizer**: While developing, I made sure that the calls to the canvas I was making were not enough to warrant usage of my laptop fans to an audible amount. This was done by responsibly checking what changes in parameters would warrant a re-render and only doing it then.  

### Design/Evaluation Achievements
- **Usage of Quasar Framework**: I made my website visually pleasing by utilizing tools made by people with better design skills.
