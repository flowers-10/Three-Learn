import * as THREE from "three";
import Experience from "../Experience";
import Fox from "./Fox";

export default class World {
  public experience: Experience;
  public sence: THREE.Scene;
  public resources;
  public fox!: Fox;
  constructor() {
    this.experience = new Experience();
    this.sence = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources!.on("ready", () => {
      // Setup
      this.fox = new Fox();
    });
  }
  update() {
    if (this.fox) this.fox.update();
  }
}
