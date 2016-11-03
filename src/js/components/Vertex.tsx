import * as React from "react";

export interface VertexProps { x: number, y: number, r: number }

export class Vertex extends React.Component<VertexProps, {}> {
  render() {
    return (
      <circle cx={this.props.x} cy={this.props.y} r={this.props.r}
        stroke="gray" fill="white" />
    );
  }
}
