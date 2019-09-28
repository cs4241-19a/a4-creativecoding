import chartFxns, { clamp } from './chartFxns.js'
export default {getSelectedData, setSelectedData, getSelectedColor, setSelectedColor, getSelectedMaxFontSize, setSelectedMaxFontSize, setSelectedMinFontSize, getSelectedMinFontSize, getSelectedText, setSelectedText, shuffleArray, loadData, getText1, getText2, getText3, getText4}

let selectedData = null
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

let selectedGetText = getText1


//Getters and Setters
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