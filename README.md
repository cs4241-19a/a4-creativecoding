Assignment 4 - Creative Coding: Interactive Multimedia Experiences
===

Due: September 27th, by 11:59 PM.

For this assignment we will focus on client-side development using popular audio/graphics/visualization technologies; the server requirements are minimal. The goal of this assignment is to refine our JavaScript knowledge while exploring the multimedia capabilities of the browser.

Baseline Requirements
---

Your application is required to implement the following functionalities:


- A user interface for interaction with your project, which must expose at least six parameters for user control. [dat.gui](https://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage) is highly recommended for this. You might also explore interaction by tracking mouse movement via the `window.onmousemove` event handler in tandem with the `event.clientX` and `event.clientY` properties. Consider using the [Pointer Events API](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) to ensure that that mouse and touch events will both be supported in your app.
- Your application should feature at least two different ES6 modules that you write ([read about ES6 modules](https://www.sitepoint.com/understanding-es6-modules/)) and include into a main JavaScript file. This means that you will need to author *at least three JavaScript files* (a `app.js` or `main.js` file and two modules). We'll discuss modules in class on Monday 9/23; for this assignment modules should contain at least two functions.
- Your HTML and CSS should validate. There are options/plugins for most IDEs to check validation.

Deliverables
---

Do the following to complete this assignment:

1. Implement your project with the above requirements.
3. Test your project to make sure that when someone goes to your main page on Glitch/Heroku/etc., it displays correctly.
4. Ensure that your project has the proper naming scheme `a4-yourname` so we can find it.
5. Fork this repository and modify the README to the specifications below. *NOTE: If you don't use Glitch for hosting (where we can see the files) then you must include all project files that you author in your repo for this assignment*.
6. Create and submit a Pull Request to the original repo. Name the pull request using the following template: `a4-gitname-firstname-lastname`.

Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

## Your Web Application Title

your hosting link e.g. http://a4-charlieroberts.glitch.me

Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:

- the goal of the application
- challenges you faced in realizing the application
- a brief description of the JS linter you used and what rules it follows (we'll be looking at your JS files for consistency)

## Technical Achievements
- **Tech Achievement 1**: I wrote my own custom GLSL shaders to use as a material for my Three.js objects.

### Design/Evaluation Achievements
- **Design Achievement 1**: I developed a custom color generator depending on the value of the node in the graph
- **Design Achievement 2**: I created custom a custom axis for the year so it would only display Integers

