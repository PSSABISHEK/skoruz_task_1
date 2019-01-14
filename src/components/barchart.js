import React, { Component } from "react";
import * as d3 from "d3";

class Barchart extends Component {
  constructor(props, context) {
    super(props, context);
  }
  drawBarChart() {
    const data = [
      { a: 2014, b: 100 },
      { a: 2015, b: 150 },
      { a: 2016, b: 400 },
      { a: 2017, b: 550 },
      { a: 2018, b: 700 },
      { a: 2019, b: 900 },
      { a: 2020, b: 250 }
    ];
    let xaxis = this.props.xaxis;
    let yaxis = this.props.yaxis;
    let svgWidth = this.props.width,
      svgHeight = this.props.height;
    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;
    let svg = d3
      .select("#sg2")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    let g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xScale = d3
      .scaleBand()
      .range([0, width])
      .paddingInner(0.1);
    xScale.domain(
      data.map(function(d) {
        return d.a;
      })
    );
    /* xScale.domain(
      d3.extent(data, function(d) {
        return d.a;
      })
    ); */

    const yScale = d3.scaleLinear().range([height, 0]);
    yScale.domain(
      d3.extent(data, function(d) {
        return d.b;
      })
    );
    g.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    g.append("g").call(d3.axisLeft(yScale));
    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft()
          .scale(yScale)
          .tickSize(-width, 0, 0)
          .tickFormat("")
      );

    g.selectAll()
      .data(data)
      .enter()
      .append("rect")
      .style("fill", "steelblue")
      .attr("x", d => xScale(d.a))
      .attr("y", d => yScale(d.b))
      .attr("height", d => height - yScale(d.b))
      .attr("width", xScale.bandwidth());

    g.append("text")
      .attr("x", -(height / 2))
      .attr("y", -(margin.left - 25))
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      //.attr("stroke", "black")
      .text(yaxis);

    g.append("text")
      .attr("x", width / 2)
      .attr("y", height + 30)
      .attr("text-anchor", "middle")
      //.attr("stroke", "black")
      .text(xaxis);
  }

  render() {
    if (this.props.height > 1) this.drawBarChart(this.props);
    return (
      <div>
        <svg id="sg2" />
      </div>
    );
  }
}

export default Barchart;
