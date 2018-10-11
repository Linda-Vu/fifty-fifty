import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App'
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers/roomIdReducer';
import axios from 'axios';

window.axios = axios;
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));


ReactDOM.render((
   <Provider store={store}>
    <App />
   </Provider> 
), document.getElementById('root'));