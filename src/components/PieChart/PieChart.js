import React, { Component } from "react";
import { Col, Grid } from "react-bootstrap";
import { Slider } from "antd";
import * as d3 from "d3";
import "antd/dist/antd.css";

class PieChart extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      iRadius: 100,
      dRadius: "",
      ctr: 0
    };
  }

  onChange = value => {
    this.setState({
      dRadius: value
    });
  };

  componentDidMount() {
    this.drawPieChart();
  }

  drawPieChart() {
    let inputjson = this.props.inputjson;
    let chartColor = inputjson["chartColor"];
    let data = inputjson["values"];
    let xaxis = inputjson["x-axis"];
    let yaxis = inputjson["y-axis"];
    let svgWidth = inputjson["width"];
    let svgHeight = inputjson["height"];
    let fColor = inputjson["fColor"];
    let fSize = inputjson["fSize"];
    let fType = inputjson["fType"];
    let margin = { top: 50, right: 50, bottom: 50, left: 50 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;
    if (this.state.ctr === 0) {
      this.setState(
        {
          iRadius: Math.min(svgHeight, svgWidth) / 2,
          dRadius: Math.min(svgHeight, svgWidth) / 2,
          ctr: 1
        },
        function() {
          console.log(this.state.iRadius);
        }
      );
    }
    let radius = this.state.dRadius
    //CHART DIMENSION
    let svg = d3
      .select("#sg5")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("display", "block")
      .style("margin", "auto");

    //REMOVE PREVIOUS GRAPH
    d3.select("g").remove();

    let pievalues = d3
      .pie()
      .sort(null)
      .value(function(d) {
        return d.b;
      })(data);

    let segments = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius)
      .padAngle(0.05)
      .padRadius(50);

    let g = svg
      .append("g")
      .attr("transform", "translate(250, 250)")
      .selectAll("path")
      .data(pievalues);

    g.enter()
      .append("path")
      .attr("d", segments);
  }

  componentDidUpdate() {
    this.drawPieChart();
  }

  render() {
    return (
      <div>
        <Grid>
          <Col xs={4} md={4} lg={4}>
            <Slider
              min={this.state.iRadius - 50}
              max={this.state.iRadius + 100}
              onChange={this.onChange}
              value={
                typeof this.state.dRadius === "number" ? this.state.dRadius : 0
              }
              step={10}
            />
          </Col>
          <Col xs={12} md={12} lg={12}>
            <svg id="sg5" />
          </Col>
        </Grid>
      </div>
    );
  }
}

export default PieChart;
