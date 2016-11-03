import * as React from "react";
import { Vertex } from './Vertex'
import { Line } from './Line'

import { VertexData } from '../model/VertexData'

export interface WorldState { vertices: VertexData[] }

export class World extends React.Component<{}, WorldState> {
  constructor(props: Object) {
    super(props);

    let vs: VertexData[] = [];
    for (let i = 0 ; i < 30 ; i++) {
      vs.push(VertexData.generate());
    }
    this.state = { vertices: vs };

    this.move = this.move.bind(this);
    setInterval(this.move, 20);
  }

  move() {
    this.setState({ vertices: this.state.vertices.map(v => v.move()) });
  }

  render() {
    const v = this.state.vertices.map(v => <Vertex x={v.x} y={v.y} r={3} />)
    const n = this.state.vertices.length;

    let e: JSX.Element[] = [];
    for (let i = 0 ; i < n ; i++) {
      const v1 = this.state.vertices[i];
      for (let j = i+1 ; j < n ; j++) {
        const v2 = this.state.vertices[j];
        const d = Math.pow(v1.x-v2.x, 2) + Math.pow(v1.y-v2.y, 2);
        if (d < 10000) {
          e.push(<Line x1={v1.x} y1={v1.y} x2={v2.x} y2={v2.y} />)
        }
      }
    }

    return (
      <div>
        <h1>Hello</h1>
        <svg width="300" height="300">
          {e}
          {v}
        </svg>
      </div>
    );
  }
}
