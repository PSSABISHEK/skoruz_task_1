import React, { Component } from "react";
import * as d3 from "d3";
import { Col } from "react-bootstrap";

class Linechart extends Component {
  drawLineChart() {
    const data = [
      { a: 1, b: 3 },
      { a: 2, b: 6 },
      { a: 3, b: 2 },
      { a: 4, b: 12 },
      { a: 5, b: 8 }
    ];
    let xaxis = this.props.xaxis;
    let yaxis = this.props.yaxis;
    let svgWidth = this.props.width,
      svgHeight = this.props.height;
    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;
    let svg = d3
      .select("#sg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    let g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    let x = d3.scaleLinear().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);
    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y);
    let line = d3
      .line()
      .x(function(d) {
        return x(d.a);
      })
      .y(function(d) {
        return y(d.b);
      });
    x.domain(
      d3.extent(data, function(d) {
        return d.a;
      })
    );
    y.domain(
      d3.extent(data, function(d) {
        return d.b;
      })
    );

    //ADD GRID LINES FOR X AND Y  USE THIS METHOD OR THE METHOD BELOW
    /* function make_x_gridlines() {
      return d3.axisBottom(x).ticks(5);
    }
    function make_y_gridlines() {
      return d3.axisLeft(y).ticks(5);
    }
    g.append("g")
    .attr("class", "grid")
    .call(
      make_y_gridlines()
      .tickSize(-width, 0, 0)
      .tickFormat("")
      );
      g.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(
        make_x_gridlines()
        .tickSize(-height, 0, 0)
        .tickFormat("")
        ); */

    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft()
          .scale(y)
          .tickSize(-width, 0, 0)
          .tickFormat("")
      );

    /* g.append("g")    //FOR LINES PARALLEL TO Y
          .attr("class", "grid")
          .attr("transform", `translate(0, ${height})`)
          .call(
            d3
            .axisBottom()
            .scale(x)
            .tickSize(-height, 0, 0)
            .tickFormat("")
            ); */
    //TILL HERE
    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .select(".domain");

    g.append("g").call(yAxis);

    g.append("text")
      .attr("x", -(height / 2))
      .attr("y", -(margin.left - 30))
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text(yaxis);

    g.append("text")
      .attr("x", width / 2)
      .attr("y", height + 30)
      .attr("text-anchor", "middle")
      .text(xaxis);

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }
  render() {
    if (this.props.height > 1) this.drawLineChart(this.props);
    return (
      <div>
        <Col xs={12} md={12}>
          <svg id="sg" />
        </Col>
      </div>
    );
  }
}

export default Linechart;
