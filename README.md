Assignment 4 - Creative Coding: Interactive Multimedia Experiences
===

For this assignment we will focus on client-side development using popular audio/graphics/visualization technologies; the server requirements are minimal. The goal of this assignment is to refine our JavaScript knowledge while exploring the multimedia capabilities of the browser.


## A Digital Visualization Portfolio
Link: http://a4-petrakumi12.glitch.me

Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:

- The goal of this application is to provide a single source for multiple types of data visualization, to have as a personal portfolio.
- This application contains both implementations of code snippets I found online which I then manipulated to my liking
 (the main page background and the WebGL Sound visualization), as well as visualizations I made from scratch 
 (the fractal and canvas sound visualization). In both cases, I made sure to understand every part of the code that I included.
- I included the online snippets because they helped me understand the workings of these libraries in order for me to 
more easily implement my own functionalities afterwards
- The biggest challenge I faced was getting started using all the visualization libraries, as I did not have any prior experience with any of them

- I used ESLinter through WebStorm to lint, using the automatic configuration. I used WebStorm's automatic validator for code validation


## Technical Achievements
- **Tech Achievement 1**: Used canvas, WebGL, D3, and Three.js on my visualizations
- **Tech Achievement 2**: My audiovisualizers use amplitude analysis to drive visualization.
- **Tech Achievement 3**: I experimented with custom FragmentShaders for color generation based on sound amplitude. 
- **Tech Achievement 4**: I visualized the dataset of characters in Thor that appear in the same scene together using a 
correlation circle with D3, including user interaction by hovering over for more information on the data
- **Tech Achievement 5**: I added start/stop functionality to the fractal generator, which users can press to stop the generation
- **Tech Achievement 6**: I added dat.gui to the fractal generator, allowing the user to change max radius, min radius,
 and color of the circles. The color change will apply on top of the current image, while the new radii will cause the 
 context to clear and the visualization to start from scratch.
- **Tech Achievement 7**: I used dat.gui to control characteristics of the TorusKnotGeometry
- **Tech Achievement 8**: Automatic resize of three js renderer with screen size change on the main page
- **Tech Achievement 9**: Used js modules to generate the D3 graph as well as set the stage for audio analysis given the
 inputted file. I then used the latter in both audio visualizers.
- **Tech Achievement 10**: Allowed the user to click anywhere to dismiss the help text, and click back at the Typed 
cursor to regenerate the animation
- **Tech Achievement 11**: Generated color gradients to use in the linear sound visualizer, which changes 
the color based on the amplitude of the sound

### Design/Evaluation Achievements
- **Design Achievement 1**: Used Typed library for quick help on how to navigate the website on the main page
- **Design Achievement 2**: Used Bootstrap with some modifications for the main page layout, with a parallax-style effect



