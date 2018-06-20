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
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    render() {
        return (
            <div className='button__container'>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="name" />
                    <input type="text" name="email" />
                    <input type="text" name="password" />
                    <input type="submit" value="Register"/>
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