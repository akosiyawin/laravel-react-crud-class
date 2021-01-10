import React,{Component} from "react";
import {PostsApi as Api} from "../../services/Api";
import Errors from "../../services/Errors";

import { withRouter } from 'react-router-dom'
import Alert from "../../services/Alert";

class ShowCreatePosts extends Component{

    constructor(props) {
        super(props);
        this.api = new Api();
        this.state = {
            title: '',
            description: '',
            errors: new Errors(),
            alert: new Alert()
        }
        this.onChange = this.onChange.bind(this); /*We want to tell that the 'this' we are referring is this class*/
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value})
    }

    async onSubmit(e){
        e.preventDefault()
        this.state.errors.reset()
        try {
            await this.api.createPost({title: this.state.title, description: this.state.description})
            this.state.alert.success({message: 'Post created!'})
            .then(r=>{
                this.props.history.push('/posts')
            })
        }catch (err){
            this.state.errors.setErrors(err)
            this.setState({errors: this.state.errors})
        }
    }

    render() {
        const errors = this.state.errors
        return (
           <div className={'container mt-5'}>
               <h3 className={'display-5 mb-3'}>Create A Post</h3>
               <form className={"form-group"} onSubmit={this.onSubmit}>
                   <div className="input-group mb-3">
                       <input type="text"
                              onChange={this.onChange} value={this.state.title}
                              name={'title'}
                              className={`form-control ${errors.getKey('title') ? 'is-invalid' : 'is-valid'}`} />
                       {errors.getKey('title') ? <div className={'invalid-feedback'}>{errors.getKey('title')}</div>: ''}
                   </div>

                   <div className="input-group mb-3">
                       <input   type="text"
                                onChange={this.onChange} value={this.state.description}
                                name={'description'}
                                className={`form-control ${errors.getKey('description') ? 'is-invalid' : 'is-valid'}`} />
                       {errors.getKey('description') ? <div className={'invalid-feedback'}>{errors.getKey('description')}</div>: ''}
                   </div>
                   <button className={'btn btn-primary'} type={"submit"}>Submit</button>
               </form>
           </div>
        );
    }

}

/*This way we can bind the useHistory with our component*/
export default withRouter(ShowCreatePosts)


