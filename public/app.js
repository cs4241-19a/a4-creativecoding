const THREE = require("three");
const planets = require("./planets");

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

  planets.createPlanets(scene);

  function render() {
    if (pressed === true) {
      requestAnimationFrame(render);
    }
    planets.sun.rotation.x += 0.025;
    var elapsed = Date.now() * 0.0005;

    //mercury position
    planets.mercury.rotation.x += 0.025;
    planets.mercury.position.x = Math.sin(elapsed * 4.5) * 4;
    planets.mercury.position.y = Math.sin(elapsed * 4.5) * 2;
    planets.mercury.position.z = Math.cos(elapsed * 4.5) * 4;

    //venus position
    planets.venus.rotation.x += 0.025;
    planets.venus.position.x = Math.sin(elapsed * 2.5) * 7;
    planets.venus.position.y = Math.cos(elapsed * 2.5) * 2;
    planets.venus.position.z = Math.cos(elapsed * 2.5) * 7;

    //earth position
    planets.earth.rotation.x += 0.025;
    planets.earth.position.x = Math.sin(elapsed * 2) * 10;
    planets.earth.position.z = Math.cos(elapsed * 2) * 10;

    //mars position
    planets.mars.rotation.x += 0.025;
    planets.mars.position.x = Math.sin(elapsed * 1.9) * 11;
    planets.mars.position.y = Math.sin(elapsed * 1.9) * 4;
    planets.mars.position.z = Math.cos(elapsed * 1.9) * 11;

    //Jupiter position
    planets.jupiter.rotation.x += 0.025;
    planets.jupiter.position.x = Math.sin(elapsed * 1.75) * 13;
    planets.jupiter.position.y = Math.cos(elapsed * 1.75) * 5;
    planets.jupiter.position.z = Math.cos(elapsed * 1.75) * 13;

    //Saturn position
    planets.saturn.rotation.x += 0.025;
    planets.saturn.position.x = Math.sin(elapsed * 1.5) * 14;
    planets.saturn.position.y = Math.sin(elapsed * 1.5) * 3;
    planets.saturn.position.z = Math.cos(elapsed * 1.5) * 14;
    //ring.rotation.y += 0.0025;
    planets.ring.position.x = Math.sin(elapsed * 1.5) * 14;
    planets.ring.position.y = Math.sin(elapsed * 1.5) * 3;
    planets.ring.position.z = Math.cos(elapsed * 1.5) * 14;

    //Uranus position
    planets.uranus.rotation.x += 0.025;
    planets.uranus.position.x = Math.sin(elapsed * 1) * 16;
    planets.uranus.position.y = Math.cos(elapsed * 1) * 3;
    planets.uranus.position.z = Math.cos(elapsed * 1) * 16;

    //Neptune position
    planets.neptune.rotation.x += 0.025;
    planets.neptune.position.x = Math.sin(elapsed * 0.75) * 20;
    planets.neptune.position.y = Math.sin(elapsed * 0.75) * 2;
    planets.neptune.position.z = Math.cos(elapsed * 0.75) * 20;

    renderer.render(scene, camera);
  }

  render();

  $("document").keydown(function(e) {
    if (e.which == 80) {
      pressed = !pressed;
    } else if (e.which == 87) {
      camera.position.y -= 1;
    } else if (e.which == 65) {
      camera.position.x += 1;
    } else if (e.which == 83) {
      camera.position.y += 1;
    } else if (e.which == 68) {
      camera.position.x -= 1;
    } else if (e.which == 90) {
      camera.position.z -= 1;
    } else if (e.which == 66) {
      camera.position.z += 1;
    } else if (e.which == 70) {
      pointLight.power += 2.5;
    } else if (e.which == 71) {
      pointLight.power -= 2.5;
    } else if (e.which == 78) {
      length += 10;
      renderer.setSize(length, length);
    } else if (e.which == 77) {
      length -= 10;
      renderer.setSize(length, length);
    } else if (e.which == 73) {
      modal.style.display = "block";
    }
    render();
  });

  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  };
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
