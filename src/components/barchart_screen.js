import React, { Component } from "react";
import InputForBar from './inputforbar'
import Barchart from "./barchart";

class BC_screen extends Component {
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
        <InputForBar handlerb={this.form_submit.bind(this)}/>
        {/* <Inputdata handlerb={this.form_submit.bind(this)}/> */}
        <Barchart {...this.state}/>
      </div>
    );
  }
}

export default BC_screen;
