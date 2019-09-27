## Maze Runner

https://a4-christopher-mercer.glitch.me

Maze Runner is a dynamically generated maze puzzle that uses the cavas drawing procedures for displaying a map of the generated maze. The maze is new every time, and is generated on load (not pulled from a DB of premade mazes). The goal is to navigate through the maze each time. There were two major challenges: 1) generating the mazes using a breadth-first algorithm, and 2) displaying every possible maze edge case properly.

I used ESLint to ensure my code was formatted properly.

## Technical Achievements
- **DFS Algorithm**: I wrote my own depth first search algorithm to proceduraly generate the maze given any input size.
- **Independent Controller**: While I included dat.gui for its styling and effeciency, I also opted to write my own control logic for the WASD movement.
- **Dynamic Display**: I wrote a prodedure chain to handle any maze template and render it. This means the game doesn't get stale.

### Design/Evaluation Achievements
- **Display Scaling**: Using viewport scaling, I ensured the game plays well on smaller displays.
- **Accesability**: Ran page through Chrome's lighthouse accesability assesment tool to get a max score of 100.
- **Cross-Browser Testing**: Tested in IE and Edge to ensure older or infrequently installed browsers are supported.
