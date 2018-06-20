import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PostComponent from "./app/components/post-list.component"
import RegistraitonComponent from "./app/components/registration.component"

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <ul className="main-menu">
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/auth">Registration</Link></li>
          </ul>
          <hr />
          <Route path="/posts" component={PostComponent} />
          <Route path="/auth" component={RegistraitonComponent} />
        </div>
      </Router>
    )
  }
}
export default App