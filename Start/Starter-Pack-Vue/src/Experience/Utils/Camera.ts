import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Sizes from "./Sizes";
import Experience from "../Experience";

export default class Camera {
  public experience: Experience;
  public canvas: HTMLCanvasElement | undefined;
  public sizes: Sizes | undefined;
  public scene: THREE.Scene;
  public instance: THREE.PerspectiveCamera;
  public controls: OrbitControls;
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.setInstance();
    this.setControls();
  }
  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes?.width! / this.sizes?.height!
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }
  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }
  resize() {
    this.instance.aspect = this.sizes?.width! / this.sizes?.height!;
    this.instance.updateProjectionMatrix();
  }
  update() {
    this.controls.update();
  }
  dispose() {
    this.controls.dispose();
  }
}
