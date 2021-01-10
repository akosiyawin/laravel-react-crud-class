import React, {Component} from 'react';
import Alert from "../../services/Alert";
import {PostsApi} from "../../services/Api";
import {Button, Modal, Form} from "react-bootstrap";
import Errors from "../../services/Errors";

export default class PostModal extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this)
        this.onSaveEdit = this.onSaveEdit.bind(this)
        this.state = {
            title: '',
            description: '',
            id: null,
            show: this.props.show,
            errors: new Errors()
        }
        this.alert = new Alert();
        this.api = new PostsApi();
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    /*If this component has been called to another component*/
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.id !== prevProps.id) {
            this.setState({
                title: this.props.title,
                description: this.props.description,
                id: this.props.id,
                show: this.props.show,
            })
            this.state.errors.reset()
        }
    }


    onSaveEdit() {
        this.alert.askUpdate()
        .then(r => {
            if (r.isConfirmed) {
                this.api.updatePost(this.state.id, {title: this.state.title, description: this.state.description})
                    .then(r => {
                        this.alert.success({message: r.data.message})
                        this.props.reloadPost()
                        this.setState({show: false})
                    }).catch(e=>{
                    this.state.errors.setErrors(e)
                    this.setState({errors: this.state.errors})
                })
            }
        })
    }

    render() {
        const errors = this.state.errors

        return (
            <Modal show={this.state.show} onHide={e => this.setState({show: false})}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group controlId="validationCustom03" className={'mb-3'}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control name={'title'} className={errors.getKey('title') ? 'is-invalid' : ''} onChange={this.onChange} type="text"
                                      placeholder="City" value={this.state.title}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.getKey('title')}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom03">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name={'description'}className={errors.getKey('description') ? 'is-invalid' : ''} onChange={this.onChange} type="textarea"
                                      placeholder="City" value={this.state.description}/>
                        <Form.Control.Feedback type="invalid">
                            {errors.getKey('description')}
                        </Form.Control.Feedback>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={e => {
                        this.setState({show: false})
                    }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.onSaveEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
