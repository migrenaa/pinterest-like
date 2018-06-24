import React, { Component } from 'react'
import axios from 'axios'

class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.register = this.register.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            axios.post('http://localhost:4000/api/users/login', {email: username, password: password})
            .then(response => {

            })
            .catch(error => {
                localStorage.setItem('isLoggedIn', true);
                this.props.history.push("/home");
            });
        }
    }

    register(e) {
        e.preventDefault();
        this.props.history.push("/register");
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="login-form-wrapper">
                <div className="form-sub">
                    <p>Please enter your email and password to sign in</p>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                            {submitted && !username &&
                            <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                            <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group login-btn">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>

                    <div className="hr"></div>

                    <div className="sign-up">
                        <h3>Hello, are you new?</h3>
                        <button className="btn btn-secondary sign-up-button" onClick={this.register}>
                            Sign up now
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent