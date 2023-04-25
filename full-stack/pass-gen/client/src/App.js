import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { passwords: [] };

  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  }

  render() {
    const { passwords } = this.state;

    return (
      <div className="App">
        {passwords.length ? (
          <div>
            <h1>5 Passwords.</h1>
            <ul className="passwords">
              { /*Generally, don't use "index" as a key.*/ }
              { passwords.map((password, index) =>
                <li key={index}>
                  {password}
                </li>                
              )}
            </ul>
            <button
              className="more"
              onClick={this.getPasswords}
            >
              Get More
            </button>
          </div>          
        ) : (
          <div>
            <h1>No passwords :(</h1>
            <button
              className="more"
              onClick={this.getPasswords}
            >
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
