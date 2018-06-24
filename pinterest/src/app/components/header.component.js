import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
import axios from 'axios'

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion.name}</span>
    );
}



class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: []
        };

        this.logout = this.logout.bind(this);
        this.navigateToCategories = this.navigateToCategories.bind(this);
    }

    logout(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.props.history.push("/login");
    }

    
    loadCategories(value) {
        var url = null;
        if(value){
            url = `http://localhost:4000/api/categories?name=${value}`;
        } else {
            url = `http://localhost:4000/api/categories`;
        }
        return axios.get(url, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            .then((response) => {
                return response.data;
            });
    };

    navigateToCategories(e) {
        e.preventDefault();
        this.props.history.push("/categories");
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.loadCategories(value).then((res) => {
            this.setState({
                suggestions: res
            });
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Search for a category",
            value,
            onChange: this.onChange
        };
        return (
            <div className="header">
                <header>
                    <nav className="navbar navbar-light container-fixed navbar-expand-sm">
                        <a className="navbar-brand">
                            <img alt="hey" src="https://seeklogo.com/images/P/pinterest-icon-logo-D4965B6748-seeklogo.com.png" />
                        </a>

                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue=
                                {(s) => {
                                    this.props.onSuggestionSelected(s);
                                    return getSuggestionValue(s);
                                }}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps} />
                        <div className="collapse navbar-collapse justify-content-end">
                            <ul className="navbar-nav">
                                <li className="nav-item" onClick={this.navigateToCategories}>
                                    <a className="nav-link">Categories</a>
                                </li>
                                <li className="nav-item" onClick={this.logout}>
                                    <a className="nav-link">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default Header