import React, { Component } from 'react';
import local from './local.config.json';

class App extends Component {
  state = {
    apiResponse: ""
  };

  callAPI() {
    fetch(local.config.api_config + "/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentDidMount() {
    this.callAPI();
  }

  //componentWillUnmount() {}

  render() {
    return (
      <div>
        <h1>Testing API Connection...</h1>
        <p><b>API RESPONSE =</b> {this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;
