// Dummy API
// Things To Add:
// 1. API URL
// 2. API-key
// 3. Extra parameters
// 4. 


import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios"
class App extends Component {

  state = {
    input: "",
    api_results: []
  };

// the API search method
  APIlookup = (url, params) => {
    return axios.get(url, {
        params: params 
      }
    )
  };
  
  // to run APIlookup with the appropriate params
  runAPI = () => {
    // add URL here
    const url = "";

    const params = {
      // input api key here
      "api-key": "",
      "query": this.state.input
    };

    this.APIlookup(url, params)
      .then(res => {
        console.log(res);
        // ****************************************
        // edit res to properly go into state for map() in the jsx
        this.setState({
          api_results: res
        })
      })
      .catch(err => console.log(err))
  };

// handling query input field
  handleInput = (ev) => {
    this.setState({
      input: ev.target.value
    })
  };

// For submit button to use runAPI
  handleSubmit = (ev) => {
    ev.preventDefault();
    this.runAPI();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <form>
        <label htmlFor="input">
          Query
        </label>
        <input
          name="input"
          onChange={(ev) => this.handleInput(ev)}
          value={this.state.input}
          type='text'
        />
        <button
          onClick={this.handleSubmit}
        >
        Submit Query
        </button>
        </form>
        <p className="App-intro">
          {this.state.api_results.map(item => {
          // **************************************
            // input code here for proper mapping


          })}
        </p>
      </div>
    );
  }
}

export default App;
