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

    this.tick = this.tick.bind(this);
    this.move = this.move.bind(this);
    this.connect = this.connect.bind(this);
  }

  componentDidMount() {
    setTimeout(this.tick, 100);
  }

  tick() {
    this.move();
    this.connect();
    window.requestAnimationFrame(this.tick);
  }

  move() {
    this.setState({ vertice: this.state.vertice.map(v => v.move(this)) } as WorldState);
  }

  connect() {
    let bucket: number[][][];

    bucket = [
      [[], [], [], []],
      [[], [], [], []],
      [[], [], [], []],
      [[], [], [], []]
    ];

    for (let i = 0 ; i < this.props.n ; i++) {
      const v1 = this.state.vertice[i];
      const xpart = Math.max(0, Math.min(3, Math.floor(v1.x * 4 / this.props.width)));
      const ypart = Math.max(0, Math.min(3, Math.floor(v1.y * 4 / this.props.height)));
      bucket[xpart][ypart].push(i);
    }

    const threshold = this.props.width * this.props.height / 20;

    let e: number[][] = [];
    for (let xi = 0 ; xi <= 3 ; xi++) {
      for (let yi = 0 ; yi <= 3 ; yi++) {
        const set0 = bucket[xi][yi];
        const n = set0.length;
        for (let i = 0 ; i < n ; i++) {
          const v1 = this.state.vertice[set0[i]];
          for (let j = i+1 ; j < n ; j++) {
            const v2 = this.state.vertice[set0[j]];
            const dx = (v1.x-v2.x)|0;
            const dy = (v1.y-v2.y)|0;
            const d = Math.pow(dx, 2) + Math.pow(dy, 2);
            if (d < threshold) {
              e.push([set0[i], set0[j]]);
            }
          }
        }

        if (xi + 1 < bucket.length) {
          const set1 = bucket[xi+1][yi];
          const m = set1.length;
          for (let i = 0 ; i < n ; i++) {
            const v1 = this.state.vertice[set0[i]];
            for (let j = 0 ; j < m ; j++) {
              const v2 = this.state.vertice[set1[j]];
              const dx = (v1.x-v2.x)|0;
              const dy = (v1.y-v2.y)|0;
              const d = Math.pow(dx, 2) + Math.pow(dy, 2);
              if (d < threshold) {
                e.push([set0[i], set1[j]]);
              }
            }
          }
        }

        if (yi + 1 < bucket[0].length) {
          const set1 = bucket[xi][yi+1];
          const m = set1.length;
          for (let i = 0 ; i < n ; i++) {
            const v1 = this.state.vertice[set0[i]];
            for (let j = 0 ; j < m ; j++) {
              const v2 = this.state.vertice[set1[j]];
              const dx = (v1.x-v2.x)|0;
              const dy = (v1.y-v2.y)|0;
              const d = Math.pow(dx, 2) + Math.pow(dy, 2);
              if (d < threshold) {
                e.push([set0[i], set1[j]]);
              }
            }
          }
        }

        if (xi + 1 < bucket.length && yi + 1 < bucket[0].length) {
          const set1 = bucket[xi+1][yi+1];
          const m = set1.length;
          for (let i = 0 ; i < n ; i++) {
            const v1 = this.state.vertice[set0[i]];
            for (let j = 0 ; j < m ; j++) {
              const v2 = this.state.vertice[set1[j]];
              const dx = (v1.x-v2.x)|0;
              const dy = (v1.y-v2.y)|0;
              const d = Math.pow(dx, 2) + Math.pow(dy, 2);
              if (d < threshold) {
                e.push([set0[i], set1[j]]);
              }
            }
          }
        }
      }
    }
    this.setState({ edges: e } as WorldState)
  }

  render() {
    const v = this.state.vertice.map(v => <Vertex x={v.x} y={v.y} r={v.r} />)
    const n = this.state.vertice.length;
    const e = this.state.edges.map(vids => {
      const v1 = this.state.vertice[vids[0]];
      const v2 = this.state.vertice[vids[1]];
      return <Line x1={v1.x} y1={v1.y} x2={v2.x} y2={v2.y} />
    });

    return (
      <div>
        <h1>Hello</h1>
        <svg width={this.props.width} height={this.props.height}>
          {e}
          {v}
        </svg>
      </div>
    );
  }
}
