export class Vector {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  times(n) {
    if (n instanceof Vector) {
      this.x *= n.x;
      this.y *= n.y;
      this.z *= n.z;
    } else {
      this.x *= n;
      this.y *= n;
      this.z *= n;
    }
    return this;
  }
  minus(n) {
    if (n instanceof Vector) {
      this.x -= n.x;
      this.y -= n.y;
      this.z -= n.z;
    } else {
      this.x -= n;
      this.y -= n;
      this.z -= n;
    }
    return this;
  }
}

export const createVector = (x, y, z) => {
  return new Vector(x, y, z);
};
