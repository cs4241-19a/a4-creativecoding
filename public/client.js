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
                    //drawDice(responseData.rolls, responseData.diceNum)
                    roll3dDice.init();
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

const roll3dDice = {
        init() {
            this.scene = new THREE.Scene();

            this.camera = new THREE.PerspectiveCamera();
            this.camera.position.z = 50;

            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize( window.innerWidth, window.innerHeight );

            document.body.appendChild( this.renderer.domElement );

            this.createLights();
            //this.knot = this.createKnot();
            this.d6 = this.createD6();

            // ...the rare and elusive hard binding appears! but why?
            this.render = this.render.bind( this );
            this.render()
            //document.body.removeChild( this.renderer.domElement);
        },

        createLights() {
            const pointLight = new THREE.PointLight( 0xffffff );
            pointLight.position.z = 100;

            this.scene.add( pointLight )
        },

        createKnot() {
            const knotgeo = new THREE.TorusKnotGeometry( 10, .1, 128, 16, 5, 21 );
            const mat     = new THREE.MeshPhongMaterial({ color:0xff0000, shininess:2000 });
            const knot    = new THREE.Mesh( knotgeo, mat );

            this.scene.add( knot );
            return knot
        },

        createD6(){
            const geometry = new THREE.BoxGeometry(2, 2, 2);
            const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
            const d6 = new THREE.Mesh(geometry, material);

            this.scene.add(d6);
            return d6;
        },

        render() {
            //this.knot.rotation.x += .025;
            this.d6.rotateX(0.25);
            this.d6.rotateY(0.25);
            this.d6.rotateZ(0.25);
            this.d6.translateX(0.025);
            this.renderer.render( this.scene, this.camera );
            window.requestAnimationFrame( this.render );
        }
};



window.onload = function() {
    document.getElementById('errorLabel').style.display = "none";
    const button1 = document.querySelector( '#submitButton' );
    button1.onclick = submit
};