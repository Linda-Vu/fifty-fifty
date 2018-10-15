import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './header/Header';
import './App.css';
import Main from './Main.js';
import 'typeface-pacifico';

class App extends Component {
  componentDidMount() {
    //this.props.createRoomId({roomName: 'tardiness', firstUserName: 'bob', secondUserName: 'Sally'});
  }

  //BrowserRouter renders header as well as Main.js
  //see Main.js file for the <switch> routes 
  render() {
    return (
        <BrowserRouter>  
            <div className="App container">
            <div className="row">
                <Header />
                <Main />
            </div>
            </div>
        </BrowserRouter>
    );
  }
}

export default connect (null, actions)(App);
