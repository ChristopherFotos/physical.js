class Vector {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  getX() {
    return this._x;
  }

  setX(value) {
    this._x = value;
  }

  getY() {
    return this._y;
  }

  setY(value) {
    this._y = value;
  }

  setAngle(angle) {
    var length = this.getLength();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  }

  getAngle() {
    return Math.atan2(this._y, this._x);
  }

  setLength(length) {
    var angle = this.getAngle();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  }

  getLength() {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  }

  add(v2) {
    return vector.create(this._x + v2.getX(), this._y + v2.getY());
  }

  subtract(v2) {
    return new Vector(this._x - v2.getX(), this._y - v2.getY());
  }

  multiply(val) {
    return vector.create(this._x * val, this._y * val);
  }

  divide(val) {
    return vector.create(this._x / val, this._y / val);
  }

  addTo(v2) {
    this._x += v2._x;
    this._y += v2._y;
  }

  multiplyBy(value) {
    this._x *= value;
    this._y *= value;
  }
}
