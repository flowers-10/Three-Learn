import EventEmitter from "@/Experience/Utils/EventEmitter";

export default class Time extends EventEmitter {
  public start;
  public current;
  public elapsed;
  public delta;

  constructor() {
    super();
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;
    this.tick();
  }

  tick() {
    
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = currentTime - this.start;

    this.trigger("tick", null);
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
