import React, { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {
  drawBarChart() {
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

    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;
    let svg = d3
      .select("#sg2")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    d3.select("g").remove();
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
    /* xScale.domain(
      d3.extent(data, function(d) {
        return d.a;
      })
    );  */

    const yScale = d3.scaleLinear().range([height, 0]);
    yScale.domain([
      0,
      d3.max(data, function(d) {
        return d.b;
      })
    ]);

    g.data(data)
      .enter()
      .append("rect")
      .style("fill", "steelblue")
      .attr("x", d => xScale(d.a))
      .attr("y", d => yScale(d.b))
      .attr("height", d => height - yScale(d.b))
      .attr("width", xScale.bandwidth());
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

    g.selectAll() //Create Bar
      .data(data)
      .enter()
      .append("rect")
      .style("fill", "steelblue")
      .attr("x", d => xScale(d.a))
      .attr("y", d => yScale(d.b))
      .attr("height", d => height - yScale(d.b))
      .attr("width", xScale.bandwidth());

    //Co-ordinates Label
    if (svgWidth < 500) {
      g.selectAll(".text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", function(d) {
          return xScale(d.a) + 7;
        })
        .attr("y", function(d) {
          return yScale(d.b) - 10;
        })
        .attr("dy", ".75em")
        .text(function(d) {
          return d.b;
        });
    } else if (svgWidth >= 500) {
      g.selectAll(".text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", function(d) {
          return xScale(d.a);
        })
        .attr("y", function(d) {
          return yScale(d.b) - 10;
        })
        .attr("dy", ".75em")
        .text(function(d) {
          return d.b;
        });
    }

    g.append("text") // Y-Axis Label
      .attr("x", -(height / 2))
      .attr("y", -(margin.left - 25))
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .attr("stroke", "black")
      .text(yaxis);

    g.append("text") // X-Axis Label
      .attr("x", width / 2)
      .attr("y", height + 30)
      .attr("text-anchor", "middle")
      .attr("stroke", "black")
      .text(xaxis);
  }

  render() {
    if (this.props.height) this.drawBarChart();
    return (
      <div>
        <svg id="sg2" />
      </div>
    );
  }
}

export default BarChart;
