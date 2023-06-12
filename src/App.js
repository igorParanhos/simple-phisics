import "./styles.css";
import P5 from "p5";
import { useEffect, useRef } from "react";
import {
  draw,
  mouseDragged,
  mousePressed,
  mouseReleased,
  setup,
  windowResized
} from "./simulation";

const sketch = (instance) => {
  instance.setup = () => {
    instance.frameRate(60);
    instance.createCanvas(400, 1000);
    instance.background(255, 0, 200);
  };
  instance.setup = setup(instance);
  instance.draw = draw(instance);
  instance.mousePressed = mousePressed(instance);
  instance.mouseDragged = mouseDragged(instance);
  instance.mouseReleased = mouseReleased(instance);
  instance.windowResized = windowResized(instance);
};

export default function App() {
  const containerRef = useRef(null);
  useEffect(() => {
    const instance = new P5(sketch, containerRef.current);
    return () => {
      return instance.remove();
    };
  }, []);

  return (
    <div className="App">
      {/* <h1>Simulation</h1> */}
      <div ref={containerRef}></div>
    </div>
  );
}
