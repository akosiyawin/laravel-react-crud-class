import React, {Component, useState,useEffect} from 'react';
import Alert from "../../services/Alert";
import {PostsApi} from "../../services/Api";
import {Button, Modal, Form} from "react-bootstrap";
import Errors from "../../services/Errors";


const PostsModal = (props) => {
    const alert = new Alert();
    const api = new PostsApi();

    /*I don't know why setState is not working if the value set is the same, this is to toggle the rendering*/
    const [errorCounter, setErrorCounter] = useState(0);
    const [errors,setErrors] = useState(new Errors());
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);

    async function onSaveEdit() {
        await alert.askUpdate()
            .then(r => {
                if (r.isConfirmed) {
                    errors.reset()
                    api.updatePost(props.id, {title: title, description: description})
                        .then(r => {
                            alert.success({message: r.data.message})
                            props.reloadPost()
                            props.onHide()
                        }).catch(e=>{
                            errors.setErrors(e)
                            setErrorCounter(errorCounter+1)
                    })
                }
            })
    }

    return(
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group controlId="validationCustom03" className={'mb-3'}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control name={'title'} className={errors.getKey('title') ? 'is-invalid' : ''} onChange={e => setTitle(e.target.value)} type="text"
                                      placeholder="City" value={title}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.getKey('title')}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom03">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name={'description'} className={errors.getKey('description') ? 'is-invalid' : ''} onChange={e => setDescription(e.target.value)} type="textarea"
                                      placeholder="City" value={description}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.getKey('description')}
                        </Form.Control.Feedback>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={e => {
                        props.onHide()
                    }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={e=> onSaveEdit()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
    )

}

export default PostsModal
