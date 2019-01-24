import React, { Component } from "react";
import {
  Grid,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";
import { connect } from "react-redux";
import Select from "react-select";

const options = [
  { value: "line", label: "Line Graph" },
  { value: "bar", label: "Bar Graph" }
];

class InputForBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      xaxis: "",
      yaxis: "",
      height: 0,
      width: 0,
      selectedOption: { value: "line", label: "Line Graph" },
      data: []
    };
  }

  handleChangeSelect = selectedOption => {
    this.setState({
      selectedOption
    });
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submiteval() {
    if (
      (this.state.height && !this.state.width) ||
      (this.state.width && !this.state.height)
    ) {
      alert("Enter both Height and Width");
    } else {
      console.log(this.state.data);
      this.props.handlerb(
        this.state.xaxis,
        this.state.yaxis,
        this.state.height,
        this.state.width,
        this.state.data,
        this.state.selectedOption
      );
    }
  }
  render() {
    return (
      <div>
        <Grid>
          <form autoComplete="off">
            <Col xs={12} md={2}>
              <ControlLabel>Chart Type</ControlLabel>
            </Col>
            <Col xs={4} md={10}>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={options}
              />
            </Col>
            <FormGroup controlId="formBasicText">
              <Col xs={12} md={2}>
                <ControlLabel style={xaxisStyle}>X-Axis</ControlLabel>
              </Col>
              <Col xs={4} md={10}>
                <FormControl
                  type="text"
                  name="xaxis"
                  value={this.props.xaxis}
                  placeholder="Enter text"
                  onChange={this.handleChange.bind(this)}
                  style={xaxisStyle}
                />
              </Col>
              <Col xs={12} md={2}>
                <ControlLabel>Y-Axis</ControlLabel>
              </Col>
              <Col xs={4} md={10}>
                <FormControl
                  type="text"
                  name="yaxis"
                  value={this.props.yaxis}
                  placeholder="Enter text"
                  onChange={this.handleChange.bind(this)}
                  style={divstyle}
                />
              </Col>
              <Col xs={12} md={2}>
                <ControlLabel>Height</ControlLabel>
              </Col>
              <Col xs={4} md={10}>
                <FormControl
                  type="text"
                  name="height"
                  value={this.props.height}
                  placeholder="Enter Number"
                  onChange={this.handleChange.bind(this)}
                  style={divstyle}
                />
              </Col>
              <Col xs={12} md={2}>
                <ControlLabel>Width</ControlLabel>
              </Col>
              <Col xs={4} md={10}>
                <FormControl
                  type="text"
                  name="width"
                  value={this.props.width}
                  placeholder="Enter Number"
                  onChange={this.handleChange.bind(this)}
                  style={divstyle}
                />
              </Col>
              <Col xs={12} md={2}>
                <ControlLabel>JSON</ControlLabel>
              </Col>
              <Col xs={4} md={10}>
                <FormControl
                  componentClass="textarea"
                  placeholder="Enter JSON data"
                  name="data"
                  value={this.state.data}
                  onChange={this.handleChange.bind(this)}
                />
              </Col>
              <FormControl.Feedback />
            </FormGroup>
            <Button onClick={this.submiteval.bind(this)}>Submit</Button>
          </form>
        </Grid>
      </div>
    );
  }
}

const divstyle = {
  marginBottom: "10px"
};
const xaxisStyle = {
  marginTop: "10px",
  marginBottom: "10px"
};
const mapStateToProps = state => {
  return state;
};
const Searchcom = connect(mapStateToProps)(InputForBar);

export default Searchcom;
