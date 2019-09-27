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
- **Stereo Confidence**: Stereo will always play.  Usually if people implement a stereo it will sometimes fail because the AudioContext will not initialize until user interaction.  I implemented a brute-force strategy so that the AudioContext will always initialize.
- **Synced User Controls to Stereo Bars**: The stereo bars will auto-update if the user makes a change to the bar color, bar opacity, bar glow, speed, or volume (for user experience purposes, changing a selected song won't automatically restart the stereo in case the user still wants to listen to currently playing song) 

### Design/Evaluation Achievements
- **Color of sliders matches user's color choice**: The sliders from the dat.gui will automatically change color as the user selects a color for stereo bars.  Used [this](https://gist.github.com/tzi/2953155) to learn how.
- **Testing**: Tested the application with n = 10 users, finding that the stereo bars will appear, music will play for all users, and functionality for user control works.
