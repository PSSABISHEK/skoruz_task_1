import React, { Component } from "react";
import * as d3 from "d3";
import { Col, Grid } from "react-bootstrap";
import { Slider, InputNumber } from "antd";
import "antd/dist/antd.css";

class LineChart extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      graphSize: 3
    };
  }

  onChange = value => {
    this.setState({
      graphSize: value
    });
  };

  componentDidMount() {
    this.drawLineChart();
  }

  //FUNCTION TO RENDER LINE CHART
  drawLineChart() {
    let inputjson = this.props.inputjson;
    let i = -1;
    let start = 1;
    let chartColor = inputjson["chartColor"];
    let data = inputjson["values"];
    let xaxis = inputjson["x-axis"];
    let yaxis = inputjson["y-axis"];
    let svgWidth = inputjson["width"];
    let svgHeight = inputjson["height"];
    let margin = { top: 30, right: 30, bottom: 30, left: 40 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;

    //CHART DIMENSION
    let svg = d3
      .select("#sg1")
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
    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);
    let xAxis = d3
      .axisBottom(x)
      .ticks(data.length)
      .tickFormat(d3.timeFormat("%d"))
      .tickSize(0)
      .tickPadding(6);
    let yAxis = d3
      .axisLeft(y)
      .tickSize(0)
      .tickPadding(6);
    /* var area = d3
        .area()
        .x(function(d) {
          return x(d.a);
        })
        .y0(height)
        .y1(function(d) {
          return y(d.b);
        }); */
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
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.b;
      })
    ]);

    //APPEND AXIS
    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .style("opacity", 0.1)
      .select(".domain");
    g.append("g")
      .call(yAxis)
      .style("opacity", 0.1)
      .select(".domain");

    //AXIS LABLES
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

    //GIVES AREA UNDER THE GRAPH
    /* g.append("path") 
        .data([data])
        .attr("class", "area")
        .attr("d", area); */

    //DRAW GRINDLINES
    g.append("g")
      .attr("class", "grid")
      .style("opacity", 0.1)
      .call(
        d3
          .axisLeft(y)
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

    //DRAW LINE
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", chartColor)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", this.state.graphSize)
      .attr("d", line);

    /* var div = g
      .append("text")
      //.attr("class", tooltip)
      .style("opacity", 0); */
    //DOTS AT INTERSECTION
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", (this.state.graphSize * 3.5) / 2)
      .attr("fill", chartColor)
      .attr("cx", function(d) {
        return x(d.a);
      })
      .attr("cy", function(d) {
        return y(d.b);
      });
    /* .on("mouseover", function(d) {
        return div
          .html(formatTime(d.a) + d.b)
          .style("opacity", 0.9)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 5 + "px");
      })
      .on("mouseout", function(d) {
        div.style("opacity", 0);
      }); */

    //LABELS AT INTERSECTION
    g.selectAll(".text")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", function(d) {
        return x(d.a) - 15;
      })
      .attr("y", function(d) {
        if (start === 1) {
          start = 0;
          return y(d.b) + 5;
        } else {
          if (data[i + 1].b >= d.b) {
            i += 1;
            return y(d.b) + 12;
          } else {
            i += 1;
            return y(d.b) - 18;
          }
        }
      })
      .attr("dy", ".75em")
      .text(function(d) {
        return d.b;
      });
  }

  componentDidUpdate() {
    this.drawLineChart();
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
            <svg id="sg1" />
          </Col>
        </Grid>
      </div>
    );
  }
}

export default LineChart;
