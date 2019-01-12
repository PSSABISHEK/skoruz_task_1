import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

class Inputdata extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      xaxis: "",
      yaxis: ""
    };
  }
  handleChangex(e) {
    this.setState({
        xaxis: e.target.value
    });
  }
  handleChangey(e) {
    this.setState({
        yaxis: e.target.value
    });
  }

  render() {
    return (
      <div>
        <Grid>
          <form>
            <FormGroup controlId="formBasicText">
              <Col xs={12} md={2}>
                <ControlLabel>X-Axis</ControlLabel>
              </Col>
              <Col xs={4} md={10}>
                <FormControl
                  type="text"
                  value={this.state.xaxis}
                  placeholder="Enter text"
                  onChange={this.handleChangex.bind(this)}
                  style={divstyle}
                />
              </Col>
              <Col xs={12} md={2}>
                <ControlLabel>Y-Axis</ControlLabel>
              </Col>
              <Col xs={4} md={10}>
                <FormControl
                  type="text"
                  value={this.state.yaxis}
                  placeholder="Enter text"
                  onChange={this.handleChangey.bind(this)}
                />
              </Col>
              <FormControl.Feedback />
            </FormGroup>
          </form>
        </Grid>
      </div>
    );
  }
}

const divstyle = {
    marginBottom: '10px'
}
export default Inputdata;
