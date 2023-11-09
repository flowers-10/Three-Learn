import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import EventEmitter from "./EventEmitter.js";

type Loaders = {
  gltfLoader: null | GLTFLoader;
  textureLoader: null | THREE.TextureLoader;
  cubeTextureLoader: null | THREE.CubeTextureLoader;
};

export default class Resources extends EventEmitter {
  public sources: any;
  public items: any;
  public toLoad: number;
  public loaded: number;
  public loaders: Loaders | undefined;
  constructor(sources: any) {
    super();

    // Options
    this.sources = sources;

    // Setup
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {
      gltfLoader: null,
      textureLoader: null,
      cubeTextureLoader: null,
    };
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders!.gltfLoader?.load(source.path, (file: any) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders!.textureLoader?.load(source.path, (file: any) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders!.cubeTextureLoader?.load(source.path, (file: any) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source: any, file: any) {
    this.items[source.name] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger("ready", null);
    }
  }
}
