import * as React from "react";
import { Vertex } from './Vertex'
import { Line } from './Line'

import { VertexData } from '../model/VertexData'

export interface WorldProps { width: number, height: number, n: number }
export interface WorldState { vertice: VertexData[], edges: number[][] }

export class World extends React.Component<WorldProps, WorldState> {
  constructor(props: Object) {
    super(props);

    let vs: VertexData[] = [];
    for (let i = 0 ; i < this.props.n ; i++) {
      vs.push(VertexData.generate(this));
    }
    this.state = { vertice: vs, edges: [] };

    this.move = this.move.bind(this);
    setInterval(this.move, 20);

    this.connect = this.connect.bind(this);
    setInterval(this.connect, 200);
  }

  move() {
    this.setState({ vertice: this.state.vertice.map(v => v.move(this)) } as WorldState);
  }

  connect() {
    const threshold = this.props.width * this.props.height / 20;
    let e: number[][] = [];
    const n = this.state.vertice.length;
    for (let i = 0 ; i < n ; i++) {
      const v1 = this.state.vertice[i];
      for (let j = i+1 ; j < n ; j++) {
        const v2 = this.state.vertice[j];
        const dx = (v1.x-v2.x)|0;
        const dy = (v1.y-v2.y)|0;
        const d = Math.pow(dx, 2) + Math.pow(dy, 2);
        if (d < threshold) {
          e.push([i, j]);
        }
      }
    }
    this.setState({ edges: e } as WorldState)
  }

  render() {
    const v = this.state.vertice.map(v => <Vertex x={v.x} y={v.y} r={3} />)
    const n = this.state.vertice.length;

    let edges: JSX.Element[] = [];
    for (let ei = 0 ; ei < this.state.edges.length ; ei++) {
      const i = this.state.edges[ei][0];
      const j = this.state.edges[ei][1];
      const v1 = this.state.vertice[i];
      const v2 = this.state.vertice[j];
      edges.push(<Line x1={v1.x} y1={v1.y} x2={v2.x} y2={v2.y} />)
    }

    return (
      <div>
        <h1>Hello</h1>
        <svg width={this.props.width} height={this.props.height}>
          {edges}
          {v}
        </svg>
      </div>
    );
  }
}
