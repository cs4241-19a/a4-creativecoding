Assignment 4 - Creative Coding: Interactive Multimedia Experiences
===

Due: September 27th, by 11:59 PM.

For this assignment we will focus on client-side development using popular audio/graphics/visualization technologies; the server requirements are minimal. The goal of this assignment is to refine our JavaScript knowledge while exploring the multimedia capabilities of the browser.

Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

## Dice Roller v2

your hosting link e.g. http://a4-andrewbonaventura.glitch.me

This website is meant to be used for dice rolling purposes or just wanting to generate random number. It is mostly the same as my 
assignment 4 with added elements like music, a gui, and an animation that accompanies each roll. With the new animation, the website
also acts like a simulator where you can mess around with various options and see the results. I would recommend working with at 
least 100 dice to really be able see some interesting stuff. There were many challenges in the development of this application. 
Almost all of them have to do with threejs. Originally I had planned to use something I found called cannon.js to simulate physics
and be able to actually roll the dice but it found it hard to understand and use in the given time that I had so I had to scrap it.
I also intended to have models for d10s, d12s, and d20s but those geometries also were giving me issues and most of them were within
the threejs framework itself so they were hard to debug and I ended up giving up on it. I also initially had issues with installing
dat.gui but eventually got it to work. The JS linter that is used is eslint which came attached with my development environment 
being webstorm. The rules can be found through this link: https://eslint.org/docs/rules/.


## Technical Achievements
- **Tech Achievement 1**: I wrote my own geometries to use for my Three.js objects.
- **Tech Achievement 2**: I added music that plays on loop to the main page to make the website more fun


### Design/Evaluation Achievements
- **Design Achievement 1**:
