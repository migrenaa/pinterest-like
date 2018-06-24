import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
const languages = [
    {
        name: 'C',
        year: 1972
    },
    {
        name: 'C#',
        year: 2000
    },
    {
        name: 'C++',
        year: 1983
    },
    {
        name: 'Clojure',
        year: 2007
    },
    {
        name: 'Elm',
        year: 2012
    },
    {
        name: 'Go',
        year: 2009
    },
    {
        name: 'Haskell',
        year: 1990
    },
    {
        name: 'Java',
        year: 1995
    },
    {
        name: 'Javascript',
        year: 1995
    },
    {
        name: 'Perl',
        year: 1987
    },
    {
        name: 'PHP',
        year: 1995
    },
    {
        name: 'Python',
        year: 1991
    },
    {
        name: 'Ruby',
        year: 1995
    },
    {
        name: 'Scala',
        year: 2003
    }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return languages.filter(language => regex.test(language.name));
}

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
        localStorage.setItem('isLoggedIn', false);
        this.props.history.push("/login");
    }

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
        this.setState({
            suggestions: getSuggestions(value)
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