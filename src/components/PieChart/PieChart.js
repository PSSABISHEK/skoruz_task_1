import React, { Component } from "react";
import { Col, Grid } from "react-bootstrap";
import { Slider } from "antd";
import * as d3 from "d3";
import "antd/dist/antd.css";

class PieChart extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      MaxRadius: "",
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

  componentWillReceiveProps(nextprops) {
    this.setState({
      ctr: 0
    });
  }

  drawPieChart() {
    let inputjson = this.props.inputjson;
    let chartColor = inputjson["chartColor"];
    let data = inputjson["values"];
    let xaxis = inputjson["x-axis"];
    let yaxis = inputjson["y-axis"];
    let svgWidth = inputjson["width"];
    let svgHeight = inputjson["height"];
    let fColor = inputjson["labelfColor"];
    let fSize = inputjson["labelfSize"];
    let colors;
    if (this.state.ctr === 0) {
      this.setState({
        MaxRadius: Math.min(svgHeight, svgWidth) / 2 - 50,
        dRadius: Math.min(svgHeight, svgWidth) / 2 - 50,
        ctr: 1
      });
    }
    let radius = this.state.dRadius;

    //CHART DIMENSION
    let svg = d3
      .select("#sg5")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("display", "block")
      .style("margin", "auto");

    //REMOVE PREVIOUS GRAPH
    d3.select("g").remove();

    //SEQUENTIAL COLORS
    if (chartColor === "seq") {
      colors = d3
        .scaleSequential()
        .interpolator(d3.interpolateReds)
        .domain([
          0,
          d3.max(data, function(d) {
            return d.b;
          })
        ]);
    } else {
      colors = d3
        .scaleSequential()
        .interpolator(d3.interpolateRainbow)
        .domain([
          0,
          d3.max(data, function(d) {
            return d.b;
          })
        ]);
    }

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
      .padRadius(50);

    //CONSTRUCT PIE CHART
    let g = svg
      .append("g")
      .attr(
        "transform",
        "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")"
      )
      .selectAll("path")
      .data(pievalues);

    g.enter()
      .append("path")
      .attr("d", segments);

    //COLORS FOR EACH PIE
    g.enter()
      .append("path")
      .attr("d", segments)
      .attr("fill", function(d) {
        return colors(d.data.b);
      });

    //LABELS FOR EACH PIE
    let label = d3
      .select("g")
      .selectAll("text")
      .data(pievalues);
    label
      .enter()
      .append("text")
      .attr("transform", function(d) {
        let center = segments.centroid(d);
        center[0] *= 2.2;
        center[1] *= 2.2;
        return "translate (" + center + ")";
      })
      .style("font-size", fSize)
      .style("fill", fColor)
      .text(function(d) {
        return d.data.b;
      });
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
              min={10}
              max={this.state.MaxRadius}
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
