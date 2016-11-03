import * as React from "react";

export interface LineProps { x1: number, y1: number, x2: number, y2: number }

export class Line extends React.Component<LineProps, {}> {
  render() {
    return (
      <line x1={this.props.x1} y1={this.props.y1}
            x2={this.props.x2} y2={this.props.y2}
        stroke="lightgray" />
    );
  }
}
