import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PostComponent from "./app/components/post-list.component"
import RegistraitonComponent from "./app/components/registration.component"
import CategoriesListComponent from "./app/components/categories-list.component"

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <ul className="main-menu">
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/auth">Registration</Link></li>
            <li><Link to="/categories">Categories</Link></li>
          </ul>
          <hr />
          <Route path="/posts" component={PostComponent} />
          <Route path="/auth" component={RegistraitonComponent} />
          <Route path="/categories" component={CategoriesListComponent} />
        </div>
      </Router>
    )
  }
}
export default App