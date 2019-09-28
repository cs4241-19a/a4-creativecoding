## Elie Hess Assignment 4

https://a4-eliehess.glitch.me/

My program is a simple audio visualization for the song "Caracas", by Tintamare, which I built using three.js.

In the visualization, cubes rotate and change color to (ideally) match the intensity of the song, which is determined using the getByteFrequencyData() method of an AudioAnalyser.

The largest challenge I faced with this project, other than linting difficulties described below, was getting the sound to actually play, pause, un-pause, stop, re-play, etc. as I wanted. Once I was able to figure that out, the whole getByteFrequencyData() thing was actually pretty easy thanks to some excellent examples provided by three.js.

I used eslint to lint my code, although it was not without its hiccups. I had major issues getting three.js to work as an import statement the way eslint wanted, so I eventually had to disable a couple of eslint inspections because I was unable to get my code working the way it wanted. In the end, I chose to go for functional code rather than perfectly-stylized code. For more details, see the comment at the top of public/main.js.

## Technical Achievements
- **Tech Achievement 1**: Audio can play, pause, un-pause, stop, and play again (hopefully) seamlessly.
- **Tech Achievement 2**: Added a SpotLight (I don't know why the "L" is capitalized, but whatever) to accentuate the visuals.
- **Tech Achievement 3**: Implemented seven dat.gui parameters that users can manipulate, in addition to a separate button to change the color of the visuals.


### Design/Evaluation Achievements
- **Design Achievement 1**: Used bootstrap.css to make my application look better.
- **Design Achievement 2**: I played several music options for friends, and used the song that most of them preferred.
