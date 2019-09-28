Catherine Sherman<br>
Assignment 4 - Creative Coding: Interactive Multimedia Experiences
===
## Visualizing Calcium Oscillations in Moss
<a href="https://a4-catsherman.glitch.me/">https://a4-catsherman.glitch.me/</a>

  The goal of this application was to find a way to better display the data that I analyzed this summer. My MQP is focusing on how
moss reacts to chitin (a chemical found in fungi). This is a defense mechanism, and identifying that the moss' calcium levels oscillate at
a particular frequency is a relatively new discovery. This project displays circles (whose size is dependent on the number of points a particular
period has). It displays the 

  The biggest challenge with this project was deciding that I couldn't use the example bubble chart that D3 had, and having to make my own. 
The reason I couldn't use or start with D3's example was because the code was built in a notebook that had certain funtions built in. I was
unable to separate those functions from the notebook, and decided against trying to work a totally different system into my project. This was the
main challenge (and it set me back early on), but I was very happy with how similar my bubble chart looked compared to <a href="https://observablehq.com/@d3/bubble-chart">theirs</a>.

  I used ES Linter as my linter when I was developing in VS code. The full link to the available rules can be found <a href="https://eslint.org/docs/rules/">here</a>, and I just used the 
standard rules that it came with. I noticed it the most when I was adding require statements that it promptly wanted me to turn into import statements.
It also dimmed varaibles that didn't get used or called. It ran each time I saved my code.  

Just a note: I developed in VS code so I put my files (except for the bundle.js) on Git even though I added them to glitch just in case. 

## Technical Achievements
- **Tech Achievement 1**: I used 2 of my own data sets. This is about 200,000 data points (per file), and it was a lot to learn how to work with. It was also really interesting and helpful to get to visulize my data in a new way.
- **Tech Achievement 2**: I found an interesting shuffle array algorithm to add (originally I was just going to alternate between the array in order and reversed). 

### Design Achievements
- **Design Achievement 1**: There is full user control over color and font size which would help with any sort of visual impairment. The mix up function also helps with moving things if there is overlapping text.  
