import React, { Component } from "react";
import * as d3 from "d3";
import { Col, Grid } from "react-bootstrap";
import { Slider, InputNumber } from "antd";
import "antd/dist/antd.css";
import { feature } from "topojson";

class GeoChart extends Component {
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
    this.drawGeoChart();
  }

  drawGeoChart() {
    let inputjson = this.props.inputjson;
    const data = inputjson["values"];
    let chartColor = inputjson["chartColor"];
    //let xaxis = inputjson["x-axis"];
    //let yaxis = inputjson["y-axis"];
    let svgWidth = inputjson["width"];
    let svgHeight = inputjson["height"];
    let fColor = inputjson["fColor"];
    let fSize = inputjson["fSize"];
    let fType = inputjson["fType"];
    //let margin = { top: 30, right: 30, bottom: 30, left: 40 };
    //let width = svgWidth - margin.left - margin.right;
    //let height = svgHeight - margin.top - margin.bottom;

    var svg = d3
      .select("#sg4")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("display", "block")
      .style("margin", "auto");

    //REMOVES PREVIOUS GRAPH
    d3.select("g").remove();

    var g = svg.append("g");

    const geoProjection = d3.geoMercator().center([0, 0]);
    //.scale(100)
    //.rotate([-180, 0]);

    var geoPath = d3.geoPath().projection(geoProjection);

    d3.json("https://unpkg.com/world-atlas@1/world/110m.json").then(topo => {
      const countries = feature(topo, topo.objects.countries);
      g.selectAll("path")
        .data(countries.features)
        .enter()
        .append("path")
        .attr("fill", "#ccc")
        .attr("d", geoPath);

      g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("transform", function(d) {
          return "translate(" + geoProjection([d.x.lon, d.x.lat]) + ")";
        })
        .attr("r", this.state.graphSize)
        .style("fill", chartColor);

      g.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("transform", function(d) {
          return "translate(" + geoProjection([d.x.lon + 2, d.x.lat]) + ")";
        })
        .style("font-family", fType)
        .style("font-size", fSize)
        .style("fill", fColor)
        //.style("font-weight", 'bold')
        .text(function(d) {
          return d.x.country + "  " + d.y;
        });
    });
  }

  componentDidUpdate() {
    this.drawGeoChart();
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
            <svg id="sg4" />
          </Col>
        </Grid>
      </div>
    );
  }
}

export default GeoChart;
