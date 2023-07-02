import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time.js";

export default class Experience {
  constructor(canvas) {
    // Global access
    window.experience = this;
    // Options
    this.canvas = canvas;

    // Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene()
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
  resize() {}
  update() {}
}
