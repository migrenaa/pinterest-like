import React, { Component } from 'react'
import '../../App.css'
import axios from 'axios'
import { Link } from "react-router-dom";

class CategoriesListComponent extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            categories: [
            ]
        }
    }

    render() {
        console.log(this.state);
        const listItems = this.state.categories.map((category) =>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4" key={category.id}>
                <div className="thumbnail">
                    <div className="caption">
                        <div className='col-lg-12'>
                            <span className="glyphicon glyphicon-credit-card"></span>
                            <span className="glyphicon glyphicon-trash pull-right text-primary"></span>
                        </div>
                        <div className='col-lg-12 well well-add-card'>
                            <h4>{category.name}</h4>
                        </div>
                        <div className='col-lg-12'>
                            <p>{category.description}</p>
                        </div>
                        <button type="button" className="btn btn-primary btn-xs btn-update btn-add-card">Update</button>
                        <button type="button" className="btn btn-danger btn-xs btn-update btn-add-card"><Link to="/posts">Posts</Link></button>
                        <span className='glyphicon glyphicon-exclamation-sign text-danger pull-right icon-style'></span>
                    </div>
                </div>
            </div>
        );
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" name="name" onChange={this.handleChangeName.bind(this)} />
                    <input type="submit" value="Search" />
                </form>
                <div className="row">
                </div>
                <ul className="list-group">{listItems}</ul>
            </div>


        );
    }

    handleChangeName(event) {
        console.log(event);
        this.setState({ name: event.target.name });
    }

    handleSubmit(event) {
        console.log(this.state);
        axios.get(`http://localhost:4000/api/categories`)
            .then(response => {
                this.setState({
                    categories: response.data,
                    name: ""
                });
            });
        event.preventDefault();
    }
}
export default CategoriesListComponent