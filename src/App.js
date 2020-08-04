import React from "react";
import Plot from "react-plotly.js";
import "./App.css";
import axios from "axios";
import { Container, Row, Col, Jumbotron, Dropdown } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      sampleId: 940,
      index: 0,
    };
  }

  componentWillMount() {
    const url = "https://react-plotly-sample.herokuapp.com/data";
    const myHeaders = new Headers();
    // myHeaders.append('')
    const options = {
      method: "GET",
      redirect: "follow",
    };
    axios(url, options)
      .then((res) => {
        console.log(res.data);
        this.setState({
          data: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  _onSelect = (value) => {
    this.setState({
      sampleId: value,
    });
  };

  generateFreqPath(wfreq) {
    const level = parseFloat(wfreq) * 20;

    const degrees = 180 - level;
    const radius = 0.5;
    const radians = (degrees * Math.PI) / 180;
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    const mainPath = "M -.0 -0.05 L .0 0.05 L ";
    const pathX = String(x);
    const space = " ";
    const pathY = String(y);
    const pathEnd = " Z";
    const path = mainPath.concat(pathX, space, pathY, pathEnd);
    return { path, level };
  }

  render() {
    const { data, sampleId } = this.state;
    const { samples, metadata, names } = data;
    let currentSample;
    let currentMeta;
    let sampleValues;
    let otuIds = [];
    let level;
    let path;
    if (samples) {
      // samples is an array with id, otu_ids, sample_values, otu_labels
      currentSample = samples.find(
        (sample) => sample.id == this.state.sampleId
      );
      currentMeta = metadata.find((sample) => sample.id == this.state.sampleId);
      const { id, otu_ids, sample_values, out_labels } = currentSample;
      sampleValues = sample_values.slice(0, 10).reverse();
      otu_ids.slice(0, 10).forEach((otu) => {
        otuIds.unshift(`OTU ${otu}`);
      });
      const genPath = this.generateFreqPath(currentMeta.wfreq);
      path = genPath.path;
      level = genPath.level;
    }

    return (
      <>
        <Jumbotron fluid={true}>
          <h2 className="text-center">Belly Button Biodiversity Dashboard</h2>
          <p className="text-center">
            Use the interactive chart below to explore the dataset
          </p>
        </Jumbotron>
        <Container>
          <Row>
            <Col md="3" lg="3">
              {this.state.data && (
                <>
                  {/* <Dropdown
              options={names}
              onChange={this._onSelect}
              value={names[0]}
              placeholder="Select sample Id"
              className="dropdown"
            /> */}
                  <Jumbotron>
                    <label>
                      Test subject ID <br />
                      No.:
                    </label>{" "}
                    <br />
                    <Dropdown drop="right">
                      <Dropdown.Toggle variant="" id="dropdown-basic">
                        {sampleId}
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="dropdown">
                        {names.map((id, index) => (
                          <Dropdown.Item
                            onSelect={() => this._onSelect(id)}
                            key={index}
                          >
                            {id}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Jumbotron>
                  <div className="metadata">
                    <h3>Demographic Info</h3>
                    <p>id: {currentMeta.id}</p>
                    <p>ethnicity: {currentMeta.ethnicity}</p>
                    <p>gender: {currentMeta.gender}</p>
                    <p>age: {currentMeta.age}</p>
                    <p>location: {currentMeta.location}</p>
                    <p>bbtype: {currentMeta.bbtype}</p>
                    <p>wfreq: {currentMeta.wfreq}</p>
                  </div>
                </>
              )}
            </Col>

            <Col md="4" lg="4">
              {this.state.data && (
                <Plot
                  data={[
                    {
                      type: "bar",
                      name: "Top ten otus",
                      x: sampleValues,
                      y: otuIds,
                      yaxis: "OTU Id",
                      xaxis: "OTU Value",
                      hovertext: currentSample.otu_labels.slice(0, 10),
                      orientation: "h",
                      marker: {
                        color: "rgba(55,128,191, 0.8)",
                        width: 2,
                      },
                    },
                  ]}
                  layout={{ width: 400, height: 600, title: "Top 10 OTUs" }}
                />
              )}
            </Col>

            <Col md="5" lg="5">
              {this.state.data && (
                <Plot
                  data={[
                    {
                      type: "scatter",
                      x: [0],
                      y: [0],
                      marker: { size: 12, color: "850000" },
                      showlegend: false,
                      name: "Freq",
                      text: level,
                      hoverinfo: "text+name",
                    },
                    {
                      values: [
                        50 / 9,
                        50 / 9,
                        50 / 9,
                        50 / 9,
                        50 / 9,
                        50 / 9,
                        50 / 9,
                        50 / 9,
                        50 / 9,
                        50,
                      ],
                      rotation: 90,
                      text: [
                        "8-9",
                        "7-8",
                        "6-7",
                        "5-6",
                        "4-5",
                        "3-4",
                        "2-3",
                        "1-2",
                        "0-1",
                        "",
                      ],
                      textinfo: "text",
                      textposition: "inside",
                      marker: {
                        colors: [
                          "rgba(0, 105, 11, .5)",
                          "rgba(10, 120, 22, .5)",
                          "rgba(14, 127, 0, .5)",
                          "rgba(110, 154, 22, .5)",
                          "rgba(170, 202, 42, .5)",
                          "rgba(202, 209, 95, .5)",
                          "rgba(210, 206, 145, .5)",
                          "rgba(232, 226, 202, .5)",
                          "rgba(240, 230, 215, .5)",
                          "rgba(255, 255, 255, 0)",
                        ],
                      },
                      labels: [
                        "8-9",
                        "7-8",
                        "6-7",
                        "5-6",
                        "4-5",
                        "3-4",
                        "2-3",
                        "1-2",
                        "0-1",
                        "",
                      ],
                      hoverinfo: "label",
                      hole: 0.5,
                      type: "pie",
                      showlegend: false,
                    },
                  ]}
                  layout={{
                    shapes: [
                      {
                        type: "path",
                        path: path,
                        fillcolor: "850000",
                        line: {
                          color: "850000",
                        },
                      },
                    ],
                    title:
                      "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
                    height: 500,
                    width: 500,
                    xaxis: {
                      zeroline: false,
                      showticklabels: false,
                      showgrid: false,
                      range: [-1, 1],
                    },
                    yaxis: {
                      zeroline: false,
                      showticklabels: false,
                      showgrid: false,
                      range: [-1, 1],
                    },
                  }}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {this.state.data && (
                <Plot
                  data={[
                    {
                      type: "bubble",
                      y: currentSample.sample_values,
                      x: currentSample.otu_ids,
                      xaxis: "OTU ID",
                      mode: "markers",
                      text: currentSample.otu_labels,
                      marker: {
                        color: currentSample.otu_ids,
                        size: currentSample.sample_values,
                      },
                    },
                  ]}
                  layout={{
                    width: 900,
                    height: 500,
                    title: "Sample OTU bubble chart",
                  }}
                />
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
