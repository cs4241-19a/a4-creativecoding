import * as chartFxns from './chartFxns.js'
import * as chartVariables from './chartVariables'

window.onload = function() {
  
  document.body.appendChild(
    document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' )
  )
  loadControlData()
  alert("You are viewing the period intra-cellular calcium has in moss. The Mix Up button will move the circles around. The drop-down tabs allow for visualizing the Control vs the Treatment, the period in frames vs minutes, and to view the number of values with that particular period (also displayed by the size of the circles). The Font Size and Color Sliders can be used to better visualize the data.")
} 

function render(){
    chartFxns.default.clearChart()
    chartFxns.default.chart(chartVariables.default.getSelectedData(), chartVariables.default.getSelectedColor(), chartVariables.default.getSelectedText(), chartVariables.default.getSelectedMinFontSize(), chartVariables.default.getSelectedMaxFontSize())
}import * as chartFxns from './chartFxns.js'
import * as chartVariables from './chartVariables'

// Onload takes care of setting up the page
window.onload = function() {
  
  document.body.appendChild(
    document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' )
  )
  loadControlData()
  alert("You are viewing the period intra-cellular calcium has in moss. The Mix Up button will move the circles around. The drop-down tabs allow for visualizing the Control vs the Treatment, the period in frames vs minutes, and to view the number of values with that particular period (also displayed by the size of the circles). The Font Size and Color Sliders can be used to better visualize the data.")
} 

//This is called to display the chart
function render(){
    chartFxns.default.clearChart()
    chartFxns.default.chart(chartVariables.default.getSelectedData(), chartVariables.default.getSelectedColor(), chartVariables.default.getSelectedText(), chartVariables.default.getSelectedMinFontSize(), chartVariables.default.getSelectedMaxFontSize())
}

// loads the experimental data
function loadExpData(){ 
    fetch( '/treatment', {
              method:'GET'
              })
          
            .then( function( response ) {
                response.json().then(data => {
                    data = data['20_Peaks']
                    chartVariables.default.loadData(data)
                    render()
            })   
    })
}

// loads the control data
function loadControlData(){ 
    fetch( '/control', {
              method:'GET'
              })
          
            .then( function( response ) {
                response.json().then(data => {
                    data = data['Control_Peaks']
                    chartVariables.default.loadData(data)
                    render()
            })   
    })
}

// rearranges the bubble chart by changing the order of the array (and therefore the root node)
window.mixUp = function(){ 
    chartVariables.default.shuffleArray(chartVariables.default.getSelectedData())
    render()
}

// Called by the user selection tool to go between the control and treatment data
window.reloadData = function(){ 
    let selection = document.getElementById("dataToLoad").value
    if(selection === "control"){ 
        loadControlData()
    }
    else{ 
        loadExpData()
    }
}

//This uses connects back to setting the text in the circles to one of the four options (options set in chartVariables by the 4 getText fxns)
window.changeText = function(d){ 
    let periodFormat = document.getElementById("periodFormat").value
    let displayValues = document.getElementById("displayValues").value

    if(periodFormat === "frames" && displayValues === "period"){ 
        chartVariables.default.setSelectedText(chartVariables.default.getText1)
    }
    if(periodFormat === "seconds" && displayValues === "period"){
        chartVariables.default.setSelectedText(chartVariables.default.getText2)
    }
    if(periodFormat === "frames" && displayValues === "value"){
        chartVariables.default.setSelectedText(chartVariables.default.getText3)
    }
    if(periodFormat === "seconds" && displayValues === "value"){
        chartVariables.default.setSelectedText(chartVariables.default.getText4)
    }
    render()
}

//called by the use of the sliders to change the red, green, and/or blue of the chart
window.changeColor = function(){ 
    let red = document.getElementById('red').value
    let green = document.getElementById('green').value
    let blue = document.getElementById('blue').value
    chartVariables.default.setSelectedColor(`rgba(${red}, ${green}, ${blue}, .5)`)
    render()
}

//Adjusts the value of the min and max font size to what is selected by the user
window.changeFontSize = function(){ 
    chartVariables.default.setSelectedMinFontSize(document.getElementById('minFontSize').value)
    chartVariables.default.setSelectedMaxFontSize(document.getElementById('maxFontSize').value)
    render()
}

//The alert help function
window.help = function(){ 
    alert("You are viewing the period intra-cellular calcium has in moss. The Mix Up button will move the circles around. The drop-down tabs allow for visualizing the Control vs the Treatment, the period in frames vs minutes, and to view the number of values with that particular period (also displayed by the size of the circles). The Font Size and Color Sliders can be used to better visualize the data.")
}

// loads the experimental data
function loadExpData(){ 
    fetch( '/treatment', {
              method:'GET'
              })
          
            .then( function( response ) {
                response.json().then(data => {
                    data = data['20_Peaks']
                    chartVariables.default.loadData(data)
                    render()
            })   
    })
}

// loads the control data
function loadControlData(){ 
    fetch( '/control', {
              method:'GET'
              })
          
            .then( function( response ) {
                response.json().then(data => {
                    data = data['Control_Peaks']
                    chartVariables.default.loadData(data)
                    render()
            })   
    })
}

window.mixUp = function(){ 
    chartVariables.default.shuffleArray(chartVariables.default.getSelectedData())
    render()
}

// Called by the user selection tool to 
window.reloadData = function(){ 
    let selection = document.getElementById("dataToLoad").value
    if(selection === "control"){ 
        loadControlData()
    }
    else{ 
        loadExpData()
    }
}

window.changeText = function(d){ 
    let periodFormat = document.getElementById("periodFormat").value
    let displayValues = document.getElementById("displayValues").value

    if(periodFormat === "frames" && displayValues === "period"){ 
        chartVariables.default.setSelectedText(chartVariables.default.getText1)
    }
    if(periodFormat === "seconds" && displayValues === "period"){
        chartVariables.default.setSelectedText(chartVariables.default.getText2)
    }
    if(periodFormat === "frames" && displayValues === "value"){
        chartVariables.default.setSelectedText(chartVariables.default.getText3)
    }
    if(periodFormat === "seconds" && displayValues === "value"){
        chartVariables.default.setSelectedText(chartVariables.default.getText4)
    }
    render()
}

window.changeColor = function(){ 
    let red = document.getElementById('red').value
    let green = document.getElementById('green').value
    let blue = document.getElementById('blue').value
    chartVariables.default.setSelectedColor(`rgba(${red}, ${green}, ${blue}, .5)`)
    render()
}

window.changeFontSize = function(){ 
    chartVariables.default.setSelectedMinFontSize(document.getElementById('minFontSize').value)
    chartVariables.default.setSelectedMaxFontSize(document.getElementById('maxFontSize').value)
    render()
}

window.help = function(){ 
    alert("You are viewing the period intra-cellular calcium has in moss. The Mix Up button will move the circles around. The drop-down tabs allow for visualizing the Control vs the Treatment, the period in frames vs minutes, and to view the number of values with that particular period (also displayed by the size of the circles). The Font Size and Color Sliders can be used to better visualize the data.")
}
