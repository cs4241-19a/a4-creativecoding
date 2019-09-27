import {
  PlaneGeometry,
  Mesh,
  MeshPhongMaterial,
  SimplexNoise,
  FlatShading
} from "three-full";

import { averageNeighbors, fillMatrix } from "./noise";

class Terrain {
  constructor(width, height, options = {}) {
    const {
      amplitude = 0.5,
      dropoff = 0.2,
      layers = 10,
      sedimentPickup = 0.01,
      drops
    } = options;
    this.drops = drops;
    this.amplitude = amplitude;
    this.dropoff = dropoff;
    this.layers = layers;
    this.width = width;
    this.height = height;
    this.sedimentPickup = sedimentPickup;
    this.simplices = [];
    this.changeQueue = [];
    for (let i = 0; i < layers; i++) {
      this.simplices.push(new SimplexNoise());
    }

    this.generateData();
  }

  isValid(x, y) {
    return 0 <= x && x < this.width && 0 <= y && y < this.height;
  }

  getPoint(x, y) {
    if (this.isValid(x, y)) {
      return this.data[x + y * this.width];
    } else {
      return Infinity;
    }
  }

  setPoint(x, y, value) {
    if (this.isValid(x, y)) {
      this.data[x + y * this.width] = value;
    }
  }

  getNoise(layer, x, y, z, w = 0) {
    return this.simplices[layer].noise4d(x, y, z, w);
  }

  addLayers(x, y, dropoff, layers) {
    let sum = 0;
    let mult = 0.01;

    for (let i = 0; i < layers; i++) {
      const add = this.getNoise(i, x * mult, y * mult, 0, 0) / mult / 10;
      mult /= dropoff;
      sum += add;
    }

    return sum;
  }

  generateData() {
    this.data = fillMatrix(this.width, this.height);
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const index = x + y * this.width;
        this.data[index] = this.addLayers(x, y, this.dropoff, this.layers);
      }
    }
  }

  toMesh() {
    const geometry = new PlaneGeometry(
      100,
      100,
      this.width - 1,
      this.height - 1
    );
    const { vertices } = geometry;
    geometry.verticesNeedUpdate = true;
    for (let i = 0; i < vertices.length; i++) {
      vertices[i].z = this.data[i] * this.amplitude;
    }
    geometry.flatShading = true;
    geometry.computeVertexNormals();

    const material = new MeshPhongMaterial({
      color: 0x444444,
      shininess: 1000
    });

    const mesh = new Mesh(geometry, material);

    mesh.rotation.x = Math.PI * -0.5;

    return mesh;
  }
}

export default Terrain;
