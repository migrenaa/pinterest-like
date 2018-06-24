import React, { Component } from 'react'
import '../../App.css'
import axios from 'axios'
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CategoriesListComponent extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            categories: [],
            category: {
                name: "",
                description: ""
            },
            submitted: false,
            modal: false
        }

        this.logout = this.logout.bind(this);
        this.navigateToPosts = this.navigateToPosts.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    logout(e) {
        e.preventDefault();
        localStorage.setItem('isLoggedIn', false);
        this.props.history.push("/login");
    }

    navigateToPosts(e) {
        e.preventDefault();
        this.props.history.push("/home");
    }


    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { name, description } = this.state.category;

        if (name) {
            axios.post('http://localhost:4000/api/categories', this.state.category,
            { headers: { Authorization: localStorage.getItem("token") } })
                .then(response => {

                    // TODO make sure the response is in json and its a post object.
                    this.setState({
                        categories: [...this.state.categories, response]
                    });
                    // on success reset post state
                    this.loadPosts();
                    this.setState({ category: {...{
                        name: "",
                        description: ""
                    }}});
                    this.toggle(e);
                })
                .catch(error => {
                    console.log(error);
                    // show some error that something went wrong.
                });


        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        const category = {...this.state.category};
        category[name] = value;
        this.setState({category: category});
    }

    componentDidMount() {
        this.loadCategories();
    }

    loadCategories() {
        axios.get('http://localhost:4000/api/categories',
        { headers: { Authorization: localStorage.getItem("token") } })
            .then(response => {
                console.log(response.data);
                this.setState({
                    categories: response.data
                });
            });
    }


    render() {
        const { submitted } = this.state;
        const { name, description } = this.state.category;
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
                        {/* <button type="button" className="btn btn-primary btn-xs btn-update btn-add-card">Update</button>
                        <button type="button" className="btn btn-danger btn-xs btn-update btn-add-card"><Link to="/posts">Posts</Link></button> */}
                        <span className='glyphicon glyphicon-exclamation-sign text-danger pull-right icon-style'></span>
                    </div>
                </div>
            </div>
        );
        return (
            <div className="post-list-component">
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Creating a new post</ModalHeader>
                    <ModalBody>
                        <form name="form">
                            <div className={'form-group' + (submitted && !name ? ' has-error' : '')}>
                                <label htmlFor="content">Name</label>
                                <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange} />
                                {submitted && !name &&
                                <div className="help-block">Name is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !description ? ' has-error' : '')}>
                                <label htmlFor="content">Description</label>
                                <textarea type="text" className="form-control" name="description" value={description} onChange={this.handleChange} />
                                {submitted && !description &&
                                <div className="help-block">Description is required</div>
                                }
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" disabled={!description || !name} onClick={(e) => {
                            this.handleSubmit(e);
                        }}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <div className="header">
                    <header>
                        <nav className="navbar navbar-light container-fixed navbar-expand-sm">
                            <a className="navbar-brand">
                                <img alt="hey" src="https://seeklogo.com/images/P/pinterest-icon-logo-D4965B6748-seeklogo.com.png" />
                            </a>
                            <div className="collapse navbar-collapse justify-content-end">
                                <ul className="navbar-nav">
                                    <li className="nav-item" onClick={this.navigateToPosts}>
                                        <a className="nav-link">Posts</a>
                                    </li>
                                    <li className="nav-item" onClick={this.logout}>
                                        <a className="nav-link">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>
                </div>

                <div className="cards-wrapper container">
                    <Button color="danger" onClick={this.toggle}>New Category</Button>
                    <div className="cards">{listItems}</div>
                </div>
            </div>
        );
    }
}
export default CategoriesListComponent