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
    withRouter
} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem('isLoggedIn') ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
);


const Auth = withRouter(({history}) => (
    localStorage.getItem('isLoggedIn') ? (
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
                    <Auth />
                    <PrivateRoute path="/home" component={PostComponent}/>
                    <PrivateRoute path="/categories" component={CategoriesListComponent}/>
                    <Route path="/login" component={LoginComponent}/>
                    <Route path="/register" component={RegistraitonComponent}/>
                </div>
            </Router>
        )
    }
}


export default App