const checkErrors = function(input1, input2, input3, input4){
    const inputs = ["d1", "d4", "d6", "d8", "d10", "d12", "d20", "d100"]
    if(!inputs.includes(input1.value)){
        return {error: true, message: "Invalid Dice Type (Valid types are d1, d4, d6, d8, d10, d12, d20, and d100)"}
    }
    if(input2.value < 1){
        return {error: true, message: "Number of dice must be more than 0"}
    }
    if(input3 === ""){
        return {error: true, message: "A radio button option must be selected"}
    }
    if(input4.value < 0){
        return {error: true, message: "Flat modifier must be greater than or equal to 0"}
    }
    return {error: false, message: ""}
}

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

    let errors = checkErrors(input1, input2, input3, input4);
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
                    document.getElementById('resultLabel').innerHTML = "Result: " + responseData.result;
                    drawDice(responseData.rolls, responseData.diceNum)
                });

                console.log( response )
            })
    }
    return false
};

const drawDice = function(rollList, diceNum){
    let html = "";
    for(let i = 0; i < diceNum; i++){
        if(document.querySelector('#typeDice').value === "d1"){
            html += "<div id = 'd1' class = 'd'>" + rollList[i] + "</div>"
        } else if(document.querySelector('#typeDice').value === "d4"){
            html += "<div id = 'd4' class = 'd'>" + rollList[i] + "</div>"
        } else if(document.querySelector('#typeDice').value === "d6"){
            html += "<div id = 'd6' class = 'd'>" + rollList[i] + "</div>"
        } else if(document.querySelector('#typeDice').value === "d8"){
            html += "<div id = 'd8' class = 'd'>" + rollList[i] + "</div>"
        } else if(document.querySelector('#typeDice').value === "d10"){
            html += "<div id = 'd10' class = 'd'>" + rollList[i] + "</div>"
        } else if(document.querySelector('#typeDice').value === "d12"){
            html += "<div id = 'd12' class = 'd'>" + rollList[i] + "</div>"
        } else if(document.querySelector('#typeDice').value === "d20"){
            html += "<div id = 'd20' class = 'd'>" + rollList[i] + "</div>"
        } else if(document.querySelector('#typeDice').value === "d100"){
            html += "<div id = 'd100' class = 'd'>" + rollList[i] + "</div>"
        }
    }
    document.getElementById('dice').innerHTML = html
};



window.onload = function() {
    document.getElementById('errorLabel').style.display = "none";
    const button1 = document.querySelector( '#submitButton' );
    button1.onclick = submit
};