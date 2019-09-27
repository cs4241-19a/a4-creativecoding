import * as THREE from "three";

import { random_range } from "./utils";
import { scene } from "./app"

/**
 * Data Definition:
 * {
 *   geomtery: THREE.geometry,
 *   material: THREE.material,
 *   mesh: THREE.mesh,
 *   fade_rate: int,
 *   on_tick: function,
 * }
 */
const active_geometry = []


/**
 * Keybinds for controlling visualizer (not case sensitive)
 * 
 * C - spawn new cube at a random location
 */
document.addEventListener("keypress", event => {
  switch (event.keyCode) {
  case 67:{
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshNormalMaterial();
    material.transparent = true;
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(random_range(-1, 1), random_range(-1, 1), 0);
    active_geometry.push({
      geometry: geometry,
      material: material,
      mesh: mesh,
      fade_rate: 0.05,
      on_tick: function(){},
    });
    scene.add(mesh);
    break;
  }
  default:
    break;
  }
});

export {active_geometry};