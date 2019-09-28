## Faun's Cousin

Website:  https://a4-alejandra-garza.glitch.me/

My project allows people to play around with a 3D model I created in one of my classes (the model is meant to be the Faun from Pan's Laberynth), and it was inspired by the following example (which can also be found here: https://threejs.org/examples/?q=matc#webgl_materials_matcap): 

![alt text](https://github.com/AlejandraGarza42/a3-persistence/blob/master/screenshots/login.PNG)

This website allows users to rotate the model around either using their mouse or the dat.gui controls on the right, it also allows them to change the lengh, width, and height of the model:

![alt text](https://github.com/AlejandraGarza42/a3-persistence/blob/master/screenshots/login.PNG)

### Challenges
One of the main things I liked about the example I showed above was that you could change the color of the mesh. Although I was able to get the color feature working with a normal cube, as soon as I imported my mesh, it didn't work. Apparently, changing the mesh's color required me to go into Textures, which was fine in the programming side, but I am not familiar enough with the process of creating the actual textures. So I settled with adding a light that gave the model a greenish color (I tried giving the user the ability to change the light, but that did not work out either). Also the quality of the model decreased drastically when I exported it: 

![alt text](https://github.com/AlejandraGarza42/a3-persistence/blob/master/screenshots/login.PNG)

Another challenge I faced was adding the documentation that could disappear, for some reason my text came out as normal html text no matter what I did: 

![alt text](https://github.com/AlejandraGarza42/a3-persistence/blob/master/screenshots/login.PNG)

### JS Linter 
I used the standard js linter, and it made me realize how many unecessary spaces/tab I usually add across my code. It also was giving me a weird error, telling me that the renderAnimationFrame function was undefined even though it is a built-in function: 

![alt text](https://github.com/AlejandraGarza42/a3-persistence/blob/master/screenshots/login.PNG)

## Technical Achievements
- **Exported gltf File**: It took me much longer that I expected, but I figured out how to export my 3D Model as a gltf file and added it to my website. 
- **Played around with Lights**: Was able to add a couple of lights to my scene to make my mesh look much nicer.
- **Added OrbitControl**: Although my dat.gui already had 6 user control fields, I added the orbitControl feature to my website to the user could take a better look at my model. 

### Design/Evaluation Achievements
- **Created my own Mesh!!**: I know this has already been mentioned many times, but I created the 3D Model that appears on the website! Here is how it looks with higher resolution: 

![alt text](https://github.com/AlejandraGarza42/a3-persistence/blob/master/screenshots/login.PNG)

