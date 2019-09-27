const roll3dDice = {
    init(args) {
        this.number = args.number;
        this.type = args.type;
        this.size = args.size;
        this.speed = args.speed;
        this.color = args.color;
        this.wireframe = args.wireframe;
        this.counter = 0;

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera();
        this.camera.position.z = 50;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( this.renderer.domElement );

        this.createLights();
        //this.knot = this.createKnot();
        if(this.type === "d1"){
            this.diceList = this.createD6();
        }
        if(this.type === "d4"){
            this.diceList = this.createD4();
        }
        if(this.type === "d6"){
            this.diceList = this.createD6();
        }
        if(this.type === "d8"){
            this.diceList = this.createD8();
        }
        //this.diceList = this.createD10();
        //this.diceList = this.createD12();

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
                new THREE.Vector3( 1, 1, 1 ),
                new THREE.Vector3( -1, -1, 1 ),
                new THREE.Vector3( -1, 1, -1 ),
                new THREE.Vector3(1, -1, -1)
            ];

            geometry.faces = [
                new THREE.Face3( 1, 0, 2, 1 ),
                new THREE.Face3( 0, 1, 3, 2 ),
                new THREE.Face3( 0, 3, 2, 3 ),
                new THREE.Face3( 1, 2, 3,4 )
            ];
            const transformation = new THREE.Matrix4().makeScale(this.size, this.size, this.size);
            geometry.applyMatrix( transformation );
            const material = new THREE.MeshBasicMaterial({color: this.color, wireframe: this.wireframe});
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
            const geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
            const material = new THREE.MeshBasicMaterial({color: this.color, wireframe: this.wireframe});
            const d6 = new THREE.Mesh(geometry, material);
            diceList.push(d6);
            //let v = new THREE.Vector3(this.randomPlacement(0, window.innerWidth), this.randomPlacement(0, window.innerHeight), this.randomPlacement(-100, 100));
            console.log(diceList[i]);
            //diceList[i].position.set(v);
            this.scene.add(diceList[i]);
        }

        return diceList;
    },

    createD8(){
        let diceList = [];
        for(let i = 0; i < this.number; i++){
            const geometry = new THREE.Geometry();

            geometry.vertices = [
                new THREE.Vector3( 1, 0, 0 ),
                new THREE.Vector3( -1, 0, 0 ),
                new THREE.Vector3( 0, 1, 0 ),
                new THREE.Vector3(0, -1, 0),
                new THREE.Vector3(0, 0, 1),
                new THREE.Vector3(0, 0, -1)
            ];

            geometry.faces = [
                new THREE.Face3( 0, 2, 4, 1 ),
                new THREE.Face3( 0, 4, 3, 2 ),
                new THREE.Face3( 0, 3, 5, 3 ),
                new THREE.Face3( 0, 5, 2, 4 ),
                new THREE.Face3( 1, 3, 4, 5 ),
                new THREE.Face3( 1, 4, 2, 6),
                new THREE.Face3( 1, 2, 5, 7),
                new THREE.Face3( 1, 5, 3, 8)
            ];
            const transformation = new THREE.Matrix4().makeScale(this.size, this.size, this.size);
            geometry.applyMatrix( transformation );
            const material = new THREE.MeshBasicMaterial({color: this.color, wireframe: this.wireframe});
            const d8 = new THREE.Mesh(geometry, material);
            diceList.push(d8);
            //let v = new THREE.Vector3(this.randomPlacement(0, window.innerWidth), this.randomPlacement(0, window.innerHeight), this.randomPlacement(-100, 100));
            console.log(diceList[i]);
            //diceList[i].position.set(v);
            this.scene.add(diceList[i]);
        }

        return diceList;
    },

    createD10(){
        let diceList = [];
        for(let i = 0; i < this.number; i++){
            const geometry = new THREE.Geometry();

            this.vertices = [];

            geometry.faces = [
                new THREE.Face3( 5, 7, 11, 0 ),
                new THREE.Face3( 4, 2, 10, 11 ),
                new THREE.Face3( 1, 3, 11, 2 ),
                new THREE.Face3( 0, 8, 10, 3 ),
                new THREE.Face3( 7, 9, 11, 4 ),
                new THREE.Face3( 8, 6, 10, 5 ),
                new THREE.Face3( 9, 1, 11, 6 ),
                new THREE.Face3( 2, 0, 10, 7 ),
                new THREE.Face3( 3, 5, 11, 8 ),
                new THREE.Face3( 6, 4, 10, 9 ),
                new THREE.Face3( 1, 0, 2, -1 ),
                new THREE.Face3( 1, 2, 3, -1 ),
                new THREE.Face3( 3, 2, 4, -1 ),
                new THREE.Face3( 3, 4, 5, -1 ),
                new THREE.Face3( 5, 4, 6, -1 ),
                new THREE.Face3( 5, 6, 7, -1 ),
                new THREE.Face3( 7, 6, 8, -1 ),
                new THREE.Face3( 7, 8, 9, -1 ),
                new THREE.Face3( 9, 8, 0, -1 ),
                new THREE.Face3( 9, 0, 1, -1 )
            ];
            for (let i = 0, b = 0; i < 10; ++i, b += Math.PI * 2 / 10) {
                this.vertices.push([Math.cos(b), Math.sin(b), 0.105 * (i % 2 ? 1 : -1)]);
            }
            this.vertices.push([0, 0, -1]);
            this.vertices.push([0, 0, 1]);
            geometry.vertices = this.vertices;
            const transformation = new THREE.Matrix4().makeScale(1, 1, 1);
            geometry.applyMatrix( transformation );
            const material = new THREE.MeshBasicMaterial({color: 0xff0000, shininess:2000});
            const d10 = new THREE.Mesh(geometry, material);
            diceList.push(d10);
            //let v = new THREE.Vector3(this.randomPlacement(0, window.innerWidth), this.randomPlacement(0, window.innerHeight), this.randomPlacement(-100, 100));
            console.log(diceList[i]);
            //diceList[i].position.set(v);
            this.scene.add(diceList[i]);
        }

        return diceList;
    },

    createD12(){
        let diceList = [];
        for(let i = 0; i < this.number; i++){
            const geometry = new THREE.Geometry();

            let p = (1 + Math.sqrt(5)) / 2;
            let q = 1 / p;
            this.vertices = [
                new THREE.Vector3( 0, q, p ),
                new THREE.Vector3( 0, q, -p ),
                new THREE.Vector3( 0, -q, p ),
                new THREE.Vector3( 0, -q, -p ),
                new THREE.Vector3( p, 0, q ),
                new THREE.Vector3( p, 0, -q ),
                new THREE.Vector3( -p, 0, q ),
                new THREE.Vector3( -p, 0, -q ),
                new THREE.Vector3( q, p, 0 ),
                new THREE.Vector3( q, -p, 0 ),
                new THREE.Vector3( -q, p, 0 ),
                new THREE.Vector3( -q, -p, 0 ),
                new THREE.Vector3( 1, 1, 1 ),
                new THREE.Vector3( 1, 1, -1 ),
                new THREE.Vector3( 1, -1, 1 ),
                new THREE.Vector3( 1, -1, -1 ),
                new THREE.Vector3( -1, 1, 1 ),
                new THREE.Vector3( -1, 1, -1 ),
                new THREE.Vector3( -1, -1, 1 ),
                new THREE.Vector3( -1, -1, -1 )

            ];

            geometry.faces = [
                new THREE.Face3( 2, 14, 4, 12, 0, 1 ),
                new THREE.Face3( 15, 9, 11, 19, 3, 2 ),
                new THREE.Face3( 16, 10, 17, 7, 6, 3 ),
                new THREE.Face3( 6, 7, 19, 11, 18, 4 ),
                new THREE.Face3( 6, 18, 2, 0, 16, 5 ),
                new THREE.Face3( 18, 11, 9, 14, 2, 6 ),
                new THREE.Face3( 1, 17, 10, 8, 13, 7 ),
                new THREE.Face3( 1, 13, 5, 15, 3, 8 ),
                new THREE.Face3( 13, 8, 12, 4, 5, 9 ),
                new THREE.Face3( 5, 4, 14, 9, 15, 10 ),
                new THREE.Face3( 0, 12, 8, 10, 16, 11 ),
                new THREE.Face3( 3, 19, 7, 17, 1, 12 )
            ];

            const transformation = new THREE.Matrix4().makeScale(1, 1, 1);
            geometry.applyMatrix( transformation );
            const material = new THREE.MeshBasicMaterial({color: 0xff0000, shininess:2000});
            const d12 = new THREE.Mesh(geometry, material);
            diceList.push(d12);
            //let v = new THREE.Vector3(this.randomPlacement(0, window.innerWidth), this.randomPlacement(0, window.innerHeight), this.randomPlacement(-100, 100));
            console.log(diceList[i]);
            //diceList[i].position.set(v);
            this.scene.add(diceList[i]);
        }

        return diceList;
    },

    randomPlacement(start, end) {
        return Math.floor(Math.random() * (end - start)) + start;
    },

    render() {
        //this.knot.rotation.x += .025;

        for(let i = 0; i < this.number; i++) {
            this.diceList[i].rotateX(Math.random() * this.speed);
            this.diceList[i].rotateY(Math.random() * this.speed);
            this.diceList[i].rotateZ(Math.random() * this.speed);
            this.diceList[i].translateX(Math.random() * this.speed);
            this.diceList[i].translateY(Math.random() * this.speed);
            this.diceList[i].translateZ(Math.random() * this.speed);
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

export{roll3dDice};