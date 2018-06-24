import React, {Component} from 'react'
import '../../App.css'
import axios from 'axios'
import Header from "./header.component";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Async from 'react-select';
import 'react-select/dist/react-select.css';


const getCategoriesAsync = (input) => { 
    return axios.get(`http://localhost:4000/api/categories`,{
        headers: { Authorization: localStorage.getItem("token") }
    })
        .then((response) => {
            return response.data;
        });
};

class PostComponent extends Component {

    constructor(pops) {
        super(pops);

        this.state = {
            posts: [
                {
                    postId: 0,
                    categoryId: 0,
                    content: "A summary will also be present. Usually two to three brief sentences about the content on the detail page.",
                    photoUrl: "http://placeimg.com/400/200/animals",
                    authorId: 0,
                    created_at: "June 18th, 2015",
                    updated_at: "",
                }
            ],
            post: {
                postId: 0,
                categories: [],
                content: "",
                photoUrl: "",
                authorId: 0,
                created_at: "",
                updated_at: "",
            },
            submitted: false,
            modal: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        const post = {...this.state.post};
        post[name] = value;
        this.setState({post: post});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { categories, content, photoUrl } = this.state.post;

        if (categories && content && photoUrl) {
            axios.post('http://localhost:4000/api/posts', this.state.post, 
            { headers : {Authorization: localStorage.getItem("token") } })
                .then(response => {

                    // TODO make sure the response is in json and its a post object.
                    this.setState({
                        posts: [...this.state.posts, response]
                    });
                    // on success reset post state
                    this.loadPosts();
                    this.setState({ post: {...{
                        postId: 0,
                        categories: [],
                        content: "",
                        photoUrl: "",
                        authorId: 0,
                        created_at: "",
                        updated_at: "",
                    }}});
                    this.toggle(e);
                })
                .catch(error => {
                    console.log(error);
                    // show some error that something went wrong.
                });


        }
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }



    onSuggestionSelected(value) {
        // TODO load posts here value is an object not a string
        console.log(value, 'value');
    }

    render() {
        const { submitted } = this.state;
        const { categories, content, photoUrl } = this.state.post;
        const posts = this.state.posts.map((post) =>
            <a className="card">
                <span className="card-header"
                      style={{backgroundImage: `url(${post.photoUrl})`}}>
                </span>
                <span className="card-summary">
                    {post.content}
                </span>
                <span className="card-meta">
                    Published: {post.created_at}
                </span>
            </a>
        );
        return (
            <div className="post-list-component">
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Creating a new post</ModalHeader>
                    <ModalBody>
                        <form name="form">
                            <div className={'form-group' + (submitted && !categories ? ' has-error' : '')}>
                                <label htmlFor="categories">Categories</label>
                                <Async
                                    name="categories"
                                    value={categories}
                                    multi={true}
                                    onChange={(e) =>{
                                        this.handleChange({
                                            target: {
                                                name: 'categories',
                                                value: e
                                            }
                                        });
                                    }}
                                    loadOptions={getCategoriesAsync}
                                />
                                {submitted && !categories &&
                                <div className="help-block">Categories is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !photoUrl ? ' has-error' : '')}>
                                <label htmlFor="content">Photo URL</label>
                                <input type="text" className="form-control" name="photoUrl" value={photoUrl} onChange={this.handleChange} />
                                {submitted && !photoUrl &&
                                <div className="help-block">Url is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !content ? ' has-error' : '')}>
                                <label htmlFor="content">Description</label>
                                <textarea type="text" className="form-control" name="content" value={content} onChange={this.handleChange} />
                                {submitted && !content &&
                                <div className="help-block">Description is required</div>
                                }
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" disabled={!categories.length || !photoUrl || !content} onClick={(e) => {
                            this.handleSubmit(e);
                        }}>Submit</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Header {...this.props} onSuggestionSelected={this.onSuggestionSelected}/>
                <div className="cards-wrapper container">
                    <Button color="danger" onClick={this.toggle}>New Post</Button>
                    <div className="cards">{posts}</div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts() {
        axios.get('http://localhost:4000/api/categories/1/posts',
        { headers: { Authorization: localStorage.getItem("token") } })
            .then(response => {
                this.setState({
                    posts: response.data
                });
            });
    }

}
export default PostComponent