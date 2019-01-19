import React, { Component } from "react";
import InputForBar from "./InputForBar";
import BarChart from "./BarChart";

class BarChartScreen extends Component {
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
        <InputForBar handlerb={this.form_submit.bind(this)} />
        <BarChart {...this.state} />
      </div>
    );
  }
}

export default BarChartScreen;
