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

  queueChange(x, y, value) {
    this.changeQueue.push({ x, y, value });
  }

  clearQueue() {
    for (const { x, y, value } of this.changeQueue) {
      this.setPoint(x, y, value);
    }
    this.changeQueue = [];
  }

  calculatePoint(x, y) {
    // Top left corner
    const topLeftX = Math.floor(x);
    const topLeftY = Math.floor(y);
    const topLeftZ = this.getPoint(topLeftX, topLeftY);

    // Top right corner
    const topRightX = topLeftX + 1;
    const topRightY = topLeftY;
    const topRightZ = this.getPoint(topRightX, topRightY);

    // Bottom left corner
    const botLeftX = topLeftX;
    const botLeftY = topLeftY + 1;
    const botLeftZ = this.getPoint(botLeftX, botLeftY);

    // Bottom right corner
    const botRightX = topRightX;
    const botRightY = botLeftY;
    const botRightZ = this.getPoint(botRightX, botRightY);

    // Calculate distance to each point
    const topLeftDx = topLeftX - x;
    const topLeftDy = topLeftY - y;
    const topLeftDist = Math.sqrt(
      topLeftDx * topLeftDx + topLeftDy * topLeftDy
    );

    const topRightDx = topRightX - x;
    const topRightDy = topRightY - y;
    const topRightDist = Math.sqrt(
      topRightDx * topRightDx + topRightDy * topRightDy
    );

    const botLeftDx = botLeftX - x;
    const botLeftDy = botLeftY - y;
    const botLeftDist = Math.sqrt(
      botLeftDx * botLeftDx + botLeftDy * botLeftDy
    );

    const botRightDx = botRightX - x;
    const botRightDy = botRightY - y;
    const botRightDist = Math.sqrt(
      botRightDx * botRightDx + botRightDy * botRightDy
    );

    // Interpolate the height at the point
    const z =
      (1 - topLeftDist) * topLeftZ +
      (1 - topRightDist) * topRightZ +
      (1 - botLeftDist) * botLeftZ +
      (1 - botRightDist) * botRightZ;

    // Calculate direction of flow
    const topLeftDz = topLeftZ - z;
    const topRightDz = topRightZ - z;
    const botLeftDz = botLeftZ - z;
    const botRightDz = botRightZ - z;

    // Subtract each dz from the max dz
    // This is to weight lower points higher
    const maxDz = Math.max(topLeftDz, topRightDz, botLeftDz, botRightDz);
    const weightedTopLeftDz = maxDz - topLeftDz;
    const weightedTopRightDz = maxDz - topRightDz;
    const weightedBotLeftDz = maxDz - botLeftDz;
    const weightedBotRightDz = maxDz - botRightDz;

    const weightedSum =
      weightedTopLeftDz +
      weightedTopRightDz +
      weightedBotLeftDz +
      weightedBotRightDz;

    // Calculate each points contribution to the flow direction
    const topLeftWeight = weightedTopLeftDz / weightedSum;
    const topRightWeight = weightedTopRightDz / weightedSum;
    const botLeftWeight = weightedBotLeftDz / weightedSum;
    const botRightWeight = weightedBotRightDz / weightedSum;

    // Gradient should be weighted average of dzs
    const gradientX =
      topLeftWeight * topLeftDx +
      topRightWeight * topRightDx +
      botLeftWeight * botLeftDx +
      botRightWeight * botRightDx;

    const gradientY =
      topLeftWeight * topLeftDy +
      topRightWeight * topRightDy +
      botLeftWeight * botLeftDy +
      botRightWeight * botRightDy;

    const gradientZ =
      topLeftWeight * topLeftDz +
      topRightWeight * topRightDz +
      botLeftWeight * botLeftDz +
      botRightWeight * botRightDz;

    return {
      z,
      topLeftX,
      topLeftY,
      topLeftZ,
      topRightX,
      topRightY,
      topRightZ,
      botLeftX,
      botLeftY,
      botLeftZ,
      botRightX,
      botRightY,
      botRightZ,
      topLeftWeight,
      topRightWeight,
      botLeftWeight,
      botRightWeight,
      gradientX,
      gradientY,
      gradientZ
    };
  }

  getXBounded(x) {
    while (x < 0) {
      x += this.width;
    }
    while (x >= this.width) {
      x -= this.width;
    }
    return x;
  }

  getYBounded(y) {
    while (y < 0) {
      y += this.height;
    }
    while (y >= this.height) {
      y -= this.height;
    }
    return y;
  }

  simulateDrop(x, y) {
    let { sedimentPickup } = this;
    let sediment = 0;
    let water = 1;
    let speed = 0;

    for (let step = 0; step < 30; step++) {
      water -= 0.01;

      const analysis = this.calculatePoint(x, y);
      if (analysis) {
        const {
          z,
          topLeftX,
          topLeftY,
          topLeftZ,
          topRightX,
          topRightY,
          topRightZ,
          botLeftX,
          botLeftY,
          botLeftZ,
          botRightX,
          botRightY,
          botRightZ,
          topLeftWeight,
          topRightWeight,
          botLeftWeight,
          botRightWeight,
          gradientX,
          gradientY,
          gradientZ
        } = this.calculatePoint(x, y);

        // Calculate gradient magnitude
        const gradientMagnitude = Math.sqrt(
          gradientX * gradientX + gradientY * gradientY
        );

        // Calculate normalized gradient to represent the direction
        const normalizedDx = gradientX / gradientMagnitude;
        const normalizedDy = gradientY / gradientMagnitude;
        // const normalizedDz = gradientZ / gradientMagnitude;

        // Increase the speed according to the z gradient
        speed -= gradientZ;

        // Calculate capacity
        const capacity = Math.max(0.05, speed * water);
        const inertia = speed * water * 10;

        // Check if we're either moving uphill or over capacity
        if (sediment > capacity || gradientZ - inertia > 0) {
          if (gradientZ > 0) {
            // Attempt to deposit up to the gradient
            const deposit = Math.min(sediment, gradientZ);
            sediment -= deposit;

            // Deposit across the cell
            this.setPoint(
              topLeftX,
              topLeftY,
              topLeftZ + topLeftWeight * deposit
            );
            this.setPoint(
              topRightX,
              topRightY,
              topRightZ + topRightWeight * deposit
            );
            this.setPoint(
              botLeftX,
              botLeftY,
              botLeftZ + botLeftWeight * deposit
            );
            this.setPoint(
              botRightX,
              botRightY,
              botRightZ + botRightWeight * deposit
            );

            // Try to keep going
            if (sediment >= gradientZ - inertia) {
              const dx = normalizedDx * speed;
              const dy = normalizedDy * speed;
              x += dx;
              y += dy;
            }
          } else {
            // Otherwise we are over capacity
            // Drop some and keep going
            const deposit = sediment - capacity;
            sediment -= deposit;

            // Deposit across the cell
            this.setPoint(
              topLeftX,
              topLeftY,
              topLeftZ + topLeftWeight * deposit
            );
            this.setPoint(
              topRightX,
              topRightY,
              topRightZ + topRightWeight * deposit
            );
            this.setPoint(
              botLeftX,
              botLeftY,
              botLeftZ + botLeftWeight * deposit
            );
            this.setPoint(
              botRightX,
              botRightY,
              botRightZ + botRightWeight * deposit
            );

            // Keep flowing
            const dx = normalizedDx * speed;
            const dy = normalizedDy * speed;
            x += dx;
            y += dy;
          }
        } else {
          // Continue flowing but erode the terrain
          const pickup = sedimentPickup;
          this.setPoint(topLeftX, topLeftY, topLeftZ - topLeftWeight * pickup);
          this.setPoint(
            topRightX,
            topRightY,
            topRightZ - topRightWeight * pickup
          );
          this.setPoint(botLeftX, botLeftY, botLeftZ - botLeftWeight * pickup);
          this.setPoint(
            botRightX,
            botRightY,
            botRightZ - botRightWeight * pickup
          );

          // Go on
          const dx = normalizedDx * speed;
          const dy = normalizedDy * speed;
          x += dx;
          y += dy;
        }
      }
    }
  }

  erode() {
    const x = Math.random() * this.width;
    const y = Math.random() * this.height;
    this.simulateDrop(x, y);
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
