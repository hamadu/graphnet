export interface VertexData { x: number, y: number, vx: number, vy: number }

export class VertexData {
  constructor(x: number, y: number, vx: number, vy: number) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  static generate() {
    return new VertexData(
      (300 * Math.random() | 0),
      (300 * Math.random() | 0),
      4 * Math.random() - 2,
      4 * Math.random() - 2,
    )
  }

  move() {
    const toX = this.x + this.vx;
    const toY = this.y + this.vy;
    const toVX = (toX < 0 || toX >= 300) ? -this.vx : this.vx;
    const toVY = (toY < 0 || toY >= 300) ? -this.vy : this.vy;

    return new VertexData(toX, toY, toVX, toVY);
  }
}
