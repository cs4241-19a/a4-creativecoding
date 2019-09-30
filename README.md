Assignment 4 - Creative Coding: Interactive Multimedia Experiences
===

Due: September 27th, by 11:59 PM.

Professor Roberts gave me, Hunter Caouette, a penalty-free extension for the weekend. If you have any questions please reach out to me and/or Professor Roberts.


## creative coding -- a4-hcaouette -- CS4241 Assignment 4

http://a4-hcaouette.glitch.me

-The goal of my application was to create a fun, interactive visual to accompany music, inspired by the deprecated smoke particles effect google music used to have for the browser application. (look it up, it was way cooler than just having album art).
- I had a lot of challenges with implementing just about every part of this project. I only really just figured out the bulk of it towards the end; you can check out the commit history if you want. setting up modules was hard, getting dat.gui to work at all was hard, figuring out how to use the web audio api to process music was hard.
- I tried to use the eslinter plugin for Atom, version 8.5.0, but I'm not sure that it was 100% effective in checking my code. I used similar linter plugins for my css and html as well, to similar results. My best guess is that using a different IDE, at least, would improve my linting experience, but it shouldnt be too bad as is.

## Technical Achievements
- **Tech Achievement 1**: I used the ytdl-core middleware to take a youtube video and pipe it to the client for processing.
- **Tech Achievement 2**: My app uses html canvas and the web audio api to create an audiovisual experience that can be tweaked with dat.gui.
- **Tech Achievement 3**: I implemented both a sine-wave visualization and a bar-graph type visualization, which can be selected in the dat.gui control.

### Design/Evaluation Achievements
- **Design Achievement 1**: the backdrop of the graphs is the RGB inverse of the graph line/bar color, making for a high-contrast graph, at all times.
