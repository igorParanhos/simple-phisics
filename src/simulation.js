import { Aim } from "./objects/Aim";
import { Particle } from "./objects/Particle";
import { colors } from "./utils/Color";

let shapes, aim, boundX, boundY;

export function getRandomColor() {
  const i = parseInt(Math.random() * colors.length, 10);
  return colors[i];
}

export function setup(instance) {
  return () => {
    // instance.frameRate(240);
    instance.createCanvas(instance.windowWidth, instance.windowHeight);
    boundX = instance.windowWidth;
    boundY = instance.windowHeight;
    aim = new Aim(instance);
    shapes = [
      new Particle(instance, 100, 100, 80, getRandomColor(), 40),
      new Particle(instance, 200, 100, 10, getRandomColor(), 40)
    ];
  };
}

export function draw(instance) {
  return () => {
    instance.clear();
    instance.background(55);
    aim.draw();
    shapes.forEach((shape) => {
      shape.draw();
      shape.update(instance.deltaTime);
    });
    shapes.forEach((shape) => {
      shapes.forEach((shape2) => {
        if (shape2 === shape) return;

        let deltaX = Math.pow(shape2.x - shape.x, 2);
        let deltaY = Math.pow(shape2.y - shape.y, 2);
        const d = Math.sqrt(deltaX + deltaY);
        const minD = (shape.radius + shape2.radius) / 2;

        if (d <= minD) {
          shape.collisionAt(
            shape2.x,
            shape2.y,
            shape2.radius,
            (minD - d + 0.1) / 2
          );
          shape2.collisionAt(
            shape.x,
            shape.y,
            shape.radius,
            (minD - d + 0.1) / 2
          );
        }
      });
    });
  };
}

export function mousePressed(instance) {
  return () => {
    aim.setOrigin(instance.mouseX, instance.mouseY);
    aim.visible = true;
  };
}

export function mouseDragged(instance) {
  return () => {
    aim.setEnd(instance.mouseX, instance.mouseY);
  };
}

export function mouseReleased(instance) {
  return () => {
    aim.visible = false;
    if (!aim.origin || !aim.end) return;
    const radius = 100 + Math.random() * 40;
    const p = new Particle(
      instance,
      aim.origin.x,
      aim.origin.y,
      radius,
      getRandomColor(),
      radius ** 3
    );
    const acc = 40;
    const strength = aim.length / 400;
    const vX = -(Math.cos(aim.angle) * strength) * acc;
    const vY = -(Math.sin(aim.angle) * strength) * acc;
    p.velocity.x = vX;
    p.velocity.y = vY;

    shapes.unshift(p);
    aim.reset();
  };
}

export function windowResized(instance) {
  return () => {
    boundX = instance.windowWidth;
    boundY = instance.windowHeight;
    instance.resizeCanvas(instance.windowWidth, instance.windowHeight);
  };
}
