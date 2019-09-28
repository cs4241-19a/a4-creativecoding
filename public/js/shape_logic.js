import * as THREE from "three";
import { scene } from './app';
import { random_range, random_choice } from "./utils";
import { Vector2 } from "three";

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

function generate_sin(min_x, max_x){
  const vect_2s = [];
  let cur_x = min_x;
  while (cur_x <= max_x){
    vect_2s.push(new THREE.Vector2(cur_x, 0));
    vect_2s.push(new THREE.Vector2(cur_x+.5, .5));
    vect_2s.push(new THREE.Vector2(cur_x+1, -.5));
    cur_x+=1.5;
  }
  return vect_2s;
}

export function create_box(){
  const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  const material = new THREE.MeshNormalMaterial();
  material.transparent = true;
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(random_range(-.5, .6), random_range(-.5, .5), random_range(-2, 1));
  active_geometry.push({
      geometry: geometry,
      material: material,
      mesh: mesh,
      fade_rate: 0.005,
      on_tick: function(){
        this.mesh.rotation.x += random_range(-2, 2);
        this.mesh.rotation.y += random_range(-.5, .5);
      },
  });
  scene.add(mesh);
}

export function mid_splash(){
  const geometry = new THREE.RingBufferGeometry(.15, .3, 64);
  const material = new THREE.MeshBasicMaterial( { color: random_choice([0x00efff, 0x1aef00]), side: THREE.DoubleSide } );
  material.transparent = true;
  const mesh = new THREE.Mesh( geometry, material );
  mesh.position.set(0,0,.5);
  active_geometry.push({
    geometry: geometry,
    material: material,
    mesh: mesh,
    fade_rate: 0.02,
    on_tick: function(){
      mesh.position.z -= .16;
    },
  })
  scene.add(mesh);
}

function sin_curve_create(right){
  const color = random_choice([
    0xff0000,
    0x00ff00,
    0xff00ff,
    0xeeffee,
    0xffa0e1,
  ]);
  const direction = right ? .002 : -.002;
  var curve = new THREE.SplineCurve(generate_sin(-2, 2));
  
  var points = curve.getPoints( 100 );
  var geometry = new THREE.BufferGeometry().setFromPoints( points );
  
  var material = new THREE.LineBasicMaterial( { color : color } );
  material.transparent = true;
  
  // Create the final object to add to the scene
  var splineObject = new THREE.Line( geometry, material );
  active_geometry.push({
    geometry: geometry,
    material: material,
    mesh: splineObject,
    fade_rate: 0.005,
    on_tick: function(){
      this.mesh.position.x += direction;
    },
  })
  scene.add(splineObject);
}

export function sin_curve_right(){
  sin_curve_create(true);
}

export function sin_curve_left(){
  sin_curve_create(false);
}

export {active_geometry};