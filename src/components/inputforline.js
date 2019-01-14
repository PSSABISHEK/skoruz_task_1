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

class InputForLine extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      xaxis: "",
      yaxis: "",
      height: "",
      width: ""
    };
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submiteval() {
    this.props.handler(
      this.state.xaxis,
      this.state.yaxis,
      this.state.height,
      this.state.width
    );
  }
  render() {
    return (
      <div>
        <Grid>
          <form autoComplete="off">
            <FormGroup controlId="formBasicText">
              <Col xs={12} md={2}>
                <ControlLabel>X-Axis</ControlLabel>
              </Col>
              <Col xs={4} md={10}>
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

const mapStateToProps = state => {
  return state;
};
const Searchcom = connect(mapStateToProps)(InputForLine);

export default Searchcom;
