## Meteorite Impact & Real Time ISS Position Visualization

https://a4-jpcaltabiano.glitch.me/

- This application displays the last 1000 meteorite impacts on Earth, ranging back to 1400. It also displays the real time location of the ISS. Zoom in and look closely, or wait a few minutes and come back, to see how it moves. 
- I used ESLint, following it's basic rules. I suppressed some errors it gave me (for example I include d3 as a script tag in HTML and am able to simply use the 'd3' keyword to access it, but ESLint is not aware of this and throws distracting errors).
- Challenges: One big challenge I faced was choosing the wrong idea. I initially planned to do a d3 visualization of the phylogenetic tree of life. I compiled the data and converted the XML tree into JSON to be able to work with it better. I wrote a lot of code and spent too much time before realizing it would take far more time than I had anticipated and switched to my current project. I was also challenged finding the time to complete the entire assignment in general, even with the granted extension, so it is not 100% finished. 
    - User controls:
        - mouse over for tooltip: 80% finished
        - zoom/pan controls: 100% finished
        - date range slider: 20% finished
        - toggle display of ISS: 0% finished
        - filter impacts by class using legend: 40% finished
        - sixth degree of control: unknown
    - ES6 Modules
        - ISS module: 50% finished (only one function)
        - Time slider module: 90% finished, not working so not included
    - Server: 100% finished

### Technical Achievements
- I wrote a function to poll a URL every second to get updated information about the current position of the ISS on top of Earth, and render a point on the map each time. Over time, the points compile into a line so the user can see the path the ISS has taken while they have been viewing the website. 

### Design/Evaluation Achievements
- I used a special d3 scale function, SymlogScale, to scale the size of the points on the map. I had a difficult time finding an appropriate scale as the mass data ranges from 0.15 to 23 million, and was able to use this to make a scale that was easier to read. 
