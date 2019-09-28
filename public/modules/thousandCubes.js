let thousandCubes = []

for (let x = 0; x < 100; x += 10) {
	for (let y = 0; y < 100; y += 10) {
		for (let z = 0; z < 100; z += 10) {
			let material = new THREE.MeshPhongMaterial()
			let geometry = new THREE.BoxGeometry(4, 4, 4)
			let newCube = new THREE.Mesh(geometry, material)
			newCube.position.x = x
			newCube.position.y = y
			newCube.position.z = z
			thousandCubes.push(newCube)
		}
	}
}

// I know each module is supposed to have two functions, but I couldn't think of anything else to include
export { thousandCubes }
