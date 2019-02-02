import React, { Component } from "react";
import InputForm from "../Input/InputForm";
import { Col, Grid } from "react-bootstrap";
import LineChart from "../LineChart/LineChart";
import BarChart from "../BarChart/BarChart";
import ScatterChart from "../ScatterChart/ScatterChart";
import GeoChart from "../GeoChart/GeoChart";
import { timeParse } from "d3";

class ChartType extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      chartname: "",
      xaxis: "",
      yaxis: "",
      height: 0,
      width: 0,
      fSize: 0,
      fColor: "",
      fType: "",
      chartColor: "",
      data: [],
      selectedOption: {},
      linechart: "",
      barchart: "",
      scatterchart: "",
      geochart: ""
    };
  }

  //TAKES DATA FROM INPUTFORM
  form_submit(
    chartname,
    xaxis,
    yaxis,
    fSize,
    fColor,
    fType,
    chartColor,
    height,
    width,
    data,
    selectedOption
  ) {
    this.setState(
      {
        chartname,
        chartColor,
        xaxis,
        yaxis,
        fSize,
        fColor,
        fType,
        height,
        width,
        data,
        selectedOption
      },
      function() {
        //CREATES JSON
        let inputjson = [];
        if (selectedOption.value === "geo") {
          inputjson = {
            "chart-type": this.state.selectedOption.value,
            chartColor: this.state.chartColor,
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
              },
              {
                x: {
                  code: "SEA",
                  city: "SEATTLE",
                  country: "USA",
                  lat: 47.61,
                  lon: -122.33
                },
                y: 599.4
              }
            ]
          };
        } else {
          inputjson = {
            "chart-type": this.state.selectedOption.value,
            chartColor: this.state.chartColor,
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
              { a: "01-29-2019", b: 255 }
            ]
          };
        }

        let parseDate = timeParse("%m-%d-%Y");
        inputjson["values"].forEach(d => {
          d.a = parseDate(d.a);
          d.b = +d.b;
        });

        if (inputjson["chart-type"] === "bar") {
          this.setState({
            linechart: "",
            scatterchart: "",
            geochart: "",
            barchart: <BarChart inputjson={inputjson} />
          });
        } else if (inputjson["chart-type"] === "line") {
          this.setState({
            barchart: "",
            scatterchart: "",
            geochart: "",
            linechart: <LineChart inputjson={inputjson} />
          });
          //this.drawLineChart(inputjson);
        } else if (inputjson["chart-type"] === "scatter") {
          this.setState({
            barchart: "",
            linechart: "",
            geochart: "",
            scatterchart: <ScatterChart inputjson={inputjson} />
          });
        } else if (inputjson["chart-type"] === "geo") {
          this.setState({
            barchart: "",
            linechart: "",
            scatterchart: "",
            geochart: <GeoChart inputjson={inputjson} />
          });
        }
      }
    );
  }

  render() {
    const chartnamestyle = {
      textAlign: "center",
      fontSize: this.state.fSize + "px",
      color: this.state.fColor,
      fontFamily: this.state.fType
    };

    return (
      <div>
        <Grid>
          <InputForm handlerb={this.form_submit.bind(this)} />
          <Col xs={12} md={12}>
            <p style={chartnamestyle}>{this.state.chartname}</p>
          </Col>
          <Col xs={12} md={12}>
            {this.state.linechart}
            {this.state.barchart}
            {this.state.scatterchart}
            {this.state.geochart}
          </Col>
        </Grid>
      </div>
    );
  }
}
export default ChartType;
