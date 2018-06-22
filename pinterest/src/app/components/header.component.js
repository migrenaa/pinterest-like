import React, { Component } from 'react'

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: ''
        };

        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault();
        this.props.history.push("/login");
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="header">
                <header>
                    <nav className="navbar navbar-light container-fixed navbar-expand-sm">
                        <a className="navbar-brand">
                            <img alt="hey" src="https://seeklogo.com/images/P/pinterest-icon-logo-D4965B6748-seeklogo.com.png" />
                        </a>

                        <div id="searchbox" className="show">
                            <svg className="magnify" viewBox="0 0 48 48"><path d="M31 28h-1.59l-.55-.55C30.82 25.18 32 22.23 32 19c0-7.18-5.82-13-13-13S6 11.82 6 19s5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55V31l10 9.98L40.98 38 31 28zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" /></svg>
                            <svg id="searchbox-close" className="close" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                            <input id="search-input" type="text" placeholder="Search..." />
                        </div>
                        <div className="collapse navbar-collapse justify-content-end">
                            <ul className="navbar-nav">
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