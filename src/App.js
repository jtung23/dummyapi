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
    input: '',
    placeid:'ChIJG11cU-_Kj4AR3fVk1bLWsYQ',
    yelpid: 'a-slice-of-new-york-san-jose',
    json_results: '',
    api_results: []
  };

// the API search method
  APIlookup = (url, params, header) => {
    return axios.get(url, {
        params: params,
        headers: header
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

  runGoogleAPI = () => {
    // add URL here
    const url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json";

    const params = {
      // input api key here and edit/add params
      "key": "AIzaSyAI3ZBCPyqDGRp9S20p7xisIcIfJrHhSGI",
      "placeid":this.state.placeid
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

  runYelpAPI = () => {
    // add URL here
    const url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/a-slice-of-new-york-san-jose";

    const params = {};
    const headers = {
      'Authorization': 'Bearer XwQSC62cYjT-1Gd9r7EumiSbiOyTobUwVsMBWKI-1Ep38A0ea-vRJqg6sm_Ip_blapSeng_Z9wdkCiGYMUNn3Xq8eM3I8FUErqoxJuDp6r3xSKiDTQE2GzAbKAkuWnYx'   
    };

    this.APIlookup(url, params, headers)
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
    const { name, value } = ev.target;
    this.setState({
      [name]: value
    });
  };


// For submit button to use runAPI
  handleSubmit = (ev) => {
    ev.preventDefault();
    this.runAPI();
  };

//run google places api
  handleGooglePlacesSubmit = (ev) => {
    ev.preventDefault();
    this.runGoogleAPI();
  };

  handleYelpSubmit = (ev) => {
    ev.preventDefault();
    this.runYelpAPI();
  };

  ajaxCall = (ev) => {
    ev.preventDefault();
    console.log('ajax clicked');
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
          <div className="queries">
            <label htmlFor="input">
              NYT Query
            </label>
            <input
              name="input"
              onChange={(ev) => this.handleInput(ev)}
              value={this.state.input}
              type='text'
            />
            <button onClick={this.handleSubmit}>
              NYT Query
            </button>
          </div>
          <div className="queries">
            <label htmlFor="input">
              Enter Google Places ID
            </label>
            <input
              name="placeid"
              onChange={(ev) => this.handleInput(ev)}
              value={this.state.placeid}
              type='text'
            />
            <button onClick={this.handleGooglePlacesSubmit}>
              Google Places Query
            </button>
          </div>
          <div className="queries">
            <label htmlFor="input">
              Enter Yelp Business ID
            </label>
            <input
              name="yelpid"
              onChange={(ev) => this.handleInput(ev)}
              value={this.state.yelpid}
              type='text'
            />
            <button onClick={this.handleYelpSubmit}>
              Yelp Query
            </button>

          <div className="ajaxcall">
            <button onClick={this.ajaxCall}>
              Ajax call
            </button>
          </div>
          </div>
        </form>
        <div>
          {this.loadJSON()}
        </div>
      </div>
    );
  }
}

export default App;
