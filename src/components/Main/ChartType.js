import React, { Component } from "react";
import InputForm from "../Input/InputForm";
import { Col, Grid } from "react-bootstrap";
import LineChart from "../LineChart/LineChart";
import BarChart from "../BarChart/BarChart";
import ScatterChart from "../ScatterChart/ScatterChart";
import GeoChart from "../GeoChart/GeoChart";
import PieChart from "../PieChart/PieChart";
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
      titlefColor: "",
      titlefSize: 0,
      labelfSize: 0,
      labelfColor: "",
      chartColor: "",
      selectedOption: [],
      selectedTheme: [],
      data: [],
      linechart: "",
      barchart: "",
      scatterchart: "",
      geochart: "",
      piechart: ""
    };
  }

  //TAKES DATA FROM INPUTFORM
  form_submit(
    chartname,
    xaxis,
    yaxis,
    titlefSize,
    titlefColor,
    labelfSize,
    labelfColor,
    height,
    width,
    data,
    selectedOption,
    selectedTheme
  ) {
    this.setState(
      {
        chartname,
        xaxis,
        yaxis,
        titlefSize,
        titlefColor,
        labelfSize,
        labelfColor,
        height,
        width,
        data,
        selectedOption,
        selectedTheme
      },
      function() {
        //CREATES JSON

        let inputjson = [];
        if (this.state.selectedOption.value === "geo") {
          inputjson = {
            "chart-type": this.state.selectedOption.value,
            chartColor: this.state.selectedTheme.value,
            titlefSize: this.state.titlefSize,
            titlefColor: this.state.titlefColor,
            labelfSize: this.state.labelfSize,
            labelfColor: this.state.labelfColor,
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
                  country: "SINGAPORE",
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
          console.log(this.state);

          inputjson = {
            "chart-type": this.state.selectedOption.value,
            chartColor: this.state.selectedTheme.value,
            titlefSize: this.state.titlefSize,
            titlefColor: this.state.titlefColor,
            labelfSize: this.state.labelfSize,
            labelfColor: this.state.labelfColor,
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
          let parseDate = timeParse("%m-%d-%Y");
          inputjson["values"].forEach(d => {
            d.a = parseDate(d.a);
            d.b = +d.b;
          });
        }

        if (inputjson["chart-type"] === "bar") {
          this.setState({
            linechart: "",
            barchart: <BarChart inputjson={inputjson} />,
            scatterchart: "",
            geochart: "",
            piechart: ""
          });
        } else if (inputjson["chart-type"] === "line") {
          this.setState({
            linechart: <LineChart inputjson={inputjson} />,
            barchart: "",
            scatterchart: "",
            geochart: "",
            piechart: ""
          });
        } else if (inputjson["chart-type"] === "scatter") {
          this.setState({
            linechart: "",
            barchart: "",
            scatterchart: <ScatterChart inputjson={inputjson} />,
            geochart: "",
            piechart: ""
          });
        } else if (inputjson["chart-type"] === "geo") {
          this.setState({
            linechart: "",
            barchart: "",
            scatterchart: "",
            geochart: <GeoChart inputjson={inputjson} />,
            piechart: ""
          });
        } else if (inputjson["chart-type"] === "pie") {
          this.setState({
            barchart: "",
            linechart: "",
            scatterchart: "",
            geochart: "",
            piechart: <PieChart inputjson={inputjson} />
          });
        }
      }
    );
  }

  render() {
    const chartnamestyle = {
      textAlign: "center",
      fontSize: this.state.titlefSize + "px",
      color: this.state.titlefColor,
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
            {this.state.piechart}
          </Col>
        </Grid>
      </div>
    );
  }
}
export default ChartType;
