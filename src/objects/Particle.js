import { colors } from "../utils/Color";
import { createVector } from "../utils/Vector";

export class Particle {
  constructor(
    canvas = null,
    x = 100,
    y = 100,
    radius = 10,
    color = colors[0],
    weight = 10
  ) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.weight = weight;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, this.force);

    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
  }
  get mass() {
    return this.weight / 9.8;
  }
  get force() {
    return 9.8;
  }
  update2 = (dt) => {};
  applyForces = () => {
    const grav = createVector(0, 9.81);
    const drag = 0.1;
    const dragForce = 0.5 * drag * this.speed ** 2;
    const dragAcc = dragForce / this.mass;
    return;
  };
  update = (delta) => {
    const dt = delta / 1000;
    this.velocity.y += this.acceleration.y * dt;
    this.y += this.velocity.y;

    if (this.y >= this.canvas.windowHeight - this.radius / 2) {
      this.y = this.canvas.windowHeight - this.radius / 2;
      this.velocity.y = -this.velocity.y * 0.8;
    }
    if (this.y <= this.radius / 2) {
      this.y = this.radius / 2;
      this.velocity.y = -this.velocity.y * 0.8;
    }

    this.velocity.x += this.acceleration.x * dt;
    this.x += this.velocity.x;
    this.velocity.x -= this.velocity.x * 0.002;

    if (this.x >= this.canvas.windowWidth - this.radius / 2) {
      this.x = this.canvas.windowWidth - this.radius / 2;
      this.velocity.x = -this.velocity.x * 0.6;
    }
    if (this.x <= this.radius / 2) {
      this.x = this.radius / 2;
      this.velocity.x = -this.velocity.x * 0.6;
    }
  };
  draw = () => {
    this.canvas.fill(this.color);
    this.canvas.noStroke();
    this.canvas.circle(this.x, this.y, this.radius);
  };
  get speed() {
    let deltaX = Math.pow(this.velocity.x, 2);
    let deltaY = Math.pow(this.velocity.y, 2);
    return Math.sqrt(deltaX + deltaY);
  }
  collisionAt = (x, y, r, distance) => {
    const dx = x - this.x;
    const dy = y - this.y;
    const angle = Math.atan2(dy, dx);

    this.velocity.x = Math.cos(angle) * this.speed;
    this.velocity.y = Math.sin(angle) * this.speed;

    this.velocity.x *= -0.6;
    this.velocity.y *= -0.6;
    // const d = this.distanceTo(x, y, r);
    this.x -= Math.cos(angle) * (distance + 0);
    this.y -= Math.sin(angle) * (distance + 0);
  };
  distanceTo = (x, y, r) => {
    let deltaX = Math.pow(x - this.x, 2);
    let deltaY = Math.pow(y - this.y, 2);
    const d = Math.sqrt(deltaX + deltaY);
    return d;
  };
}
