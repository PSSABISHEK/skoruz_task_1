import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import LCscreen from "../LineChart/LineChartScreen";
import BCscreen from "../BarChart/BarChartScreen";

class ChartsType extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 1
    };
  }

  handleclick = key => {
    this.setState({ key });
  };

  render() {
    return (
      <div>
        <Tabs
          bsStyle="tabs"
          activeKey={this.state.key}
          id="controlled-tab-example"
          onSelect={this.handleclick.bind(this)}
        >
          <Tab eventKey={1} title="Line Graph">
            <LCscreen />
          </Tab>
          <Tab eventKey={2} title="Bar Graph">
            <BCscreen />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default ChartsType;
