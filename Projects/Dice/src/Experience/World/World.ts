import * as THREE from "three";
import Experience from "../Experience";

export default class World {
  public experience: Experience;
  public sence: THREE.Scene;
  constructor() {
    this.experience = new Experience();
    this.sence = this.experience.scene;

    // test Mesh
    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        wireframe: true,
      })
    );
    this.sence.add(testMesh)
  }
}
