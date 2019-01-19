import React, { Component } from "react";
import InputForLine from "../Input/InputForLine";
import Linechart from "./LineChart";

class LineChartScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      xaxis: "",
      yaxis: "",
      height: 0,
      width: 0
    };
  }
  form_submit(xaxis, yaxis, height, width) {
    this.setState({
      xaxis: xaxis,
      yaxis: yaxis,
      height: height,
      width: width
    });
  }

  render() {
    return (
      <div>
        <InputForLine handler={this.form_submit.bind(this)} />
        <Linechart {...this.state} /> {/* passing all the state to child */}
      </div>
    );
  }
}
export default LineChartScreen;
