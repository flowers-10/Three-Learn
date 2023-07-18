import Sizes from "./Utils/Sizes";

export default class Experience {
  public canvas: HTMLCanvasElement
  public sizes: any
  constructor(canvas:HTMLCanvasElement) {
    // Global access
    window.experience = this;

    // 选项
    this.canvas = canvas

    // 初始化
    this.sizes = new Sizes()
  }
}
