import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";

export default class Experience {
  public canvas: HTMLCanvasElement
  public sizes: unknown
  public time:unknown
  constructor(canvas:HTMLCanvasElement) {
    // Global access
    window.experience = this;

    // 选项
    this.canvas = canvas

    // 初始化
    this.sizes = new Sizes()
    this.time = new Time()
  }
}
