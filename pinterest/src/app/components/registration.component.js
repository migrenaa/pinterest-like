import React, { Component } from 'react'
import axios from 'axios'

class RegistrationComponent extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }
    render() {
        return (
            <div className='button__container'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" name="name"  onChange={this.handleChange.bind(this)} />
                    <input type="text" name="email"  onChange={this.handleChange.bind(this)}/>
                    <input type="text" name="password"  onChange={this.handleChange.bind(this)} />
                    <input type="submit" value="Register"onSubmit={this.handleSubmit.bind(this)}/>
                </form>
            </div>
        )
    }

    handleSubmit(event) {
        var body = {
            email: this.state.email,
            name: this.state.name,  
            password: this.state.password
        };
        axios.post('http://localhost:4000/api/users', body)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            });
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
}
export default RegistrationComponent