import React, { Component } from "react";
import { Col, Grid } from "react-bootstrap";
import { Slider } from "antd";
import * as d3 from "d3";
import "antd/dist/antd.css";

class BarChart extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      maxBarWidth: 30,
      dBarWidth: 1,
      ctr: 0
    };
  }

  onChange = value => {
    this.setState({
      dBarWidth: value
    });
  };

  componentDidMount() {
    this.drawBarChart();
  }

  componentWillReceiveProps(nextporps) {
    this.setState({
      ctr: 0
    });
  }
  
  //FUNCTION TO RENDER BAR CHART
  drawBarChart() {
    let inputjson = this.props.inputjson;
    let barWidth = this.state.dBarWidth;
    let chartColor = inputjson["chartColor"];
    const data = inputjson["values"];
    let xaxis = inputjson["x-axis"];
    let yaxis = inputjson["y-axis"];
    let svgWidth = inputjson["width"];
    let svgHeight = inputjson["height"];
    let fColor = inputjson["labelfColor"];
    let fSize = inputjson["labelfSize"];
    let colors;
    let margin = { top: 50, right: 50, bottom: 50, left: 50 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;

    //CHART DIMENSION
    let svg = d3
      .select("#sg2")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("display", "block")
      .style("margin", "auto");

    //REMOVE PREVIOUS GRAPH
    d3.select("g").remove();

    //SCALES AND AXIS DECLARATION
    let g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xScale = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1);
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

    if (this.state.ctr === 0) {
      this.setState({
        maxBarWidth: Math.round(xScale.bandwidth()),
        dBarWidth: Math.round(xScale.bandwidth() / 2),
        ctr: 1
      });
    }

    //APPEND AXIS
    g.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%d")))
      .style("opacity", 0.1);
    g.append("g")
      .call(d3.axisLeft(yScale))
      .style("opacity", 0.1);

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

    //CREATE BAR
    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      //.style("fill", colors)
      .attr("x", d => xScale(d.a))
      .attr("y", d => yScale(d.b))
      .attr("height", d => height - yScale(d.b))
      .attr("width", barWidth)
      .attr("fill", function(d) {
        return colors(d.b);
      });

    //LABELS AT INTERSECTION
    g.selectAll(".text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", function(d) {
        return xScale(d.a) + (barWidth / 2 - 10);
      })
      .attr("y", function(d) {
        return yScale(d.b) - 10;
      })
      .style("font-size", fSize)
      .style("fill", fColor)
      .text(function(d) {
        return d.b;
      });
    //}

    //AXIS LABEL
    g.append("text")
      .attr("x", -(height / 2))
      .attr("y", -(margin.left - 20))
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .style("font-size", fSize)
      .style("fill", fColor)
      .text(yaxis);
    g.append("text")
      .attr("x", width / 2)
      .attr("y", height + 35)
      .attr("text-anchor", "middle")
      .style("font-size", fSize)
      .style("fill", fColor)
      .text(xaxis);
  }

  componentDidUpdate() {
    this.drawBarChart();
  }

  render() {
    return (
      <div>
        <Grid>
          <Col xs={4} md={4} lg={4}>
            <Slider
              min={1}
              max={this.state.maxBarWidth}
              onChange={this.onChange}
              value={
                typeof this.state.dBarWidth === "number"
                  ? this.state.dBarWidth
                  : 0
              }
              step={10}
            />
          </Col>
          <Col xs={12} md={12} lg={12}>
            <svg id="sg2" />
          </Col>
        </Grid>
      </div>
    );
  }
}

export default BarChart;
