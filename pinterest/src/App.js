import React, { Component } from 'react'
import './App.css'
import PostComponent from "./app/components/post-list.component"
import RegistraitonComponent from "./app/components/registration.component"
import CategoriesListComponent from "./app/components/categories-list.component"
import LoginComponent from "./app/components/login.component"
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    withRouter,
    Lin
} from 'react-router-dom';

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
      {...rest}
      render={props =>
          fakeAuth.isAuthenticated ? (
              <Component {...props} />
          ) : (
              <Redirect
                  to={{
                      pathname: "/login",
                      state: { from: props.location }
                  }}
              />
          )
      }
  />
);



const Auth = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <Redirect
      to="/home"
    />
  ) : (
      <Redirect
        to="/login"
      />
    )
));


class App extends Component {

  render() {
    return (
      <Router>
        <div className="router-wrapper">
          {/* <Auth /> */}
          <Route path="/home" component={PostComponent} />
          <Route path="/register" component={RegistraitonComponent} />
          <Route path="/categories" component={CategoriesListComponent} />
          <Route path="/login" component={LoginComponent} />
        </div>
      </Router>
    )
  }
}



export default App