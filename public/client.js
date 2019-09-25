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

    document.getElementById('resultLabel').innerHTML = "Result: Calculating" ;
    document.getElementById('dice').innerHTML = "";

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
                    setTimeout(function() {
                        document.getElementById('resultLabel').innerHTML = "Result: " + responseData.result;
                        drawDice(responseData.rolls, responseData.diceNum);
                    }, 3500);
                    roll3dDice.init(input2.value, "d6");
                    //window.location = '/views/index.html#canvas';
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
        init(number, type) {
            this.number = number;
            this.type = type;
            this.counter = 0;

            this.scene = new THREE.Scene();

            this.camera = new THREE.PerspectiveCamera();
            this.camera.position.z = 50;

            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize( window.innerWidth, window.innerHeight );

            document.body.appendChild( this.renderer.domElement );

            this.createLights();
            //this.knot = this.createKnot();
            this.diceList = this.createD4();
            //this.diceList = this.createD6();

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

        createD4(){
            let diceList = [];
            for(let i = 0; i < this.number; i++){
                const geometry = new THREE.Geometry();

                geometry.vertices = [
                    new THREE.Vector3( 0, 0, 0 ),
                    new THREE.Vector3( 0, 1, 0 ),
                    new THREE.Vector3( 1, 1, 0 ),
                    new THREE.Vector3( 1, 0, 0 ),
                    new THREE.Vector3( 0.5, 0.5, 1 )
                ];

                geometry.faces = [
                    new THREE.Face3( 0, 1, 2 ),
                    new THREE.Face3( 0, 2, 3 ),
                    new THREE.Face3( 1, 0, 4 ),
                    new THREE.Face3( 2, 1, 4 ),
                    new THREE.Face3( 3, 2, 4 ),
                    new THREE.Face3( 0, 3, 4 )
                ];
                const transformation = new THREE.Matrix4().makeScale(1, 1, 1);
                geometry.applyMatrix( transformation );
                const material = new THREE.MeshBasicMaterial({color: 0xffff00});
                const d4 = new THREE.Mesh(geometry, material);
                diceList.push(d4);
                //let v = new THREE.Vector3(this.randomPlacement(0, window.innerWidth), this.randomPlacement(0, window.innerHeight), this.randomPlacement(-100, 100));
                console.log(diceList[i]);
                //diceList[i].position.set(v);
                this.scene.add(diceList[i]);
            }

            return diceList;
        },

        createD6(){
            let diceList = [];
            for(let i = 0; i < this.number; i++){
                const geometry = new THREE.BoxGeometry(2, 2, 2);
                const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
                const d6 = new THREE.Mesh(geometry, material);
                diceList.push(d6);
                //let v = new THREE.Vector3(this.randomPlacement(0, window.innerWidth), this.randomPlacement(0, window.innerHeight), this.randomPlacement(-100, 100));
                console.log(diceList[i]);
                //diceList[i].position.set(v);
                this.scene.add(diceList[i]);
            }

            return diceList;
        },

        randomPlacement(start, end){
            return Math.floor(Math.random() * (end - start)) + start;
        },

        render() {
            //this.knot.rotation.x += .025;

            for(let i = 0; i < this.number; i++) {
                this.diceList[i].rotateX(Math.random() * 0.25);
                this.diceList[i].rotateY(Math.random() * 0.25);
                this.diceList[i].rotateZ(Math.random() * 0.25);
                this.diceList[i].translateX(Math.random() * 0.25);
                this.diceList[i].translateY(Math.random() * 0.25);
                this.diceList[i].translateZ(Math.random() * 0.25);
            }
            if(this.counter > 200){
                document.body.removeChild( this.renderer.domElement);
            }else {
                this.renderer.render(this.scene, this.camera);
                window.requestAnimationFrame(this.render);
                this.counter++;
            }
            console.log(this.counter);

        }
};



window.onload = function() {
    document.getElementById('errorLabel').style.display = "none";
    const button1 = document.querySelector( '#submitButton' );
    button1.onclick = submit
};