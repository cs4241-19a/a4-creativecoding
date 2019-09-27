Assignment 4 - Creative Coding: Interactive Multimedia Experiences
===

## IA Audio Visualizer

Janette Fong [https://a4-jlfong.glitch.me/](https://a4-jlfong.glitch.me/)

The website allows the user to play music from IA, a VOCALOID.  The user can also control specify what song they want to hear, volume, speed, and also customize the stereo bars (color, opacity, glow).

The main goal of this project is to display an audio visualization of the songs using Canvas.  Some challenges I've faced in this assignment included finding certain dat.gui documentation to suit 
what kind of user interaction settings I wanted to display, as well as initially deploying to Glitch since I was not aware that the Glitch project size was 128 MB.

I used a JSLinter from Webstorm.  It tolerates for loops, multiple variable declarations, single quote strings, and whitespace mess.  The maximum number of characters is 100.

Baseline requirements met:
- Server with Express (using compression and helmet middleware)
- Client-side interactive experience using Canvas
- User interface (with six parameters of user control -- stereo bar color, stereo bar opacity, stereo bar glow, speed, volume, song choice) using dat.gui
- Displays basic documentation when you visit the website; can be dismissed by clicking "Close" button and can be reloaded by clicking "Help" button
- At least two different ES6 modules and include into a main.js file (each module has at least two functions)
- JSLinter from Webstorm
- HTML/CSS validates

## Technical Achievements
- **Stereo Confidence**: Stereo will always play.  Usually if people implement a stereo it will sometimes not fail because the AudioContext will not initialize until user interaction.  I implemented a feature so that the AudioContext will always initialize.
- **Tech Achievement 1**: I wrote my own custom GLSL shaders to use as a material for my Three.js objects.
- **Tech Achievement 2**: My audiovisualizer uses both FFT and amplitude analysis to drive visualization.
- **Tech Achievement 3**: I optimized the efficiency of my reaction-diffusion algorithm by...
- **Tech Achievement 4**: I visualized the dataset X using three different visualization technqiues provided by D3, andprovided

### Design/Evaluation Achievements
- **Color of sliders matches user's color choice**: The sliders from the dat.gui will automatically change color as the user selects a color for stereo bars.  Used [this](https://gist.github.com/tzi/2953155) to learn how.
- **Testing**: Tested the application with n = 10 users, finding that the stereo bars will appear, music will play for all users, and functionality for user control works.
