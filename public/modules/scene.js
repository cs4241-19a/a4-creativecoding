/**
 * Author: Zonglin Peng
*/
const MWIDTH = 1,
    GAP = 2,
    METERNUM = Math.round(100 / (MWIDTH + GAP)),
    MTHICKNESS = 1,
    WIDTH = window.innerWidth, //window
    HEIGHT = window.innerHeight
var plane,
    planeGeometry,
    planeMaterial,
    spotLight = new THREE.SpotLight(0xffffff),
    ambientLight = new THREE.AmbientLight(0x404040),
    scene = new THREE.Scene(),
    render = new THREE.WebGLRenderer({ antialias: true }),
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 1000),
    orbitControls = new THREE.OrbitControls(camera)
orbitControls.minDistance = 50
orbitControls.maxDistance = 200
orbitControls.maxPolarAngle = 1.5
orbitControls.noPan = true
render.setClearColor(0x212121)
render.setSize(WIDTH, HEIGHT)
render.shadowMapEnabled = true
planeGeometry = new THREE.PlaneGeometry(500, 500)
planeMaterial = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture("../materials/bg.jpg"),
    color: 0x222222,
    ambient: 0x555555,
    specular: 0xdddddd,
    shininess: 5,
    reflectivity: 2,
    side: THREE.DoubleSide
})

// ========== CANERA ==========
//the camera
camera.position.x = 0
camera.position.y = 10
camera.position.z = 110
camera.lookAt(scene.position)
//add an ambient light for a better look
scene.add(ambientLight)
//the spot light
spotLight.position.set(0, 60, 40)
//spotLight.castShadow = true
scene.add(spotLight)
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7)
directionalLight.castShadow = true
directionalLight.position.set(0, 10, 10)
scene.add(directionalLight)
  
// ========== SHAPES ==========
plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -0.5 * Math.PI
plane.position.x = 15
plane.position.y = 0
plane.position.z = 0
plane.receiveShadow = true
scene.add(plane)
//the cube
var cubeGeometry = new THREE.CubeGeometry(MWIDTH, 1, MTHICKNESS)
var cubeMaterial = new THREE.MeshPhongMaterial({
    color: 0x7a7a7a, //0x16f1ff,
    ambient: 0x7a7a7a, 
    specular: 0x7a7a7a,
    shininess: 20,
    reflectivity: 5.5
})
var capGeometry = new THREE.SphereGeometry(MWIDTH, 0.5, MTHICKNESS)
var capMaterial = new THREE.MeshPhongMaterial({
    color: 0x848484,
    ambient: 0x848484,
    specular: 0x848484,
    shininess: 30,
    reflectivity: 5.5
})
for (var i = METERNUM - 1; i >= 0; i--) {
    // ========== CREATE CUBEs ==========
        //cap
        var cap = new THREE.Mesh(capGeometry, capMaterial)
        cap.position.x = -45 + (MWIDTH + GAP) * i
        cap.position.y = 0.5
        cap.position.z = Math.sqrt(Math.pow(METERNUM, 2) - Math.pow(cap.position.x, 2))* Math.pow(-1, i)
        cap.castShadow = true
        cap.name = 'cap' + i
        scene.add(cap)
        //bar
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.position.x = -45 + (MWIDTH + GAP) * i
        cube.position.y = -1
        cube.position.z = Math.sqrt(Math.pow(METERNUM, 2) - Math.pow(cube.position.x, 2)) * Math.pow(-1, i)
        cube.castShadow = true
        cube.name = 'cube' + i
        scene.add(cube) 
  }

// export { WIDTH, HEIGHT, clock, 
//     plane, planeGeometry, planeMaterial, 
//     spotLight, ambientLight, scene, render, orbitControls,
//     cubeGeometry, cubeMaterial,capGeometry, capMaterial}

export { scene, render, camera, orbitControls, METERNUM }
