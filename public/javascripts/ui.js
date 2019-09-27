function guiFunction() {
    const gui = new dat.GUI();

    var cam = gui.addFolder('Camera');
    cam.add(options.camera, 'speed', 0, 0.0010).listen();
    cam.add(camera.position, 'y', 0, 100).listen();
    cam.open();

    var velocity = gui.addFolder('Velocity');
    velocity.add(options, 'velx', -0.2, 0.2).name('X').listen();
    velocity.add(options, 'vely', -0.2, 0.2).name('Y').listen();
    velocity.open();

    var box = gui.addFolder('Cube');
    box.add(cube.scale, 'x', 0, 3).name('Width').listen();
    box.add(cube.scale, 'y', 0, 3).name('Height').listen();
    box.add(cube.scale, 'z', 0, 3).name('Length').listen();
    box.add(cube.material, 'wireframe').listen();
    box.open();

    gui.add(options, 'stop');
    gui.add(options, 'reset');

    // Rendering the animation   

    var render = function () {

        requestAnimationFrame(render);

        var timer = Date.now() * options.camera.speed;
        camera.position.x = Math.cos(timer) * 100;
        camera.position.z = Math.sin(timer) * 100;
        camera.lookAt(scene.position);
        camera.updateMatrixWorld();

        cube.rotation.x += options.velx;
        cube.rotation.y += options.vely;

        renderer.render(scene, camera);

    };
    render();
}

export default guiFunction;