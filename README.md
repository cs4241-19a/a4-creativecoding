## Exoplanet Visualizer

https://a4-samgoldman.glitch.me/

This website uses a [local copy](https://a4-samgoldman.glitch.me/exoplanets.json) of data from the [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/) to display each of the 4,055 currently confirmed exoplanets (note that I slightly modified this data to include Sol system). It displays the exoplanets grouped by their star system, with the option to display each roughly to scale to each other. For the sake of screen real-estate, stars are never to scale, nor are the distances from the stars. However, the orbital periods depicted are to scale (values are randomized for any unknown period, about 100 planets).

Some challenges I faced:
- Working with nested data was not easy at first
- Everything related to the animation of the planets, particularly getting the pause/timeScale controls to work properly
- SVG portability between Firefox and Chrome (mostly with displaying the star names)
- Choosing aspects to make realistic. The unfortunate reality of the scale of space meant that I couldn't viably make the star sizes or the distance from the planets to the stars scale correctly and still provide a meaningful visualization in the way I wanted.

Linter:
- I used the built linter built into WebStorm
- Major rules that it enforced:
  - Semicolons on all but the last statement in a scope (I chose to self enforce semicolons on all lines)
  - Unused parameters and variables are not allowed
  - 'var' is not allowed
  - Notably, it did not enforce line length, so I have a few excessively long lines

## Technical Achievements
- **Tech Achievement 1**: Used D3 to display 4,055 planets around 3,019 starts
- **Tech Achievement 2**: Optional scaling of planets with a known radius
- **Tech Achievement 3**: Generate systems such that they are as compact as possible with no planets overlapping each other
- **Tech Achievement 4**: Automatically scale the grid size based on the largest system present
- **Tech Achievement 5**: Animated planetary motion around the starts with scaled orbital periods
- **Tech Achievement 6**: To preserve computational resources, only animate systems on or close to being on screen

### Design/Evaluation Achievements
- **Design Achievement 1**: Modified star name display for portability between Chrome and Firefox
- **Design Achievement 2**: Selective animation (see tech achievement 6) allows lower resource computers to handle the animations
- **Design Achievement 3**: Realistic approximation of orbital periods and planetary sizes improve visualization of the systems.
