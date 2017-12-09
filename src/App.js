// Dummy API
// Things To Add:
// 1. API URL
// 2. API-key
// 3. Extra parameters

// {this.state.api_results ? (
//   this.state.api_results.map(item => {
// // **************************************
//   // input code here for proper mapping


//   }) 
//   ) : (
//   <h4> No Results </h4>
//   )
// }

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios"
import JSONPretty from 'react-json-pretty';
require('react-json-pretty/JSONPretty.adventure_time.styl');

class App extends Component {

  state = {
    input: "",
    json_results: '',
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
    const url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    const params = {
      // input api key here and edit/add params
      "api-key": "f0f27ef90a834d6989d3ed94b6714223",
      "q": this.state.input
    };

    this.APIlookup(url, params)
      .then(res => {
        console.log(res);
        // ****************************************
        // edit res to properly go into state for map() in the jsx
        this.setState({
          json_results: res
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

  loadJSON = () => {
    if (this.state.json_results) {
      return  <JSONPretty
                id="json-pretty"
                json={this.state.json_results}
                themeClassName="   custom-json-pretty">
              </JSONPretty>
    } else {
      return <h4> No Results Yet </h4>
    }
  }

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
        <button onClick={this.handleSubmit}>
        Submit Query
        </button>
        </form>
        <div>
          {this.loadJSON()}
        </div>
      </div>
    );
  }
}

export default App;
