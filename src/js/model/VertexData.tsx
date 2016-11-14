import { World } from '../components/World'

export interface VertexData { x: number, y: number, vx: number, vy: number }

export class VertexData {
  constructor(x: number, y: number, vx: number, vy: number) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  static generate(world: World) {
    return new VertexData(
      (world.props.width * Math.random() | 0),
      (world.props.height * Math.random() | 0),
      4 * Math.random() - 2,
      4 * Math.random() - 2,
    )
  }

  move(world: World) {
    const toX = this.x + this.vx;
    const toY = this.y + this.vy;
    const toVX = (toX < 0 || toX >= world.props.width)  ? -this.vx : this.vx;
    const toVY = (toY < 0 || toY >= world.props.height) ? -this.vy : this.vy;

    return new VertexData(toX, toY, toVX, toVY);
  }
}
