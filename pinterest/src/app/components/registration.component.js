import React, { Component } from 'react'
import axios from 'axios'

class RegistrationComponent extends Component {

    constructor(props) {
        super(props);

        // reset login status

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.navigateToSignIn = this.navigateToSignIn.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        var body = {
            email: this.state.email,
            name: this.state.firstName + ' ' + this.state.lastName,
            password: this.state.password
        };
        if (this.state) {
            axios.post('http://localhost:4000/api/users', body)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }

    navigateToSignIn(e) {
        e.preventDefault();
        this.props.history.push("/login");
    }

    render() {
        const { loggingIn } = this.props;
        const { firstName, lastName, email, password, submitted } = this.state;
        return (
            <div className="login-form-wrapper">
                <div className="form-sub">
                    <h2>Let's get you started</h2>
                    <form name="form" onSubmit={this.handleSubmit} autoComplete="off">
                        <div className={'form-group' + (submitted && !firstName ? ' has-error' : '')}>
                            <label htmlFor="firstName">First name</label>
                            <input type="text" className="form-control" name="firstName" value={firstName} onChange={this.handleChange} />
                            {submitted && !firstName &&
                                <div className="help-block">First name is required</div>
                            }
                        </div>

                        <div className={'form-group' + (submitted && !lastName ? ' has-error' : '')}>
                            <label htmlFor="lastName">Last name</label>
                            <input type="text" className="form-control" name="lastName" value={lastName} onChange={this.handleChange} />
                            {submitted && !lastName &&
                                <div className="help-block">Last name is required</div>
                            }
                        </div>

                        <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                            <label htmlFor="lastName">Email</label>
                            <input type="email" className="form-control" name="email" value={email} autoComplete="off" onChange={this.handleChange} />
                            {submitted && !email &&
                                <div className="help-block">Email is required</div>
                            }
                        </div>

                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" autoComplete="off" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group login-btn">
                            <p className="have-an-account">
                                <span>Have an account already?</span>
                                <br />
                                <a onClick={this.navigateToSignIn}>Sign in</a>
                            </p>
                            <button className="btn btn-primary">Sign up now</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default RegistrationComponent