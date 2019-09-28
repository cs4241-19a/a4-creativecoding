// Convert degrees to radians
export function convertToRadians (degrees) {
  return degrees * Math.PI / 180
}

// Calculate sine value based on different parameters
export function getY (ampl, rad, freq, phase, vertShift) {
  return ampl * Math.sin(rad * freq + phase) + vertShift
}
