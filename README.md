## VideoU

https://a4-tmwbook.glitch.me/

The goal of this application is to give a nice visualizer to play with while performing a dj set or chilling in your room.
With VideoU anyone can be the ocular attention grabber!
There are 6(.5) effects at your disposal:
```
C - spawn new cube at a random location
X - spawn new ring traveling backwards
Z - spawn sin wave moving right
A - spawn sin wave moving left
S - spawn plane acting as a screen filter
D - cycle through camera rotation modes
```

All of these effects promise to be an eye catching statement, and will auto-fade out at different rates!

We provide one sample hip hop track on the site to get you inspired.
Simply hit the "Start Music Loop" button and start composing a show to *Picture Perfect* by Young Kartz.

Challenges:
- I had a lot of trouble navigating the three.js framework
  - It wasn't intuitive to me on how meshes are getting updated in the scene
- I switched the project idea 3 or 4 times, so when I settled I had to make sure I defined everythign before I changed my mind again

Linting:
- Used ESLint
- Rules
  - Semicolons enforced (error)
  - Single quoted strings (error)

## Technical Achievements

1. Used `parcel` to package all the front end libraries.
2. Implemented all of front end using ES6 modules.
3. Every piece of geometry has an `on_tick` function called every frame, which allows endless customization in behavior.

## Design/Evaluation Achievements
1. Tested with 5 users to gain insight as to how fast objects should fade from the screen.
2. The music provided is not copywritten! Yay licensing!
