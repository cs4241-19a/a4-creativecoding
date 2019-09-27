Jeffrey Harnois
Audio Visualization
Link : 

*** Please Read Below ***

The first time you play the audio will be at normal speed.  Any play after that will take the "rate" slider into account and will adject the rate of play back accordingly. The program will only be able to control one play at a time.  Hit the play button ("explode") multiple times at own risk.

************************

This project is a creation of an audio visualizer. Hitting "explode" will start the program.  Hitting "implode" will stop it.  The bars were adjusted by frequency of the audio playing. The goal of this project was to play around with interactive media libraries to make a project using one of different APIs for media outlets.  The hardest part for me was getting modules to work.  I spent many hours trying to get them to work just to realize that they do not leave the scope of their own script.  There probably was a way to do this but I could not look at it any longer. For my linter I used standardjs.  To run please enter:

 - npx standard 

 To fix any issues I used the command:

 - npx standard --fix 

 https://standardjs.com/

 Standard was a good way to fix spacing, bracket, semicolon, etc, errors.  You can follow the link above to find more information.

Technical Achievements:
1. Combind Web Audio API with Web Canvas API to create my visiulization 
2. Used an algorithm that takes frequencies into account when making the height of the bars
3. Added a slider to control playback rate


Design Achievements:
1. Used Toastr to create nice looking pop-ups for documentation 
2. Randomized a few songs to play back on "explode"
3. Implimented dat GUI for user interaction with the application
4. User is able to interact with the background to add a bit more customization