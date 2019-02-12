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
  { value: "line", label: "Line Chart" },
  { value: "bar", label: "Bar Chart" },
  { value: "scatter", label: "Scatter Chart" },
  { value: "geo", label: "Geo Chart" },
  { value: "pie", label: "Pie Chart" }
];

class InputForBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      chartname: "",
      xaxis: "",
      yaxis: "",
      height: 0,
      width: 0,
      fSize: 10,
      fColor: "Black",
      fType: "",
      chartColor: "Steelblue",
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

  //SENDS STATES TO MAIN COMPONENT
  submiteval() {
    if (
      (this.state.height && !this.state.width) ||
      (this.state.width && !this.state.height) ||
      (!this.state.width && !this.state.height)
    ) {
      alert("Enter both Height and Width");
    } else if (this.state.fSize > 21) {
      alert("Font size should be less than 20");
    } else {
      this.props.handlerb(
        this.state.chartname,
        this.state.xaxis,
        this.state.yaxis,
        this.state.fSize,
        this.state.fColor,
        this.state.fType,
        this.state.chartColor,
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
            <Col xs={8} md={10}>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={options}
              />
            </Col>
            <FormGroup controlId="formBasicText">
              <Col xs={12} md={2} lg={2}>
                <ControlLabel style={xaxisStyle}>Chart Name</ControlLabel>
              </Col>
              <Col xs={8} md={10} lg={4}>
                <FormControl
                  type="text"
                  name="chartname"
                  value={this.props.chartname}
                  placeholder="Enter text"
                  onChange={this.handleChange.bind(this)}
                  style={xaxisStyle}
                />
              </Col>
              <Col xs={12} md={2} lg={2}>
                <ControlLabel style={xaxisStyle}>Chart Color</ControlLabel>
              </Col>
              <Col xs={8} md={10} lg={4}>
                <FormControl
                  type="text"
                  name="chartColor"
                  value={this.props.chartColor}
                  placeholder="Enter text"
                  onChange={this.handleChange.bind(this)}
                  style={xaxisStyle}
                />
              </Col>
              <Col xs={12} md={2} lg={2}>
                <ControlLabel>Font Size</ControlLabel>
              </Col>
              <Col xs={8} md={10} lg={2}>
                <FormControl
                  type="text"
                  name="fSize"
                  value={this.props.fSize}
                  placeholder="Enter number"
                  onChange={this.handleChange.bind(this)}
                  style={divstyle}
                />
              </Col>
              <Col xs={12} md={2} lg={2}>
                <ControlLabel>Font Color</ControlLabel>
              </Col>
              <Col xs={8} md={10} lg={2}>
                <FormControl
                  type="text"
                  name="fColor"
                  value={this.props.fColor}
                  placeholder="Enter text"
                  onChange={this.handleChange.bind(this)}
                  style={divstyle}
                />
              </Col>
              <Col xs={12} md={2} lg={2}>
                <ControlLabel>Font Type</ControlLabel>
              </Col>
              <Col xs={8} md={10} lg={2}>
                <FormControl
                  type="text"
                  name="fType"
                  value={this.props.fType}
                  placeholder="Enter text"
                  onChange={this.handleChange.bind(this)}
                  style={divstyle}
                />
              </Col>
              <Col xs={12} md={2}>
                <ControlLabel style={divstyle}>X-Axis</ControlLabel>
              </Col>
              <Col xs={8} md={10}>
                <FormControl
                  type="text"
                  name="xaxis"
                  value={this.props.xaxis}
                  placeholder="Enter text"
                  onChange={this.handleChange.bind(this)}
                  style={divstyle}
                />
              </Col>
              <Col xs={12} md={2}>
                <ControlLabel>Y-Axis</ControlLabel>
              </Col>
              <Col xs={8} md={10}>
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
              <Col xs={8} md={10}>
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
              <Col xs={8} md={10}>
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
              <Col xs={8} md={10}>
                <FormControl
                  componentClass="textarea"
                  placeholder="Enter JSON data"
                  name="data"
                  value={this.state.data}
                  onChange={this.handleChange.bind(this)}
                  style={divstyle}
                />
              </Col>
              <FormControl.Feedback />
            </FormGroup>
            <Col xs={8} md={10}>
              <Button onClick={this.submiteval.bind(this)}>Submit</Button>
            </Col>
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
