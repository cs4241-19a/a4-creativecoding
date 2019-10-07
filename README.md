# Assignment 4

[a4-bwhetherington.herokuapp.com](a4-bwhetherington.herokuapp.com)

For this project, I tried to make a simple terrain generator in `THREE.js`. The base of the terrain is generated using layered simplex noise with increasing frequency but decreasing amplitude. I provided controls for setting the amplitude of the terrain (how vertical it is), the persistence (how much the frequency increases with each new layer and how much the amplitude decreases), and octaves (the number of layers in total).

I tried to implement a system of hydraulic erosion simulation for this project, but ran into trouble with it, and was unable to get it working within the timeframe of the project.

## Linter Notes

I used eslint for this project, which is set up to automatically run whenever I save a file in my editor.

## Technical Achievements

**Implemented Terrain Generation Algorithm:** Implemented a rudimentary terrain generation system based on layered simplex noise.
