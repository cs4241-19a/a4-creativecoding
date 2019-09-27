import { BoxGeometry, MeshPhongMaterial, Mesh } from "three-full";

class Entity {
  constructor() {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshPhongMaterial({ color: 0x1f0707, shininess: 200 });
    this.mesh = new Mesh(geometry, material);
    this.velocity = {
      x: 0,
      y: 0,
      z: 0
    };
  }

  get rotation() {
    return this.mesh.rotation;
  }

  get position() {
    return this.mesh.position;
  }

  setVelocity(x, y, z) {
    this.velocity.x = x;
    this.velocity.y = y;
    this.velocity.z = z;
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.z += this.velocity.z;
  }
}

export default Entity;
