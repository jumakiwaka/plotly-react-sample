import React from "react";
import "./App.css";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import MetaInfo from "./MetaInfo";
import HorizontalBar from "./HorizontalBar";
import Gauge from "./Gauge";
import Bubble from "./Bubble";
import Spinner from "./Spinner";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      sampleId: 940,
      index: 0,
      path: "",
      level: 0,
    };
  }

  componentWillMount() {
    const url = "https://react-plotly-sample.herokuapp.com/data";
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

  onSelect = (value) => {
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
        <Header />
        {!this.state.data && <Spinner />}
        <Container>
          <Row>
            <Col md="3" lg="3">
              {this.state.data && (
                <MetaInfo
                  sampleId={sampleId}
                  currentMeta={currentMeta}
                  names={names}
                  onSelect={this.onSelect}
                />
              )}
            </Col>

            <Col md="4" lg="4">
              {this.state.data && (
                <HorizontalBar
                  currentSample={currentSample}
                  sampleValues={sampleValues}
                  otuIds={otuIds}
                />
              )}
            </Col>

            <Col md="5" lg="5">
              {this.state.data && <Gauge path={path} level={level} />}
            </Col>
          </Row>
          <Row>
            <Col>
              {this.state.data && <Bubble currentSample={currentSample} />}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
