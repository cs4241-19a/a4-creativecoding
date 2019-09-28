## Visualization of Sorting Array -Alexander Rus

https://a4-alexander-rus.glitch.me

In this project I sucessfully implemented a web application that visualizes two different sorting algorithms and accepts user feedback.

The goal of the project was to create an express server using compression and helment middleware packages to host a interactive visualization. The Visualizations are created using a combination of the canvas library and the p5 visual library. The user may change certain aspects of the visualizations by interacting with an interface built using dat.gui. Upon opening the app, the user is prompted with a message that helps explain how to use the app via sweetalert2. Additionally, with each sorting algorhtm, there is an added mp3 song file that adds ambience. 

The challenges I faced in this project was coming up with a cool visualization that most poeple would likely not try. The algoithms themselves took me a long time to implement and I used the online resources of: https://www.youtube.com/watch?v=67k3I2GxTH8 and https://www.youtube.com/watch?v=eqo2LxRADhU&t=368s to help me. Additionally, getting dat gui to work correctly was very frustrating, becuase it required a lot of fine tuning. I used the resource: http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage as a guide. 

The js linter that I used was eslinter which I was easily able to install in visual studio code. The linter was set up to follow the Airbnb style of linting. I tried to follow certain criteria such as not adding unnessary spaces between function, not using variables before declaring them, and not incrementing values with '++' but insead with "+= 1'. There were some changes that I had to ultimetly override as the code depended on those areas to work properly. For the HTML and CSS validation I used the online resources : https://validator.w3.org/ and https://jigsaw.w3.org/css-validator/. 

## Technical Achievements
- **Tech Achievement 1**: To my knowledge I have fufilled all base requirements. 
- **Tech Achievement 1.1**: I created a server using Express that included the middleware packages compression and helment. The Express server is called 'server.js'.
- **Tech Achievement 1.2**: I created an interactive experince using the canvas API in both the Home page graphic and sortin galgorithms.
- **Tech Achievement 1.3**: The user can interact in over 6 different ways with the visualizations using dat.gui. The bubble sort visual has three variable inputs while the quicksort visual has 6 user inputs.
- **Tech Achievement 1.4**: Basic documentation is supplied to the user upon opening the main page and by clicking the 'instructions' button. These messages use the sweetalert2 API. 
- **Tech Achievement 1.5**: There are two modules that the application uses. Both modules are imported from the modules folder with informaiton that is used for the homepage animation. 
- **Tech Achievement 1.6**: The linter used was eslinter provied by Visual Studio Code.
- **Tech Achievement 1.7**: The CSS and HTML were validated using online resources. 
- **Tech Achievement 2**:  There are multiple added buttons to reset visualizations and change pages.
- **Tech Achievement 3**: Two aduio files were added to the two visualizations using Web Aduio. 

### Design/Evaluation Achievements
- **Design Achievement 1**: For the bubble sort visualization, the user can change the color of the visual, the background color, and the position on the y-axis of the visual. 
- **Design Achievement 2**: For the quicksort visual, the user can change the color of the visual pre and post sort, the background color, and column width, the y-posision, and the speed.
- **Design Achievement 3**: I added a nice header that used bootstrap for styling. 