import * as React from "react";
import { Card } from "@blueprintjs/core";

export interface IntroProps {
  header: string;
}

export class Intro extends React.PureComponent<IntroProps> {
  public render() {
    return (
      <Card className="example-card">
        <div className="example-header">{this.props.header}</div>
        {this.props.children}
      </Card>
    );
  }
}
