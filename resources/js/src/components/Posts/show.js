import React, { useEffect, useState} from "react"
import {PostsApi} from "../../services/Api";
import Alert from "../../services/Alert";
import PostModal from "../Modals/PostsModal";
import {Link} from "react-router-dom";
import {Button, Form, Modal} from "react-bootstrap";
import Errors from "../../services/Errors";

const ShowPosts = () => {

    const [posts, setPosts] = useState(null);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [id, setId] = useState(null);

    const api = new PostsApi();
    const alert = new Alert();

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    useEffect(() => {
        getAllPosts()
    }, []);


    function onDeletePost(id) {
        alert.askDelete()
            .then(r => {
                if (r.isConfirmed) {
                    try {
                        api.deletePost(id)
                            .then(r => {
                                getAllPosts()
                                alert.success({title: 'Post Deleted!', message: 'Post successfully deleted!',})
                            })
                    } catch (e) {
                        alert.error('Failed', 'Failed to delete post, Please refresh the page!')
                    }
                }
            })
    }

    async function getAllPosts() {
        try {
            await api.getAllPosts()
                .then(r => {
                    setPosts(r.data.data)
                })
        } catch (e) {
            this.alert.error('Failed', 'Failed to get posts, Please refresh the page!')
        }
    }

    function ShowModal(){
        return (
            <PostModal reloadPost={getAllPosts}
                       show={show}
                       title={title}
                       description={description}
                       onHide={handleClose}
                       onOpen={handleOpen}
                       id={id} />
        )
    }

    function loadPosts(){
        if (!posts) {
            return (
                <tr>
                    <td>Loading Posts</td>
                </tr>
            )
        }

        if (posts.length === 0) {
            return (
                <tr>
                    <td>There are no posts yet, add one!</td>
                </tr>
            )
        }

        /*Will render all the posts*/
        return posts.map(post => (
            <tr key={post.id}>
                <th scope={'row'}>{post.id}</th>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td className={'d-flex'}>
                    <button type="button"
                            className="btn btn-primary mr-2"
                            onClick={ event => {
                                setTitle(post.title)
                                setDescription(post.description)
                                setId(post.id)
                                handleOpen()
                            }}>
                        Edit
                    </button>
                    <button className={'btn btn-danger'} onClick={e => {
                        onDeletePost(post.id)
                    }}>Delete
                    </button>
                </td>
            </tr>
        ))
    }

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
                {loadPosts()}
                </tbody>
            </table>

            { show ? ShowModal() : null}
        </div>
    )
}

export default ShowPosts
