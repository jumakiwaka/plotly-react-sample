import React, { Component } from "react";
import Plot from "react-plotly.js";

export default class Bubble extends Component {
  render() {
    const { currentSample } = this.props;
    return (
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
    );
  }
}
