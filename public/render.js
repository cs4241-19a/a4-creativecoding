function render() {
  if (pressed === true) {
    requestAnimationFrame(render);
  }
  sun.rotation.x += 0.025;
  var elapsed = Date.now() * 0.0005;

  //mercury position
  mercury.rotation.x += 0.025;
  mercury.position.x = Math.sin(elapsed * 4.5) * 4;
  mercury.position.y = Math.sin(elapsed * 4.5) * 2;
  mercury.position.z = Math.cos(elapsed * 4.5) * 4;

  //venus position
  venus.rotation.x += 0.025;
  venus.position.x = Math.sin(elapsed * 2.5) * 7;
  venus.position.y = Math.cos(elapsed * 2.5) * 2;
  venus.position.z = Math.cos(elapsed * 2.5) * 7;

  //earth position
  earth.rotation.x += 0.025;
  earth.position.x = Math.sin(elapsed * 2) * 10;
  earth.position.z = Math.cos(elapsed * 2) * 10;

  //mars position
  mars.rotation.x += 0.025;
  mars.position.x = Math.sin(elapsed * 1.9) * 11;
  mars.position.y = Math.sin(elapsed * 1.9) * 4;
  mars.position.z = Math.cos(elapsed * 1.9) * 11;

  //Jupiter position
  jupiter.rotation.x += 0.025;
  jupiter.position.x = Math.sin(elapsed * 1.75) * 13;
  jupiter.position.y = Math.cos(elapsed * 1.75) * 5;
  jupiter.position.z = Math.cos(elapsed * 1.75) * 13;

  //Saturn position
  saturn.rotation.x += 0.025;
  saturn.position.x = Math.sin(elapsed * 1.5) * 14;
  saturn.position.y = Math.sin(elapsed * 1.5) * 3;
  saturn.position.z = Math.cos(elapsed * 1.5) * 14;
  //ring.rotation.y += 0.0025;
  ring.position.x = Math.sin(elapsed * 1.5) * 14;
  ring.position.y = Math.sin(elapsed * 1.5) * 3;
  ring.position.z = Math.cos(elapsed * 1.5) * 14;

  //Uranus position
  uranus.rotation.x += 0.025;
  uranus.position.x = Math.sin(elapsed * 1) * 16;
  uranus.position.y = Math.cos(elapsed * 1) * 3;
  uranus.position.z = Math.cos(elapsed * 1) * 16;

  //Neptune position
  neptune.rotation.x += 0.025;
  neptune.position.x = Math.sin(elapsed * 0.75) * 20;
  neptune.position.y = Math.sin(elapsed * 0.75) * 2;
  neptune.position.z = Math.cos(elapsed * 0.75) * 20;

  renderer.render(scene, camera);
}
