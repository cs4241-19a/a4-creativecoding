export default nextValue
function nextValue (x, y, w, h, grid) {
  let value = 0
  if (x !== 0) {
    if (y !== 0 && grid[x - 1][y - 1]) {
      value++
    }
    if (grid[x - 1][y]) {
      value++
    }
    if (y !== h - 1 && grid[x - 1][y + 1]) {
      value++
    }
  }
  if (y !== 0 && grid[x][y - 1]) {
    value++
  }
  if (y !== h - 1 && grid[x][y + 1]) {
    value++
  }
  if (x !== w - 1) {
    if (y !== 0 && grid[x + 1][y - 1]) {
      value++
    }
    if (grid[x + 1][y]) {
      value++
    }
    if (y !== h - 1 && grid[x + 1][y + 1]) {
      value++
    }
  }
  if (grid[x][y] && (value === 2 || value === 3)) {
    return true
  } else if (!grid[x][y] && value === 3) {
    return true
  }
  return false
}
