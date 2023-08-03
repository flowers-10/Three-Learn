import * as THREE from "three";

import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Utils/Camera";
import Renderer from "./Renderer";

let instance: Experience | null = null;

export default class Experience {
  public canvas: HTMLCanvasElement | undefined;
  public sizes: Sizes | undefined;
  public time: Time | undefined;
  public scene: THREE.Scene;
  public camera: Camera | undefined;
  public renderer: Renderer | undefined
  constructor(canvas?: HTMLCanvasElement) {
    //  Singleton
    if (instance) {
      return instance;
    }
    instance = this;
    // Global access
    window.experience = this;

    // 选项
    this.canvas = canvas;

    // 初始化
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer()

    this.sizes.on("resize", () => {
      this.resize();
    });
    this.time.on("tick", () => {
      this.update();
    });
  }
  resize() {
    this.camera?.resize()
    this.renderer?.resize()
  }
  update() {
    this.camera?.update()
    this.renderer?.update()
  }
}
