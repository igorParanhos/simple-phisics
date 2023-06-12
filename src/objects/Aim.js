import { createVector } from "../utils/Vector";

export class Aim {
  constructor(canvas = null, origin, end) {
    this.canvas = canvas;
    this.origin = origin;
    this.end = end;
    this.visible = false;
  }
  setOrigin = (x, y) => {
    if (!this.origin) this.origin = createVector(0, 0);
    this.origin.x = x;
    this.origin.y = y;
  };
  setEnd = (x, y) => {
    if (!this.end) this.end = createVector(0, 0);
    this.end.x = x;
    this.end.y = y;
  };
  get deltaX() {
    return this.end.x - this.origin.x;
  }
  get deltaY() {
    return this.end.y - this.origin.y;
  }
  get length() {
    let deltaX = Math.pow(this.deltaX, 2);
    let deltaY = Math.pow(this.deltaY, 2);
    return Math.sqrt(deltaX + deltaY);
  }
  get angle() {
    return Math.atan2(this.deltaY, this.deltaX);
  }
  reset = () => {
    this.origin = null;
    this.end = null;
  };
  draw = () => {
    if (!this.visible || !this.origin || !this.end) return;
    this.canvas.stroke(this.canvas.color("#fff"));
    this.canvas.line(this.origin.x, this.origin.y, this.end.x, this.end.y);
    this.canvas.fill("#11223300");
    const length = this.length / 3;
    const circleRadius = 20 + (length >= 10 ? length - 10 : 0);
    this.canvas.circle(this.origin.x, this.origin.y, circleRadius);
  };
}
