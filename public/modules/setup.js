/**
 * Author: Zonglin Peng
*/

var stats = new Stats()
stats.domElement.style.position = 'absolute'
stats.domElement.style.left = '0px'
stats.domElement.style.bottom = '0px'
stats.domElement.style.position = 'absolute'

var gui = new dat.GUI()

var xhr = new XMLHttpRequest()

var fr = new FileReader()

var clock = new THREE.Clock()

export { stats, gui, xhr, fr, clock }
