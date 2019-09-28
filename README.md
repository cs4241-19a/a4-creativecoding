<h1>Game of life</h1>
A canvas implementation of Conway's game of life. The user is able to specify the dimentions of the board and a number of cells to fill it with. It is also possible to change the number of neighbors required to cause cells to be survive, die or be generated. The user may then start the simulation, with the page drawing the board after each step in the simulation for as long as the user wishes.

I struggled to import dat.gui into my project. Because of this, several functions of this game were not able to be completed. The page is able to randomly generate a board on load, and the step function that drives the game works. The page is also able to display the state of the board on each step, but I wasn't able to successfully implement animation, nor a working loop. The game is able to step through the game for the most part, but there is a small bug that causes grids to overcount their populated neighbors.

Three additional modules were created and imported into this assignment:
  -rnp: handles the generation random, non-repeating numbers.
  -neighbors: Handles the counting of neighbors for each cell in the board.
  -wait: Causes the code to wait before continuing to execute (unused)
