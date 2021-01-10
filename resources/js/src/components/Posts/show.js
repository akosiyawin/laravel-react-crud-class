import React, {Component} from "react"
import {PostsApi} from "../../services/Api";
import Alert from "../../services/Alert";
import PostModal from "../Modals/PostsModal";
import {Link} from "react-router-dom";

export default class ShowPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: null,
            title: '',
            description: '',
            id: null,
            show: false,
        }
        this.api = new PostsApi()
        this.alert = new Alert()
        this.getAllPosts()

        /*Bindings*/
        this.onDeletePost = this.onDeletePost.bind(this)
        this.loadPosts = this.loadPosts.bind(this)
        this.getAllPosts = this.getAllPosts.bind(this)
    }

    async getAllPosts() {
        try {
            await this.api.getAllPosts()
                .then(r => {
                    this.setState({posts: r.data.data})
                })
        } catch (e) {
            this.alert.error('Failed', 'Failed to get posts, Please refresh the page!')
        }
    }

    onDeletePost(id) {
        this.alert.askDelete()
        .then(r => {
            if (r.isConfirmed) {
                try {
                    this.api.deletePost(id)
                    .then(r => {
                        this.getAllPosts()
                        this.alert.success({title: 'Post Deleted!', message: 'Post successfully deleted!',})
                    })
                } catch (e) {
                    this.alert.error('Failed', 'Failed to delete post, Please refresh the page!')
                }
            }
        })
    }


    loadPosts() {
        if (!this.state.posts) {
            return (
                <tr>
                    <td>Loading Posts</td>
                </tr>
            )
        }
        if (this.state.posts.length === 0) {
            return (
                <tr>
                    <td>There are no posts yet, add one!</td>
                </tr>
            )
        }

        return this.state.posts.map(post => (
            <tr key={post.id}>
                <th scope={'row'}>{post.id}</th>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td className={'d-flex'}>
                    <button type="button"
                            className="btn btn-primary mr-2"
                            data-toggle="modal"
                            data-target="#postEditModal"
                            onClick={ event => {
                                this.setState({title:post.title,description:post.description,id:post.id,show:true})
                            }}>
                        Edit
                    </button>
                    <button className={'btn btn-danger'} onClick={e => {
                        this.onDeletePost(post.id)
                    }}>Delete
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <div className={'container p-4'}>
                <Link className={'btn btn-primary btn-block mb-2'} to={'/posts/create'}>Create Post</Link>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Post ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.loadPosts()}
                    </tbody>
                </table>

                <PostModal reloadPost={this.getAllPosts}
                           show={this.state.show}
                           title={this.state.title}
                           description={this.state.description}
                           id={this.state.id} />
            </div>
        );
    }

}
