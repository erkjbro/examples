import React, { Component } from 'react';
import local from './local.config.json';

class App extends Component {
  state = {
    apiResponse: ""
  };

  callAPI() {
    fetch(local.config.api_config + "/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  // Go to API and check testDB route for a response
  callDB() {
    fetch("http://localhost:9000/testDB")
      .then(res => res.text())
      .then(res => this.setState({ dbResponse: res }))
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
    this.callDB();
  }

  //componentWillUnmount() {}

  render() {
    return (
      <div>
        <h1>Testing API Connection...</h1>
        <p><b>API RESPONSE =</b> {this.state.apiResponse}</p>
        <p><b>DB RESPONE =</b> {this.state.dbResponse}</p>
      </div>
    );
  }
}

export default App;
