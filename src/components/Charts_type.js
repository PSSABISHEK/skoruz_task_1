import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import LC_screen from "./linechart_screen";
import BC_screen from "./barchart_screen";

class Charts_type extends Component {
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
            <LC_screen />
          </Tab>
          <Tab eventKey={2} title="Bar Graph">
            <BC_screen />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Charts_type;
