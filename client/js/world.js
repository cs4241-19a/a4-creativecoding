import { Scene } from "three-full";

class World {
  constructor() {
    this.scene = new Scene();
  }

  add(entity) {
    this.scene.add(entity.mesh);
  }
}

export default World;
