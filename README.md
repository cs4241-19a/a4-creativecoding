Data Visualization
===
https://a4-eos7l.herokuapp.com/

This is a data visualization consists of 2 linked charts rendered using D3.js. 

To fulfill the requirements:
---
### Six user controls:
- Tooltip: there might be a slight delay but it is there. 
- Linked views on hover, also there is a caption being live-updated based on hovering.
- Documentation tab can be triggered to be reopened.
- A third visualization that allows zooming in, thanks to brushing.
- A reset button to zoom out from the third visualization. 
- A zoom in AND zoom out for the bubble chart via mouse scroll wheels.  (PS: I confirmed with Noelle that zoom in and zoom out count as 2 separate control parameters)
- You can also double click to exit out of the zoom in the bubble chart.

### Linter:

- I used the built-in linter in Webstorm.
- The JS Linter tolerates: for statement, multiple vars, single quote strings, this, whitespace mess, eval, bitwise operators 
- It assumes: ES6, Node.js, in development, in a browser
- Maximum line length: 100
- Maximum number of error: 50
- I could not figure out why the linter is not happy with me using d3 in area2.js and app.js while it is okay with me using d3 in area1.js. It claimed that I have never declared D3. While I literally did the same in both scripts. 
- In main.js, I cannot get rid of the warning from using a global directive. However, if I do not use the global directive, the linter will complain that I used the window object without declaring it. 
- I have discussed both two things mentioned above with Noelle and we were unable to find a way to get around it. 
- I also couldn't resolve the problem with "exportDefault" because once I change "export" to "exportDefault" my "import" stops working.

### General: 

- I included both helmet and compression packages in my server.
- I have two modules named mod1.js and mod2.js. 
- My HTML and CSS files are validated.  
- The redisplayable documentation can be triggered using the "Read Documentation" button.


Goals:
---
- My goal was to create a highly interactive and responsive visualization for the most popular movie genres produced between 2000 and 2018. I think I was successful in doing that. I had multiple interactions and users could freely play around with them.


Main Challenges:
---
- I had the most problems using dat.GUI (which is apparently hated by my linter). I ended up not using dat.GUI at all, also because I wanted to make some non-trivial user controls which is even more difficult to be done using dat.GUI.
- I learned that integrating way too many interactions in the same visualization not only doesn't help users to understand the data, but also makes each interactive element kinda messed up. For instance, having hovering and clicking and dragging all in one viz is fancy but not practical for the mouse states.
- I also tried to use Waypoint's infiniteScroll package and failed to make it work. This is probably the third time I tried to incorporate this package into my code but never succeeded...


Implications:
---
- If brushing is malfunctioning, please refresh the page. 



Achievements:
---


### Technical:
- There are many types of interactions involved in this visualization including linked views, zooming in and out with brushing and tooltip. There are more than 6 user controls and most of them are non-trivial. 
- The axises are dynamically generated based on the data input.
- It took me a while to clean up the data found from Professor's recommended website for jSON dataset. I mainly used the dplyr package in R, which was so much more efficient than Excel.
- I have a total of four charts and each does something differently. 


### Design:
- I used the Type.js, AOS and ScrollReveal libraries for aesthetics. 
- I hard coded all the styling. 
- I used LOLColors to coordinate my color scheme. 
- I used materialize.css to create the collapsible documentation tab. 
- I did some user testing with my friend and they liked the visualization. They said they would prefer if there is a way to zoom in the line chart so they can see more details, hence why I added a third visualization to showcase how it can be done. Due to time constraint, I could not implement it so it could be updated to show other genres with a drop-down menu.
- I used ColorBrewer2 to customize the colors used in the bubble chart. 

