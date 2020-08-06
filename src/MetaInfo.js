import React, { Component } from "react";
import { Col, Dropdown, Jumbotron } from "react-bootstrap";

export default class MetaInfo extends Component {
  render() {
    const { sampleId, names, currentMeta } = this.props;
    return (
      <>
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
                <Dropdown.Item onSelect={() => this._onSelect(id)} key={index}>
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
    );
  }
}
