import React, {Component, useState,useEffect} from 'react';
import Alert from "../../services/Alert";
import {PostsApi} from "../../services/Api";
import {Button, Modal, Form} from "react-bootstrap";
import Errors from "../../services/Errors";


const PostsModal = (props) => {
    const alert = new Alert();
    const api = new PostsApi();

    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);

    const [errorTitle, seterrorTitle] = useState(props.title);
    const [errorDescription, seterrorDescription] = useState(props.description);

    const errors = new Errors();

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
                    })
                }
            })
    }

    console.log(1)

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

/*

export class PostModal extends Component {

    /!*If this component has been called to another component*!/
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (props.id !== prevProps.id) {
            setState({
                title: props.title,
                description: props.description,
                id: props.id,
                show: props.show,
            })
            errors.reset()
        }
    }




    render() {
        const errors = errors

        return (
            <Modal show={show} onHide={e => setState({show: false})}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group controlId="validationCustom03" className={'mb-3'}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control name={'title'} className={errors.getKey('title') ? 'is-invalid' : ''} onChange={onChange} type="text"
                                      placeholder="City" value={title}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.getKey('title')}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom03">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name={'description'}className={errors.getKey('description') ? 'is-invalid' : ''} onChange={onChange} type="textarea"
                                      placeholder="City" value={description}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.getKey('description')}
                        </Form.Control.Feedback>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={e => {
                        setState({show: false})
                    }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSaveEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
*/
