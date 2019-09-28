const THREE = require("three");

let sun, mercury, venus, mars, earth, jupiter, saturn, ring, uranus, neptune;

function createPlanets(scene) {
  //create sun
  let sunsize = 3.5;
  let sungeo = new THREE.SphereGeometry(sunsize, 50, 50);
  let sunmat = new THREE.MeshPhongMaterial({
    color: 0xfcd925,
    shininess: 2000
  });
  sun = new THREE.Mesh(sungeo, sunmat);

  scene.add(sun);

  //create mercury
  let mersize = 0.5;
  let mergeo = new THREE.SphereGeometry(mersize, 50, 50);
  let mermat = new THREE.MeshPhongMaterial({
    color: 0x848984,
    shininess: 2000
  });
  mercury = new THREE.Mesh(mergeo, mermat);
  mercury.position.set(-10, 0, -10);
  scene.add(mercury);

  //create venus
  let vensize = 0.9;
  let vengeo = new THREE.SphereGeometry(vensize, 50, 50);
  let venmat = new THREE.MeshPhongMaterial({
    color: 0xfdf3c0,
    shininess: 2000
  });
  venus = new THREE.Mesh(vengeo, venmat);
  venus.position.set(12, 0, 12);
  scene.add(venus);

  //create earth
  let earsize = 1;
  let eargeo = new THREE.SphereGeometry(earsize, 50, 50);
  let earmat = new THREE.MeshPhongMaterial({
    color: 0x0eaf04,
    shininess: 2000
  });
  earth = new THREE.Mesh(eargeo, earmat);
  earth.position.set(-12, 0, -12);
  scene.add(earth);

  //create mars
  const margeo = new THREE.SphereGeometry(0.8, 50, 50);
  const marmat = new THREE.MeshPhongMaterial({
    color: 0xf92f09,
    shininess: 2000
  });
  mars = new THREE.Mesh(margeo, marmat);
  mars.position.set(13, 0, 13);
  scene.add(mars);

  //create jupiter
  const jupgeo = new THREE.SphereGeometry(2.5, 50, 50);
  const jupmat = new THREE.MeshPhongMaterial({
    color: 0xfc843e,
    shininess: 2000
  });
  jupiter = new THREE.Mesh(jupgeo, jupmat);
  jupiter.position.set(14, 0, 14);
  scene.add(jupiter);

  //create saturn
  const satgeo = new THREE.SphereGeometry(1.75, 50, 50);
  const satmat = new THREE.MeshPhongMaterial({
    color: 0xfbc753,
    shininess: 2000
  });
  saturn = new THREE.Mesh(satgeo, satmat);
  saturn.position.set(15, 0, 15);
  scene.add(saturn);

  var ringgeo = new THREE.RingGeometry(1.8, 3, 50);
  var ringmat = new THREE.MeshBasicMaterial({
    color: 0xfbc753,
    side: THREE.DoubleSide
  });
  ring = new THREE.Mesh(ringgeo, ringmat);
  ring.position.set(15, 0, 15);
  ring.rotation.x += 2;
  scene.add(ring);

  //create uranus
  const urageo = new THREE.SphereGeometry(1.1, 50, 50);
  const uramat = new THREE.MeshPhongMaterial({
    color: 0x94cafc,
    shininess: 2000
  });
  uranus = new THREE.Mesh(urageo, uramat);
  uranus.position.set(15, 0, 15);
  scene.add(uranus);

  //create uranus
  const nepgeo = new THREE.SphereGeometry(1.1, 50, 50);
  const nepmat = new THREE.MeshPhongMaterial({
    color: 0x3544fa,
    shininess: 2000
  });
  neptune = new THREE.Mesh(nepgeo, nepmat);
  neptune.position.set(16, 0, 16);
  scene.add(neptune);
}

module.exports = function() {
  createPlanets,
    sun,
    mercury,
    venus,
    earth,
    mars,
    jupiter,
    saturn,
    ring,
    uranus,
    neptune;
};
