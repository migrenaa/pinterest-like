import React, { Component } from 'react'
import '../../App.css'
import axios from 'axios'
import Header from "./header.component"

class PostComponent extends Component {

  constructor() {
    super()
    this.state = [{
      postId: 0,
      categoryId: 0,
      content: "",
      photoUrl: "",
      authorId: 0,
      created_at: "",
      updated_at: "",

    }]
  }
  render() {
    return (
      <div>
        <Header />
        <div className='button__container'>
          <p>{this.state.postId}</p>
          <p>{this.state.categoryId}</p>
          <p>{this.state.content}</p>
          <p>{this.state.photoUrl}</p>
          <p>{this.state.authorId}</p>
          <p>{this.state.created_at}</p>
          <p>{this.state.updated_at}</p>
        </div>
      </div>
    )
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/categories/1/posts')
      .then(response => {
        console.log(response);
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