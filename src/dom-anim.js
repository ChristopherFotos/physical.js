
function moveElement() {
  velocity += accel;
  pos += velocity;

  div.style.top = pos + "px";
  div.style.left = pos + "px";

  let stopID = requestAnimationFrame(moveElement);
  if (
    div.style.left > window.innerWidth ||
    div.style.top > window.innerHeight
  ) {
    cancelAnimationFrame(stopID);
  }
}



class DOMscene {
  constructor() {
    this.props = [];
  }

  addProp(prop) {
    this.props.push(prop);
  }

  update() {
    this.props.forEach(prop => {
      prop.update();
    });
  }
}

class Mover {
  constructor(element, scene) {
    this.element = document.getElementById(element);
    this.scene = scene;

    this.left = this.element.style.left;
    this.top = this.element.style.top;

    this.accel = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.friction = 0;

    this.customFunctions = [];

    this.initToScene();
  }

  initToScene() {
    this.scene.props.push(this);
  }

  setDirection(direction) {
    this.velocity.setAngle(direction);
    this.accel.setAngle(direction);
  }

  getDirection() {
    return this.velocity.getAngle();
  }

  setAccel(accel) {
    this.accel.setLength(accel);
  }

  getAccel() {
    return this.accel.getLength;
  }

  setTop(val) {
    this.element.style.top = val + "px";
  }

  setLeft(val) {
    this.element.style.left = val + "px";
  }

  addCustomFunction(customFunction) {
    this.customFunctions.push(customFunction);
  }

  checkIfChanged(){
    /* This function will check whether the element has moved enough since the last frame to justify re-rendering. */

  }

  update() {
    if (this.customFunctions.length > 0) { this.customFunctions.forEach(f => { f.bind(this)() }) }

    this.velocity.addTo(this.accel);
    this.velocity.multiplyBy(this.friction);

    console.log(".element", this.element.style.left, this.element.style.top);
    console.log("this", this.left, this.top, "end");

    let newLeft = this.left + this.velocity._x;
    let newTop = this.top + this.velocity._y;

    this.setLeft(newLeft);
    this.setTop(newTop);
  }
}

const scene = new DOMscene();
const mover = new Mover("div1", scene);
mover.addCustomFunction(function arc() { this.setDirection(this.getDirection() + 0.005); })


mover.setAccel(30);
mover.setDirection(1);
mover.friction = 0.8;

startScene(scene);

// Elements updating while not actually moving is going to be a huge performance leak. 
// Perhaps we can wrap the update function in a conditional that checks if there's any 
// noticable change before updating the element. 
