import { World } from '../components/World'

export interface VertexData { x: number, y: number, r: number, vx: number, vy: number }

export class VertexData {
  constructor(x: number, y: number, r: number, vx: number, vy: number) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
  }

  static generate(world: World) {
    const size = 2 + Math.random() * 4;
    const R = size / 3;
    const theta = Math.random() * Math.PI * 2;

    return new VertexData(
      (world.props.width * Math.random() | 0),
      (world.props.height * Math.random() | 0),
      size,
      R * Math.cos(theta),
      R * Math.sin(theta)
    )
  }

  move(world: World) {
    const padding = 2;
    const toX = this.x + this.vx;
    const toY = this.y + this.vy;
    const toVX = (toX - padding < 0 || toX + padding >= world.props.width)  ? -this.vx : this.vx;
    const toVY = (toY - padding < 0 || toY + padding >= world.props.height) ? -this.vy : this.vy;

    return new VertexData(toX, toY, this.r, toVX, toVY);
  }
}
