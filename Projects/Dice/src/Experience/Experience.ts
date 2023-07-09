export default class Experience {
  public canvas: HTMLCanvasElement
  constructor(canvas:HTMLCanvasElement) {
    // Global access
    window.experience = this;

    // 选项
    this.canvas = canvas
  }
}
