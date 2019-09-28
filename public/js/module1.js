// Takes in a value and returns a custom color based on the value
const customColor = function (value) {
    let r = generateColorValue(value)
    let g = 0;
    let b = 0;
    return `rgb(${r}, ${g}, ${b})`
}

// value is the value of the node to be colored
const generateColorValue = function (value) {
    return Math.min(Math.round(value) * 20, 255)
}

const getColors = function () {
    return ["white", "orange", "violet", "pink", "red", "black", "blue"]
}

const setOpacity = function () {
    var helperText = document.getElementById("helper-text")
    if (helperText.style.opacity == 0.0)
        helperText.style.opacity = 1
    else
        helperText.style.opacity = 0
}

export { customColor, generateColorValue, getColors, setOpacity }