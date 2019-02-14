import React, { Component } from "react";
import {
  Grid,
  Col,
  Row,
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

const theme = [
  { value: "seq", label: "Sequential" },
  { value: "multi", label: "Multicolored" }
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
      titlefColor: "Black",
      titlefSize: 10,
      labelfSize: 10,
      labelfColor: "Black",
      selectedOption: { value: "pie", label: "Pie Graph" },
      selectedTheme: { value: "seq", label: "Sequential" },
      data: []
    };
  }

  handleChangeSelect = selectedOption => {
    this.setState({
      selectedOption
    });
  };

  handleChangeTheme = selectedTheme => {
    this.setState({
      selectedTheme
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
    } else if (this.state.labelfSize > 20 || this.state.titlefSize > 20) {
      alert("Font size should be less than 20");
    } else {
      this.props.handlerb(
        this.state.chartname,
        this.state.xaxis,
        this.state.yaxis,
        this.state.titlefSize,
        this.state.titlefColor,
        this.state.labelfSize,
        this.state.labelfColor,
        this.state.height,
        this.state.width,
        this.state.data,
        this.state.selectedOption,
        this.state.selectedTheme
      );
    }
  }
  render() {
    return (
      <div>
        <Grid>
          <form autoComplete="off">
            <FormGroup controlId="formBasicText">
              <Row>
                <Col xs={12} md={2} lg={2}>
                  <ControlLabel>Chart Type</ControlLabel>
                </Col>
                <Col xs={8} md={10} lg={3}>
                  <Select
                    value={this.state.selectedOption}
                    onChange={this.handleChangeSelect}
                    options={options}
                  />
                </Col>
                <Col xs={12} md={2} lg={2}>
                  <ControlLabel>Chart Color</ControlLabel>
                </Col>
                <Col xs={8} md={10} lg={5}>
                  <Select
                    value={this.state.selectedTheme}
                    onChange={this.handleChangeTheme}
                    options={theme}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={2} lg={2}>
                  <ControlLabel style={xaxisStyle}>Title Name</ControlLabel>
                </Col>
                <Col xs={8} md={10} lg={2}>
                  <FormControl
                    type="text"
                    name="chartname"
                    value={this.props.chartname}
                    placeholder="Enter text"
                    onChange={this.handleChange.bind(this)}
                    style={xaxisStyle}
                  />
                </Col>
                <Col xs={12} md={2} lg={1}>
                  <ControlLabel style={xaxisStyle}>Title Size</ControlLabel>
                </Col>
                <Col xs={8} md={10} lg={2}>
                  <FormControl
                    type="text"
                    name="titlefSize"
                    value={this.props.titlefSize}
                    placeholder="Enter Number"
                    onChange={this.handleChange.bind(this)}
                    style={xaxisStyle}
                  />
                </Col>
                <Col xs={12} md={2} lg={2}>
                  <ControlLabel style={xaxisStyle}>Title Color</ControlLabel>
                </Col>
                <Col xs={8} md={10} lg={3}>
                  <FormControl
                    type="text"
                    name="titlefColor"
                    value={this.props.titlefColor}
                    placeholder="Enter text"
                    onChange={this.handleChange.bind(this)}
                    style={xaxisStyle}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={2} lg={2}>
                  <ControlLabel>Label Size</ControlLabel>
                </Col>
                <Col xs={8} md={10} lg={4}>
                  <FormControl
                    type="text"
                    name="labelfSize"
                    value={this.props.labelfSize}
                    placeholder="Enter Number"
                    onChange={this.handleChange.bind(this)}
                    style={divstyle}
                  />
                </Col>
                <Col xs={12} md={2} lg={2}>
                  <ControlLabel>Label Color</ControlLabel>
                </Col>
                <Col xs={8} md={10} lg={4}>
                  <FormControl
                    type="text"
                    name="labelfColor"
                    value={this.props.labelfColor}
                    placeholder="Enter text"
                    onChange={this.handleChange.bind(this)}
                    style={divstyle}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={2}>
                  <ControlLabel style={divstyle}>X-Axis</ControlLabel>
                </Col>
                <Col xs={8} md={4}>
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
                <Col xs={8} md={4}>
                  <FormControl
                    type="text"
                    name="yaxis"
                    value={this.props.yaxis}
                    placeholder="Enter text"
                    onChange={this.handleChange.bind(this)}
                    style={divstyle}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={2}>
                  <ControlLabel>Height</ControlLabel>
                </Col>
                <Col xs={8} md={4}>
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
                <Col xs={8} md={4}>
                  <FormControl
                    type="text"
                    name="width"
                    value={this.props.width}
                    placeholder="Enter Number"
                    onChange={this.handleChange.bind(this)}
                    style={divstyle}
                  />
                </Col>
              </Row>
              {/* <Col xs={12} md={2}>
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
              </Col> */}
            </FormGroup>
            <Row>
              <Col xs={8} md={10}>
                <Button onClick={this.submiteval.bind(this)}>Submit</Button>
              </Col>
            </Row>
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
