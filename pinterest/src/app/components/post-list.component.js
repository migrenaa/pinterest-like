import React, {Component} from 'react'
import '../../App.css'
import axios from 'axios'
import Header from "./header.component"

class PostComponent extends Component {

    constructor(pops) {
        super(pops);
        this.state = [{
            postId: 0,
            categoryId: 0,
            content: "A summary will also be present. Usually two to three brief sentences about the content on the detail page.",
            photoUrl: "http://placeimg.com/400/200/animals",
            authorId: 0,
            created_at: "June 18th, 2015",
            updated_at: ""
        }]
    }

    onSuggestionSelected(value) {
        // TODO implement search
        console.log(value, 'value');
    }

    render() {
        const posts = this.state.map((post) =>
             <a className="card">
                <span className="card-header"
                      style={{backgroundImage: `url(${post.photoUrl})`}}>
                    {/*<span className="card-title">*/}
                    {/*<h3>This is a title for a card</h3>*/}
                    {/*</span>*/}
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
            <div>
                <Header {...this.props} onSuggestionSelected={this.onSuggestionSelected}/>
                <div className="cards-wrapper container">
                    <div className="cards">{posts}</div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/categories/1/posts')
            .then(response => {
                response.data.forEach(element => {
                    this.setState()
                });
                this.setState({
                    postId: response.data[0].postId,
                    categoryId: response.data[0].categoryId,
                    content: response.data[0].content,
                    photoUrl: response.data[0].photoUrl,
                    authorId: response.data[0].authorId,
                    created_at: response.data[0].created_at,
                    updated_at: response.data[0].updated_at,
                });
                console.log("state updated");
                console.log(this.state);
            });
    }

}
export default PostComponent