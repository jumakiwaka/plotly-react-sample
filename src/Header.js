import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";

export default class Header extends Component {
  render() {
    return (
      <Jumbotron fluid={true}>
        <h2 className="text-center">Belly Button Biodiversity Dashboard</h2>
        <p className="text-center">
          Use the interactive chart below to explore the dataset
        </p>
      </Jumbotron>
    );
  }
}
