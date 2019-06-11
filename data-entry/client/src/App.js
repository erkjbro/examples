import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  // Initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  render() {
    return (
      <div>
        DROP THE DATA BASE!
      </div>
    )
  }
}

export default App;
