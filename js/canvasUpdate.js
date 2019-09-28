// Check if shift value should be reset so that it does not keep incrementing indefinitely
export function checkShift (shift, freq) {
  // if full cycle is completed, reset shift
  if (shift / (365 / freq) >= 1) {
    shift = 5
  }
  return shift
}

// get half of width and half of height of canvas
export function getMidPoints (canvas) {
  const width = canvas.width
  const height = canvas.height
  return { midX: width / 2, midY: height / 2 }
}
