## Baseball Simulation

http://a4-dannyjsullivan.glitch.me

I have created a simulation of a baseball game, allowing the user to participate on the away team. They can simulate individual 
at bats or entire innings by clicking the respective buttons. The user also has the ability to display the player stats,
to play "Take Me Out to the Ballgame", as well as turning off all in game audio. They may also begin a new game whenever,
which will not update the current statistics unless the user manually submits them by pressing the "send stats" button.
The user may also reset the database whenever by typing in the url "http://a4-dannyjsullivan.glitch.me/reset", reseting
all stored statistics. The user can change the probability of a hit by filling in the hit probability text field. The default is
3, which means there's a 1/3 chance of getting a hit. 

The linter that I used was JSLint on WebStorm. JSLint would show errors if there were single quotes rather than double quotes,
trailing whitespace, for loops (which I had it ignore because that doesn't make sense), and the keywords const and let which I also
ignored, because they were necessary.Webstorm would mark errors if variables and functions did not end with a semicolon or if there 
was whitespace in functions. As I explain later, I could not get my javascript into it's own file, but I placed it in its own
file and ran it through the linter to ensure that it met the standards of JSLint and WebStorm.

I ran into difficulties creating hits other than singles due to time. I also could not figure out how to get my code properly
working in modules, so I was unable to complete that requirement.

## Technical Achievements
- **Tech Achievement 1**: created a way for the user to reset the database
- **Tech Achievement 2**: embeded an audio player and file, as well as in game audio based on actions (i.e. hit vs. out)
- **Tech Achievement 3**: stored player statistics in lowdb and able to display them
- **Tech Achievement 4**: live track the total number of hits and runs, as well as runs per inning on the scoreboard
- **Tech Achievement 5**: allow the user to change the hit probability in real time
- **Tech Achievement 6**: added 9 possible user interactions

### Design/Evaluation Achievements
- **Design Achievement 1**: made the tables easier to look at through colors and lines, changed colors and fonts through css stylesheet
- **Design Achievement 2**: added important information onto the canvas (i.e. number of outs, inning, score)
- **Design Achievement 3**: created characters models for each team, as well as randomized names through random name generator
- **Design Achievement 4**: changed the main action button from "hit" when you're batting to "pitch" when you're pitching to make it more intuitive, as well as change the mute button to say unmute when clicked, and vice versa