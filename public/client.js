import * as dat from '/scripts/dat.gui.module.js';
import {roll3dDice} from './roll3DDice.js';
import {drawDice, checkErrors} from "./draw2dDiceAndError.js";

const gui = new dat.GUI();


let guiSetup;
guiSetup = function(){
    this.DiceType = "d6";
    this.DiceSize = 1;
    this.DiceSpeed = 0.25;
    this.DiceColor = "#ffae23";
    this.Wireframe = false;
    this.ClickForHelp = function() {
        helpPage();
    };
};

const submit = function( e ) {
    // prevent default form action from being carried out
    e.preventDefault();

    const input1 = document.querySelector('#typeDice');
    const input2 = document.querySelector('#numDice');
    let input3 = "";
    if (document.getElementById('+').checked) {
        input3 = "state1"
    } else if (document.getElementById('-').checked){
        input3 = "state2"
    } else {
        input3 = ""
    }
    const input4 = document.querySelector('#flatDice');

    document.getElementById('resultLabel').innerHTML = "Result: Calculating" ;
    document.getElementById('dice').innerHTML = "";

    let errors = checkErrors(input1, input2, input3, input4);

    //console.log(guiSetup.text);

    if(errors.error === true){
        document.getElementById('errorLabel').style.display = 'block';
        document.getElementById('errorLabel').innerHTML = errors.message;
        document.getElementById('resultLabel').innerHTML = "error";
        document.getElementById('dice').innerHTML = "";
    }else{
        document.getElementById('errorLabel').style.display = 'none';

        fetch( '/submit', {
            method:'POST',
            body:JSON.stringify({ typeDice: input1.value, numDice: input2.value, addsub: input3, flatDice: input4.value }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then( function( response ) {
                response.json().then((responseData) => {
                    setTimeout(function() {
                        document.getElementById('resultLabel').innerHTML = "Result: " + responseData.result;
                        drawDice(responseData.rolls, responseData.diceNum);
                    }, 3500);
                    let args = {
                        number: input2.value,
                        type: guiSetup.DiceType,
                        size: guiSetup.DiceSize,
                        speed: guiSetup.DiceSpeed,
                        color: guiSetup.DiceColor,
                        wireframe: guiSetup.Wireframe
                    };
                    roll3dDice.init(args);
                    window.scrollTo(0, 600);
                    //window.location = '/views/index.html#canvas';
                });

                console.log( response )
            })
    }
    return false
};




const helpPage = function(){
  alert("How to use this site\n" +
      "Input into the text boxes to set the values for the calculated result and then click the submit button to play an animation and get the result\n" +
      "Proper input for the type include (d1, d4, d6, d8, d10, d12, d20, and d100)\n" +
      "The gui input on the side is for the calculation animation and any changes there will only affect the animation that plays after the submit button\n" +
      "The gui also includes a button that will redisplay this alert\n" +
      "Recommended input size for the animation is around 100ish dice");
};



window.onload = function() {
    helpPage();
    document.getElementById('errorLabel').style.display = "none";
    const button1 = document.querySelector( '#submitButton' );
    button1.onclick = submit;
    guiSetup = new guiSetup();
    gui.add(guiSetup, "DiceType", [ 'd1', 'd4', 'd6', 'd8']);
    gui.add(guiSetup, "DiceSize", 0, 5);
    gui.add(guiSetup, "DiceSpeed", 0, 1);
    gui.addColor(guiSetup, "DiceColor");
    gui.add(guiSetup, "Wireframe");
    gui.add(guiSetup, "ClickForHelp");
};