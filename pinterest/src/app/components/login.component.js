import React, { Component } from 'react'
import axios from 'axios'

class LoginComponent extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        return (
            <div className='button__container'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" name="email"  onChange={this.handleChange}/>
                    <input type="text" name="password"  onChange={this.handleChange} />
                    <input type="submit" value="Login"onSubmit={this.handleSubmit.bind(this)}/>
                </form>
            </div>
        )
    }

    handleSubmit(event) {
        var body = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(body);
        axios.post('http://localhost:4000/api/users/login', body)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            });
        event.preventDefault();
    }

    handleChange (evt) {
        this.setState({ [evt.target.name]: evt.target.value });
      }
}
export default LoginComponent