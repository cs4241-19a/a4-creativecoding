import chartFxns, { clamp } from './chartFxns.js'
export default {getSelectedData, setSelectedData, getSelectedColor, setSelectedColor, getSelectedMaxFontSize, setSelectedMaxFontSize, setSelectedMinFontSize, getSelectedMinFontSize, getSelectedText, setSelectedText, shuffleArray, loadData, getText1, getText2, getText3, getText4}

// This keeps track of what the selected data is (treatment or control)
let selectedData = null

// This takes in a data set and makes it into a list where each element has 4 properties (the properties are used in the display)
function loadData(data){ 
    let dataMap = {}
        for(let i = 1; i < data.length; i++){
            let period = chartFxns.clamp(Math.floor(data[i].Period), 0, 21)
            if(isNaN(period)){ }
            else{
                if (period in dataMap){
                    dataMap[period]+= 1
                }
                else{ 
                    dataMap[period] = 1
                }
            }
        }
    let dataList = []
    const keys = Object.keys(dataMap)
    for(let i = 0; i < keys.length; i++) { 
        let label = keys[i]
        if (label === "21"){ 
            label = ">20"
        }
        dataList.push({ "period":keys[i], "periodInSec":30*keys[i], "count":dataMap[keys[i]], "label":label})
    }
    selectedData = dataList
}

// These keep track of the font sizes and the color
let selectedMinFontSize = 5
let selectedMaxFontSize = 9
let selectedColor = `rgba(17, 0, 255, .5)`


// JavaScript implementation of the Durstenfeld shuffle, a computer-optimized version of Fisher-Yates from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

/* These 4 functions are used to set what the text is that is displayed on the chart based on the user selections. 
There are 4 options: just the period in frames, just the period in frames, or either of those displays with the number of values at that period
  */

function getText1(d) {
    return d.data.label
}

function getText2(d){
    return d.data.periodInSec
}

function getText3(d){
    return d.data.label  + ":" + d.data.count
}

function getText4(d){
    return d.data.periodInSec  + ":" + d.data.count
}

// Keeps track of which display is being used
let selectedGetText = getText1


//Getters and Setters: make sure that values are holding the right value even across modules
function getSelectedData(){
    return selectedData
}

function setSelectedData(getDataCallback){
    selectedData = getDataCallback
}

function getSelectedMinFontSize(){
    return selectedMinFontSize
}

function setSelectedMinFontSize(selectedMinFontSizeCallback){
    selectedMinFontSize = selectedMinFontSizeCallback
}

function getSelectedMaxFontSize(){
    return selectedMaxFontSize
}

function setSelectedMaxFontSize(selectedMaxFontSizeCallback){
    selectedMaxFontSize = selectedMaxFontSizeCallback
}

function getSelectedColor(){
    return selectedColor
}

function setSelectedColor(selectedColorCallback){
    selectedColor = selectedColorCallback
}

function getSelectedText(){
    return selectedGetText
}

function setSelectedText(getTextCallback){
    selectedGetText = getTextCallback
}
