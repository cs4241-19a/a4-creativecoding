Assignment 4 - Creative Coding: Interactive Multimedia Experiences
===

http://a4-heartkiller.herokuapp.com/

**DAYDREAM — join your friends in a 3D World**

Daydream is a simple 3D multi-character polygon world where each user is randomly assigned a unique character (policeman, robber, beach lady, fireman etc.) and gets to walk around in a town section and meet other users as other characters. An on-screen joystick is provided for motion; just simply drag the joystick in the direction you want your character to move. The joystick can make a character walk and run forward, backwards, and turn. Users can communicate with each other by moving their characters relatively close to each other's, and trigger the chatbox to type and send text by tapping toward the bottom center of the screen. The right place to tap to trigger the chatbox varies depending on where your character is standing from the other, but it can usually be in the bottom center. (The chatbox is **incredibly tricky and hard** to trigger, due to time constraints I was not able to figure out where exactly on the screen user needs to tap each time. But I have fortunately managed to tap in the right place multiple times to know that it actually works.) Your character will be present in the world until you close your tab; that automatically exits the app and removes your character from the town. 

**Obstacles**

- **Hanging Chatboxes**: After a character exits the world, their speech bubble remains in the air.
Buggy if 3+ users/characters: I've noticed that as soon as a third character joins the world and the other two starts a conversation, one of those two disappears from the 3rd character's view, even though they still exist in the views of each other.
- **Blank Modal**: I tried to use the Bootstrap modal to inform users with general info about the game that pops up at first page load and can be brought back by a button at the top corner, but the modal would pop up only without the text inside. I was not able to fix it on time and hence, I resorted to a less fancy way of displaying info inside a banner-like element that stays at the top of the screen at all-times.
- **Deploying**: This was actually the most challenging part for me since I was not able to host on Glitch after trying for a lot of hours, I resorted to deploying via Heroku, which also imposed a lot of new challenges and took a lot of time.
- **Works better locally**: The app functions way better when I was implementing and hosting it locally on my laptop via Webstorm. The chat feature is way smoother, and the top banner is always styled propery via css. I believe some things got lost in translation once I uploaded the project to places such as Glitch, Goorm, Heroku etc. (for example, unecessary file paths, conflicting port numbers etc.) 

**Linter**

I coded this project primarily in WebStorm and therefore applied the default linter.

---

## Technical Achievements
- **Three.js**: I used and rendered the 3D models made with Three.js. The Raycasting property of Three.js was used to apply most of the app logic such as blocking, moving up/down through unleveled ground etc.
- **Socket.io**: Socket.io was mainly used to communicate bewteen client and server. This primarily gave birth to the multi-user aspect of the app and the chat feature.
- **FBXLoader**: To load the fbx files (3D models) into the code.
- **Mixamo**: I used mixamo.com to apply animations to custom characters.
- **Autodesk Maya**: I used Autodesk Maya to combine the 3D models (fbx files) into one and export, for instance, creating a town model by putting models of items such as cars, buidlings, signs, and lamp posts inside accordingly.
- **Blender**: I used blender to tweak the 3D models such as texture, shape, skin, color, etc.
- **Heroku**: Since Glitch gave me a myriad of problems, I had to resort to Goorm IDE, which in turn gave me a lot more problems, but it ulitmately helped deploy the app via Heroku.

### Design/Evaluation Achievements

I focused on the technical aspects of the assignment but still managed to do some styling.
- **Bootstrap**: I used Bootstrap to style the top banner, however, sometimes Heroku is not able to find the stylesheet and the button stays unstyled. 
- **Responsive**: The app is accessible via mobile as well, although the chat feature might not work as expected. ALthough, PCs and laptops are recommended for full experience.

