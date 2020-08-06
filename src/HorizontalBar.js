import React, { Component } from "react";
import Plot from "react-plotly.js";

export default class HorizontalBar extends Component {
  render() {
    const { currentSample, sampleValues, otuIds } = this.props;
    return (
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
    );
  }
}
