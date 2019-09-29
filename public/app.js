const THREE = require("three");
const planets = require("./planets.js");
const modal = require("./modal.js");

init();

function init() {
  let pressed = true;

  let scene = new THREE.Scene();

  let camera = new THREE.PerspectiveCamera();
  camera.position.z = 50;

  let renderer = new THREE.WebGLRenderer();
  let length;
  if (window.innerWidth >= window.innerHeight) {
    length = window.innerHeight - 100;
  } else {
    length = window.innerWidth - 100;
  }

  renderer.setSize(length, length);

  document.querySelector("#test").appendChild(renderer.domElement);

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.z = 1000;

  scene.add(pointLight);

  let all = planets.createPlanets(scene);
  let sun = all[0];
  let mercury = all[1];
  let venus = all[2];
  let earth = all[3];
  let mars = all[4];
  let jupiter = all[5];
  let saturn = all[6];
  let ring = all[7];
  let uranus = all[8];
  let neptune = all[9];

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

  render();

  document.body.addEventListener("keypress", function(e) {
    if (e.keyCode == 112) {
      pressed = !pressed;
    } else if (e.which == 119) {
      camera.position.y -= 1;
    } else if (e.which == 97) {
      camera.position.x += 1;
    } else if (e.which == 115) {
      camera.position.y += 1;
    } else if (e.which == 100) {
      camera.position.x -= 1;
    } else if (e.which == 122) {
      camera.position.z -= 1;
    } else if (e.which == 98) {
      camera.position.z += 1;
    } else if (e.which == 102) {
      pointLight.power += 2.5;
    } else if (e.which == 103) {
      pointLight.power -= 2.5;
    } else if (e.which == 110) {
      length += 10;
      renderer.setSize(length, length);
    } else if (e.which == 109) {
      length -= 10;
      renderer.setSize(length, length);
    } else if (e.which == 105) {
      modal.display();
    }
    render();
  });
}

function planetSelect(planet) {
  let selected, selectedplanet;
  selected = document.getElementById("selected");
  let facts = document.getElementById("facts");

  selectedplanet = document.getElementById(planet);
  console.log(selectedplanet.id);
  selected.innerHTML = planet;
  if (selectedplanet.id === "Sun") {
    facts.innerHTML = "Diameter - 864,340 miles";
  } else if (selectedplanet.id === "Mercury") {
    facts.innerHTML = "Diameter - 3,031 miles";
  } else if (selectedplanet.id === "Venus") {
    facts.innerHTML = "Diameter - 7,521 miles";
  } else if (selectedplanet.id === "Earth") {
    facts.innerHTML = "Diameter - 7,926 miles";
  } else if (selectedplanet.id === "Mars") {
    facts.innerHTML = "Diameter - 4,222 miles";
  } else if (selectedplanet.id === "Jupiter") {
    facts.innerHTML = "Diameter - 88,846 miles";
  } else if (selectedplanet.id === "Saturn") {
    facts.innerHTML = "Diameter - 74,900 miles";
  } else if (selectedplanet.id === "Uranus") {
    facts.innerHTML = "Diameter - 31,763 miles";
  } else if (selectedplanet.id === "Neptune") {
    facts.innerHTML = "Diameter - 30,779 miles";
  }
  selected.style.color = selectedplanet.style.backgroundColor;
  facts.style.color = selectedplanet.style.backgroundColor;
}

module.exports = {
  init,
  planetSelect
};
