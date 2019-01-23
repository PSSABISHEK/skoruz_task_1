import React, { Component } from "react";
import * as d3 from "d3";
import { Col } from "react-bootstrap";

class LineChart extends Component {
  drawLineChart() {
    const data = [
      { a: "01-15-2019", b: 3 },
      { a: "01-16-2019", b: 6 },
      { a: "01-17-2019", b: 2 },
      { a: "01-18-2019", b: 12 },
      { a: "01-19-2019", b: 8 },
      { a: "01-20-2019", b: 13 }
    ];

    let xaxis = this.props.xaxis;
    let yaxis = this.props.yaxis;
    let svgWidth = this.props.width,
      svgHeight = this.props.height;
    let margin = { top: 20, right: 50, bottom: 30, left: 50 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;
    let parseDate = d3.timeParse("%m-%d-%Y");
    let svg = d3
      .select("#sg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    d3.select("g").remove();
    let g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);
    let xAxis = d3
      .axisBottom(x)
      .ticks(data.length)
      .tickFormat(d3.timeFormat("%m-%d-%Y"));
    let yAxis = d3.axisLeft(y);
    let line = d3
      .line()
      .x(function(d) {
        return x(d.a);
      })
      .y(function(d) {
        return y(d.b);
      });
    data.forEach(function(d) {
      d.a = parseDate(d.a);
      d.b = +d.b;
    });
    x.domain(
      d3.extent(data, function(d) {
        return d.a;
      })
    );
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.b;
      })
    ]);

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
      .attr("stroke", "black")
      .text(yaxis);

    g.append("text")
      .attr("x", width / 2)
      .attr("y", height + 30)
      .attr("text-anchor", "middle")
      .attr("stroke", "black")
      .text(xaxis);

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
    g.selectAll(".text")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", function(d) {
        return x(d.a);
      })
      .attr("y", function(d) {
        return y(d.b) - 15;
      })
      .attr("dy", ".75em")
      .text(function(d) {
        return d.b;
      });
  }
  render() {
    if (this.props.height) this.drawLineChart(this.props);
    return (
      <div>
        <Col xs={12} md={12}>
          <svg id="sg" />
        </Col>
      </div>
    );
  }
}

export default LineChart;
