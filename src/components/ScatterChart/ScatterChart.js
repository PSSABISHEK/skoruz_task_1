import React, { Component } from "react";
import * as d3 from "d3";
import { Col, Grid } from "react-bootstrap";
import { Slider, InputNumber } from "antd";
import "antd/dist/antd.css";

class ScatterChart extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      graphSize: 3,
    };
  }

  onChange = value => {
    this.setState({
      graphSize: value
    });
  };

  componentDidMount() {
    this.drawScatterChart();
  }

  //FUNCTION TO RENDER SCATTER CHART
  drawScatterChart() {
    let inputjson = this.props.inputjson;
    const data = inputjson["values"];
    let xaxis = inputjson["x-axis"];
    let chartColor = inputjson["chartColor"];
    let yaxis = inputjson["y-axis"];
    let svgWidth = inputjson["width"];
    let svgHeight = inputjson["height"];
    let margin = { top: 30, right: 30, bottom: 30, left: 40 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;

    //CHART DIMENSION
    let svg = d3
      .select("#sg3")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("display", "block")
      .style("margin", "auto");

    //REMOVES PREVIOUS GRAPH
    d3.select("g").remove();

    //SCALES AND AXIS DECLARATION
    let g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    const xScale = d3
      .scalePoint()
      .range([0, width])
      .padding(0.3);
    xScale.domain(
      data.map(function(d) {
        return d.a;
      })
    );
    const yScale = d3.scaleLinear().range([height, 0]);
    yScale.domain([
      0,
      d3.max(data, function(d) {
        return d.b;
      })
    ]);

    //APPENDS AXIS
    g.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%d")))
      .style("opacity", 0.1);
    g.append("g")
      .call(d3.axisLeft(yScale))
      .style("opacity", 0.1);

    //AXIS LABEL
    g.append("text")
      .attr("x", -(height / 2))
      .attr("y", -(margin.left - 10))
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .attr("stroke", "black")
      .text(yaxis);
    g.append("text")
      .attr("x", width / 2)
      .attr("y", height + 25)
      .attr("text-anchor", "middle")
      .attr("stroke", "black")
      .text(xaxis);

    //DRAW GRIDLINES
    g.append("g")
      .attr("class", "grid")
      .style("opacity", 0.1)
      .call(
        d3
          .axisLeft()
          .scale(yScale)
          .tickSize(-width, 0, 0)
          .tickFormat("")
      );

    //CREATE CIRCLE
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .style("fill", chartColor)
      .attr("cx", d => xScale(d.a))
      .attr("cy", d => yScale(d.b))
      .attr("r", this.state.graphSize);

    //LABELS AT INTERSECTION
    g.selectAll(".text")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", function(d) {
        return xScale(d.a) - 3;
      })
      .attr("y", function(d) {
        return yScale(d.b) - 15;
      })
      .attr("dy", ".75em")
      .text(function(d) {
        return d.b;
      });
  }

  componentDidUpdate() {
    this.drawScatterChart();
  }

  render() {
    //let inputjson = this.props.inputjson;

    return (
      <div>
        <Grid>
          <Col xs={4} md={4} lg={4}>
            <Slider
              min={1}
              max={10}
              onChange={this.onChange}
              value={
                typeof this.state.graphSize === "number"
                  ? this.state.graphSize
                  : 0
              }
              step={0.1}
            />
          </Col>
          <Col xs={2} md={2} lg={2}>
            <InputNumber
              min={1}
              max={10}
              style={{ marginLeft: 16 }}
              step={0.1}
              value={this.state.graphSize}
              onChange={this.onChange}
            />
          </Col>
          <Col xs={12} md={12} lg={12}> 
            <svg id="sg3" />
          </Col>
        </Grid>
      </div>
    );
  }
}

export default ScatterChart;
