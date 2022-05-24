import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
// import Reg from "./pages/Reg";
import axios from "axios";
import css from '../src/App.css'

// axios.defaults.baseURL = window.location.protocol + '//' + window.location.hostname + process.env.REACT_APP_HOST
axios.defaults.baseURL = process.env.REACT_APP_HOST
// console.log(window.location.protocol + '//' + window.location.hostname + process.env.REACT_APP_HOST)
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('cenro_auth_token')
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

function App() {
  return (
    <Router >
      <Fragment >
        <Routes basename="cenro/" >
          <Route exact path="cenro/" element={<Login />} />
          <Route path="cenro/home" element={<PrivateRoute ><Home /></PrivateRoute>} />
          {/* <Route path="cenro/register" element={<Reg />} /> */}
          <Route path="cenro/*" element={<NotFound />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
