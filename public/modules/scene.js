const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
const controls = new THREE.OrbitControls(camera, renderer.domElement)
const spotLight = new THREE.SpotLight(0xffffff)

export { scene, camera, renderer, controls, spotLight }