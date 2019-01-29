import React, { Component } from "react";
import InputForm from "../Input/InputForm";
import * as d3 from "d3";
import { Col } from "react-bootstrap";
import { feature } from "topojson";

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

  //FUNCTION TO RENDER BARCHART
  drawBarChart(inputjson) {
    const data = inputjson["values"];
    let xaxis = inputjson["x-axis"];
    let yaxis = inputjson["y-axis"];
    let svgWidth = inputjson["width"];
    let svgHeight = inputjson["height"];
    let margin = { top: 30, right: 30, bottom: 30, left: 40 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;
    let parseDate = d3.timeParse("%m-%d-%Y");
    data.forEach(function(d) {
      d.a = parseDate(d.a);
      d.b = +d.b;
    });

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

    //APPEND AXIS
    g.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%d")));
    g.append("g").call(d3.axisLeft(yScale));

    //DRAW GRIDLINES
    g.append("g")
      .attr("class", "grid")
      .style("opacity", 0.2)
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
      .style("fill", "steelblue")
      .attr("x", d => xScale(d.a))
      .attr("y", d => yScale(d.b))
      .attr("height", d => height - yScale(d.b))
      .attr("width", xScale.bandwidth());

    //LABELS AT INTERSECTION
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
          return xScale(d.a) + (xScale.bandwidth() / 2 - 10);
        })
        .attr("y", function(d) {
          return yScale(d.b) - 10;
        })
        .attr("dy", ".75em")
        .text(function(d) {
          return d.b;
        });
    }

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
  }

  //FUNCTION TO RENDER LINE CHART
  drawLineChart(inputjson) {
    const data = inputjson["values"];
    let xaxis = inputjson["x-axis"];
    let yaxis = inputjson["y-axis"];
    let svgWidth = inputjson["width"];
    let svgHeight = inputjson["height"];
    let margin = { top: 30, right: 30, bottom: 30, left: 40 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;
    let parseDate = d3.timeParse("%m-%d-%Y");
    data.forEach(function(d) {
      d.a = parseDate(d.a);
      d.b = +d.b;
    });

    //CHART DIMENSION
    let svg = d3
      .select("#sg2")
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
      .tickFormat(d3.timeFormat("%d"));
    let yAxis = d3.axisLeft(y);
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
      .select(".domain");
    g.append("g").call(yAxis);

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
      .style("opacity", 0.2)
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
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    //DOTS AT INTERSECTION
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 3.5)
      .attr("fill", "steelblue")
      .attr("cx", function(d) {
        return x(d.a);
      })
      .attr("cy", function(d) {
        return y(d.b);
      });

    //LABELS AT INTERSECTION
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

  drawScatterChart(inputjson) {
    const data = inputjson["values"];
    let xaxis = inputjson["x-axis"];
    let yaxis = inputjson["y-axis"];
    let svgWidth = inputjson["width"];
    let svgHeight = inputjson["height"];
    let margin = { top: 30, right: 30, bottom: 30, left: 40 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;
    let parseDate = d3.timeParse("%m-%d-%Y");
    data.forEach(function(d) {
      d.a = parseDate(d.a);
      d.b = +d.b;
    });

    //CHART DIMENSION
    let svg = d3
      .select("#sg2")
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
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%d")));
    g.append("g").call(d3.axisLeft(yScale));

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
      .style("opacity", 0.2)
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
      .style("fill", "steelblue")
      .attr("cx", d => xScale(d.a))
      .attr("cy", d => yScale(d.b))
      .attr("r", 3);

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

  drawGeoChart(inputjson) {
    const data = inputjson["values"];
    let xaxis = inputjson["x-axis"];
    let yaxis = inputjson["y-axis"];
    let svgWidth = inputjson["width"];
    let svgHeight = inputjson["height"];
    let margin = { top: 30, right: 30, bottom: 30, left: 40 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;

    var svg = d3
      .select("#sg2")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("display", "block")
      .style("margin", "auto");

    //REMOVES PREVIOUS GRAPH
    d3.select("g").remove();

    var g = svg.append("g");

    const geoProjection = d3
      .geoMercator()
      .center([0, 5])
      .scale(100)
      .rotate([-180, 0]);

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
        .attr("r", 5)
        .style("fill", "red");
    });
  }

  //TAKES DATA FROM INPUTFORM
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
        //CREATES JSON
        let inputjson = [];
        if (selectedOption.value === "geo") {
          inputjson = {
            "chart-type": this.state.selectedOption.value,
            height: this.state.height,
            width: this.state.width,
            "x-axis": this.state.xaxis,
            "y-axis": this.state.yaxis,
            values: [
              {
                x: {
                  code: "ZNZ",
                  city: "ZANZIBAR",
                  country: "TANZANIA",
                  lat: -6.13,
                  lon: 39.31
                },
                y: 402.5
              },
              {
                x: {
                  code: "TYO",
                  city: "TOKYO",
                  country: "JAPAN",
                  lat: 35.68,
                  lon: 139.76
                },
                y: 632.5
              },
              {
                x: {
                  code: "AKL",
                  city: "AUCKLAND",
                  country: "NEW ZEALAND",
                  lat: -36.85,
                  lon: 174.78
                },
                y: 232.2
              },
              {
                x: {
                  code: "BKK",
                  city: "BANGKOK",
                  country: "THAILAND",
                  lat: 13.75,
                  lon: 100.48
                },
                y: 932.2
              },
              {
                x: {
                  code: "DEL",
                  city: "DELHI",
                  country: "INDIA",
                  lat: 29.01,
                  lon: 77.38
                },
                y: 912.7
              },
              {
                x: {
                  code: "SIN",
                  city: "SINGAPORE",
                  country: "SINGAPOR",
                  lat: 1.36,
                  lon: 103.75
                },
                y: 824.1
              },
              {
                x: {
                  code: "BSB",
                  city: "BRASILIA",
                  country: "BRAZIL",
                  lat: -15.67,
                  lon: -47.43
                },
                y: 193.4
              },
              {
                x: {
                  code: "RIO",
                  city: "RIO DE JANEIRO",
                  country: "BRAZIL",
                  lat: -22.9,
                  lon: -43.24
                },
                y: 902
              },
              {
                x: {
                  code: "YTO",
                  city: "TORONTO",
                  country: "CANADA",
                  lat: 43.64,
                  lon: -79.4
                },
                y: 307.5
              }
            ]
          };
        } else {
          inputjson = {
            "chart-type": this.state.selectedOption.value,
            height: this.state.height,
            width: this.state.width,
            "x-axis": this.state.xaxis,
            "y-axis": this.state.yaxis,
            values: [
              { a: "01-15-2019", b: 89 },
              { a: "01-16-2019", b: 104 },
              { a: "01-17-2019", b: 106 },
              { a: "01-18-2019", b: 534 },
              { a: "01-19-2019", b: 400 },
              { a: "01-21-2019", b: 656 },
              { a: "01-24-2019", b: 910 },
              { a: "01-25-2019", b: 1000 },
              { a: "01-29-2019", b: 400 }
            ]
          };
        }

        if (inputjson["chart-type"] === "bar") {
          this.drawBarChart(inputjson);
        } else if (inputjson["chart-type"] === "line") {
          this.drawLineChart(inputjson);
        } else if (inputjson["chart-type"] === "scatter") {
          this.drawScatterChart(inputjson);
        } else if (inputjson["chart-type"] === "geo") {
          this.drawGeoChart(inputjson);
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
