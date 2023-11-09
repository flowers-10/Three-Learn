import * as THREE from "three";
import Experience from "../Experience.js";

export default class Fox {
  public experience;
  public scene;
  public resources;
  public resource;
  public model: any;
  public time: any;
  public animation: any;
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Setup
    this.resource = this.resources!.items.foxModel;

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(0.02, 0.02, 0.02);
    this.time = this.experience.time;

    this.scene.add(this.model);

    this.model.traverse((child: any) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  setAnimation() {
    this.animation = {};

    this.animation.mixer = new THREE.AnimationMixer(this.model);

    this.animation.actions = {};

    this.animation.actions.idle = this.animation.mixer.clipAction(
      this.resource.animations[0]
    );
    this.animation.actions.walking = this.animation.mixer.clipAction(
      this.resource.animations[1]
    );
    this.animation.actions.running = this.animation.mixer.clipAction(
      this.resource.animations[2]
    );

    this.animation.actions.current = this.animation.actions.idle;
    this.animation.actions.current.play();

    this.animation.play = (name:string) => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;

      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(oldAction, 1);

      this.animation.actions.current = newAction;
    };
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
