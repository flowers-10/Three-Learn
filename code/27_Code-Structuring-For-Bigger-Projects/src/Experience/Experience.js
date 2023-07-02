import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import World from './World/World.js'
import Renderer from './Renderer'

let instance = null;

export default class Experience {
  constructor(canvas) {
    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;

    // Global access
    window.experience = this;
    // Options
    this.canvas = canvas;

    // Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer()
    this.world = new World()

    // console.log(this.sizes.width)
    // console.log(this.sizes.height)
    // console.log(this.sizes.pixelRatio)

    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      this.update();
    });
  }
  resize() {
    this.camera.resize();
    this.renderer.resize()
  }
  update()
  {
      this.camera.update()
      this.renderer.update()
  }
}
