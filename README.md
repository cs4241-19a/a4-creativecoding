## Crazy Soccer Game

https://a4-gccromwell.glitch.me/

The goal of the application is to provide a simple, yet fun game with a soccer theme. Using Three JS, a soccer ball is placed in the middle of a field, and a user can use the WASD keys to move the ball into either one of the goals. The field has boundaries, and the location of the ball is randomly reset after each goal. The objective of the game is to score as many goals as you can in one minute. For added difficulty, a user can try holding the 'b' or 'B' keys to spin the soccer ball around the Y axis, but pressing 'v' will cancel the spin. 

I had a challenge implementing the rotation of the ball without it messing up the translation properties. This is why I turned it into an extra challenge and did not keep it as a main part of the game. I also had challenges getting ESLint to work properly in Webstorm, so I switched to using the linter JSHint. There is an online version, and the configurations/rules I used involved just a bit more than the default:

![alt text](https://cdn.glitch.com/5b098f96-cc56-47ba-ab32-7f2278ab3305%2Flinter.PNG?v=1569640925482)

For HTML/CSS Validation I used https://validator.w3.org/ and https://jigsaw.w3.org/css-validator/ to result in 0 errors.

### Design/Evaluation Achievements
- **Design Achievement 1**: I tested my application with n=7 users, finding that all of them had trouble with the rotation, so I took it out as a main part of the game. I also added a text notification when goals were scored, in addition to reseting the speed and direction of the ball when a goal was scored. To increase difficulty, one of my test users suggested starting the ball in random locations, which I then implemented.
