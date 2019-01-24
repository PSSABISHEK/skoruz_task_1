import React, { Component } from "react";
import InputForm from "../Input/InputForm";
import * as d3 from "d3";
import { Col } from "react-bootstrap";

class ChartType extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      xaxis: "",
      yaxis: "",
      height: 0,
      width: 0,
      data: [],
      selectedOption: {}
    };
  }

  drawBarChart(inputjson) {
    const data = inputjson["values"];
    let xaxis = inputjson["y-axis"];
    let yaxis = inputjson["y-axis"];
    let svgWidth = inputjson["width"];
    let svgHeight = inputjson["height"];

    let margin = { top: 30, right: 30, bottom: 30, left: 30 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;

    //Assigning chart dimension
    let svg = d3
      .select("#sg2")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("display", "block")
      .style("margin", "auto");

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
    const yScale = d3.scaleLinear().range([height, 0]);
    yScale.domain([
      0,
      d3.max(data, function(d) {
        return d.b;
      })
    ]);

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

    g.selectAll("rect") //Create Bar
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
      .attr("y", -(margin.left - 10))
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .attr("stroke", "black")
      .text(yaxis);

    g.append("text") // X-Axis Label
      .attr("x", width / 2)
      .attr("y", height + 25)
      .attr("text-anchor", "middle")
      .attr("stroke", "black")
      .text(xaxis);
  }

  drawLineChart(inputjson) {
    const data = inputjson["values"];
    let xaxis = inputjson["y-axis"];
    let yaxis = inputjson["y-axis"];
    let svgWidth = inputjson["width"];
    let svgHeight = inputjson["height"];
    let margin = { top: 30, right: 30, bottom: 30, left: 30 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;
    let parseDate = d3.timeParse("%m-%d-%Y");

    //Assigning chart dimension
    let svg = d3
      .select("#sg2")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("display", "block")
      .style("margin", "auto");
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

    //GRINDLINES FOR LINE PARALLEL TO X
    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft()
          .scale(y)
          .tickSize(-width, 0, 0)
          .tickFormat("")
      );

    /*g.append("g") //FOR LINES PARALLEL TO Y
      .attr("class", "grid")
      .attr("transform", `translate(0, ${height})`)
      .call(
        d3
          .axisBottom()
          .scale(x)
          .tickSize(-height, 0, 0)
          .tickFormat("")
      );*/
    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .select(".domain");

    g.append("g").call(yAxis);

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

  form_submit(xaxis, yaxis, height, width, data, selectedOption) {
    this.setState(
      {
        xaxis: xaxis,
        yaxis: yaxis,
        height: height,
        width: width,
        data: data,
        selectedOption: selectedOption
      },
      function() {
        let inputjson = {
          "chart-type": this.state.selectedOption.value,
          height: this.state.height,
          width: this.state.width,
          "x-axis": this.state.xaxis,
          "y-axis": this.state.yaxis,
          values: [
            { a: "01-15-2019", b: 3 },
            { a: "01-16-2019", b: 6 },
            { a: "01-17-2019", b: 2 },
            { a: "01-18-2019", b: 12 },
            { a: "01-19-2019", b: 8 },
            { a: "01-20-2019", b: 13 }
          ]
        };

        if (inputjson["chart-type"] === "bar") {
          this.drawBarChart(inputjson);
        } else if (inputjson["chart-type"] === "line") {
          this.drawLineChart(inputjson);
        }
      }
    );
  }

  render() {
    return (
      <div>
        <InputForm handlerb={this.form_submit.bind(this)} />
        <Col xs={12} md={12}>
          <svg id="sg2" />
        </Col>
      </div>
    );
  }
}
export default ChartType;
