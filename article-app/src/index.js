import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CheckedDropDown from './components/checkedDropDown'
import "bootstrap/dist/css/bootstrap.css"

ReactDOM.render(
  <React.StrictMode>
    <CheckedDropDown url="https://article-search-api.herokuapp.com/api/countryList"/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
