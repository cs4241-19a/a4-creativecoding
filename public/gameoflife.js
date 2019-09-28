/*
 * Implementation of Conway's Game of Life
 * by Terry Hearst
 */

let gridSize
let board

// HELPER: returns the number of neighbors of a cell
function getNeighbors (i, j) {
  let neighbors = 0
  for (let jj = j - 1; jj < j + 2; jj++) {
    for (let ii = i - 1; ii < i + 2; ii++) {
      if (ii >= 0 && ii < gridSize && jj >= 0 && jj < gridSize && !(ii === i && jj === j)) {
        neighbors += board[jj][ii].alive ? 1 : 0
      }
    }
  }
  return neighbors
}

// Actual functions exposed by module
module.exports = {
  setupBoard: function (_gridSize) {
    gridSize = _gridSize
    board = []
    for (let j = 0; j < gridSize; j++) {
      board[j] = []
      for (let i = 0; i < gridSize; i++) {
        const cell = { alive: false, count: 0 }
        board[j][i] = cell
      }
    }
  },

  getCell: function (i, j) {
    return board[j][i]
  },

  setCell: function (i, j, alive, count) {
    const cell = board[j][i]
    cell.alive = alive
    if (count !== undefined) {
      cell.count = count
    }
  },

  toggleCell: function (i, j) {
    const cell = board[j][i]
    cell.count = 0
    if (cell.alive) {
      cell.alive = false
    } else {
      cell.alive = true
    }
  },

  runIteration: function () {
    const newBoard = []
    for (let j = 0; j < gridSize; j++) {
      newBoard[j] = []
      for (let i = 0; i < gridSize; i++) {
        let newCell
        const neighbors = getNeighbors(i, j)
        if (board[j][i].alive) {
          if (neighbors < 2 || neighbors > 3) {
            newCell = { alive: false, count: 0 }
          } else {
            newCell = { alive: true, count: board[j][i].count + 1 }
          }
        } else {
          if (neighbors === 3) {
            newCell = { alive: true, count: 1 }
          } else {
            newCell = { alive: false, count: 0 }
          }
        }
        newBoard[j][i] = newCell
      }
    }

    board = newBoard
  },

  getNeighbors: getNeighbors
}
