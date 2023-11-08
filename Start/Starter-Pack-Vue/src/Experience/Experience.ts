import * as THREE from "three";

import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Utils/Camera";
import Renderer from "./Utils/Renderer";
import World from "./World/World";

let instance: Experience | null = null;

export default class Experience {
  public canvas: HTMLCanvasElement | undefined;
  public sizes: Sizes | undefined;
  public time: Time | undefined;
  public scene: THREE.Scene;
  public camera: Camera | undefined;
  public renderer: Renderer | undefined;
  public world: World | undefined;

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
    this.renderer = new Renderer();
    this.world = new World();

    this.sizes.on("resize", () => {
      this.resize();
    });
    this.time.on("tick", () => {
      this.update();
    });
  }
  resize() {
    this.camera?.resize();
    this.renderer?.resize();
  }
  update() {
    this.camera?.update();
    this.renderer?.update();
  }

  dispose() {
    this.sizes?.off("resize");
    this.time?.off("tick");
    /* 销毁场景里的几何体 材质等 */
    this.scene.traverse((child: any) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          for (const key of child.material) {
            const value = child.material[key];
            console.log(value);

            if (
              value &&
              value.hasOwnProperty("dispose") &&
              typeof value.dispose === "function"
            ) {
              value.dispose();
            }
          }
        }
      }
    });
    this.scene.clear();
    if (this.renderer) {
      this.renderer.dispose();
    }
    /* 销毁轨道控制器 */
    if (this.camera) {
      this.camera.dispose();
    }
    instance = null;
  }
}
