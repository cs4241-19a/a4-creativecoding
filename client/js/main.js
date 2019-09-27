import {
  AmbientLight,
  HemisphereLight,
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  Mesh,
  MeshPhongMaterial,
  PointLight,
  DirectionalLight,
  Fog,
  Sky,
  OrbitControls,
  SphereBufferGeometry,
  MeshBasicMaterial
} from "three-full";
import { GUI } from "dat.gui";
import Terrain from "./terrain";

class App {
  constructor() {
    this.settings = {
      amplitude: 3,
      persistence: 0.2,
      octaves: 4
    };
    this.constructRenderer();
    this.constructScene();
    this.updateTerrain();
    this.constructCamera();
    this.constructLight();
    this.constructGUI();
    this.initWindowListeners();
    this.render = this.render.bind(this);
  }

  get aspectRatio() {
    return window.innerWidth / window.innerHeight;
  }

  deleteMesh(mesh) {
    this.scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
  }

  updateTerrain() {
    const { terrainMesh, settings } = this;
    if (terrainMesh) {
      this.deleteMesh(terrainMesh);
    }

    this.terrainGen = new Terrain(50, 50, settings);
    this.terrainMesh = this.terrainGen.toMesh();
    this.scene.add(this.terrainMesh);
  }

  initWindowListeners() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.mouseDown = false;
    window.addEventListener("resize", () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = this.aspectRatio;
      this.camera.updateProjectionMatrix();
    });
    // window.addEventListener("mousedown", () => {
    //   this.mouseDown = true;
    // });
    // window.addEventListener("mouseup", () => {
    //   this.mouseDown = false;
    // });
    // window.addEventListener("mousemove", e => {
    //   if (this.mouseDown) {
    //     const { movementX: dx, movementY: dy } = e;
    //     this.camera.rotation.y += dx * 0.01;
    //     this.camera.rotation.x += dy * 0.01;
    //   }
    // });
  }

  constructGUI() {
    const gui = new GUI();

    const lightSettings = gui.addFolder("Light");
    lightSettings.add(this.light.position, "x", -100, 100);
    lightSettings.add(this.light.position, "y", -100, 100);
    lightSettings.add(this.light.position, "z", -100, 100);
    lightSettings.addColor(this.light, "color");
    lightSettings.add(this.light, "intensity", 0, 10);

    const terrainSettings = gui.addFolder("Terrain");
    const tA = terrainSettings.add(this.settings, "amplitude", 0, 10);
    const tP = terrainSettings.add(this.settings, "persistence", 0, 1);
    const tO = terrainSettings.add(this.settings, "octaves", 1, 30);

    tA.onFinishChange(() => {
      this.updateTerrain();
    });

    tP.onFinishChange(() => {
      this.updateTerrain();
    });

    tO.onFinishChange(() => {
      this.updateTerrain();
    });
  }

  constructRenderer() {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setClearColor("#000000");
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer = renderer;
  }

  constructCamera() {
    const camera = new PerspectiveCamera(75, this.aspectRatio, 0.1, 2000000);
    camera.position.y = 20;
    camera.rotation.x = 1;
    this.camera = camera;
  }

  constructLight() {
    this.light = new HemisphereLight(0x000000, 0xffffff, 0.95);
    this.light.position.set(0, -50, -100);
    this.scene.add(this.light);

    this.ambientLight = new AmbientLight(0xaaccff, 0.35);
    this.ambientLight.position.set(-200, -100, 200);
    this.scene.add(this.ambientLight);
  }

  constructScene() {
    const scene = new Scene();
    this.scene = scene;
  }

  attachRenderer() {
    document.body.appendChild(this.renderer.domElement);
  }

  render() {
    window.requestAnimationFrame(this.render);

    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.attachRenderer();
    this.render();
  }
}

const render = () => {
  requestAnimationFrame(render);
};

const main = async () => {
  const app = new App();
  app.start();
};

window.onload = main;
