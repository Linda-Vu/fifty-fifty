import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header.js';
import CreateRoom from './create/CreateRoom'
import Survey from './room/Survey'
import './App.css';
import Main from './Main.js';



class App extends Component {
  componentDidMount() {
    //this.props.createRoomId({roomName: 'tardiness', firstUserName: 'bob', secondUserName: 'Sally'});
  }

  render() {
    return (
        <BrowserRouter>  
            <div className="App">
                <Header />
                <Main />
            </div>
        </BrowserRouter>
    );
  }
}

export default connect (null, actions)(App);
