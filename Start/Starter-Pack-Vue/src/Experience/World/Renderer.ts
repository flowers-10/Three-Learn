import * as THREE from "three";
import Experience from "../Experience";
import Sizes from "../Utils/Sizes";
import Time from "../Utils/Time";
import Camera from "./Camera";

export default class Renderer {
  public experience: Experience;
  public canvas: HTMLCanvasElement | undefined;
  public sizes: Sizes | undefined;
  public time: Time | undefined;
  public scene: THREE.Scene;
  public camera: Camera | undefined;
  public instance!: THREE.WebGLRenderer;
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.useLegacyLights = true;
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#211d20");
    this.instance.setSize(this.sizes!.width, this.sizes!.height);
    this.instance.setPixelRatio(Math.min(this.sizes!.pixelRatio!, 2));
  }

  resize() {
    this.instance.setSize(this.sizes!.width, this.sizes!.height);
    this.instance.setPixelRatio(Math.min(this.sizes!.pixelRatio!, 2));
  }

  update() {
    this.instance.render(this.scene, this.camera!.instance);
  }

  info(message: string = "当前内存：") {
    console.log(message, this.instance.info.memory);
  }

  dispose() {
    this.instance.clear();
    this.instance.setSize(0, 0);
    this.instance.dispose();
    this.info("清空内存后：");
  }
}
