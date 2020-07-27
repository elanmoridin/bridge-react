import React, { Component } from 'react'

let baseURL = 'https://bridge-app-api.herokuapp.com'

export default class Comment extends Component {
    state = {
        comments: [],
        message:''
    }
    componentDidMount(){
        this.getComments()
    }
    getComments = () => {
        fetch(baseURL + '/comments').then(res => {
            return res.json();
        }).then(data => {
        console.log('this is')
        console.log(data)
        this.setState({
            comments: data,
        });
        });
    }
    addComment = (newComment) => {
        const copyComments = [...this.state.comments];
        copyComments.push(newComment);
        this.setState({
        comments: copyComments
        });
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value   
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(baseURL)
        fetch(baseURL + '/comments', {
            method: 'POST',
            body: JSON.stringify({
                message: this.state.message
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            return res.json();
        }).then(data => {
            this.addComment(data);
            this.setState({
                message:''
            });
        });
    }
    render() {
        return (
        <div className='container'>
            
            <form onSubmit={ (evt) => this.handleSubmit(evt) }>
            <input type="text" id="message" placeholder="message"
                onChange={ (evt) => this.handleChange(evt) }
                value={ this.state.message }/>
            <input type="submit" value="submit" />
            </form>
            { this.state.comments.map(comment => {
                return (
                    <div  key={comment._id}>
                    <h3>{comment.message}></h3>
                    
                    </div>
                )
            })
        }
        </div>
        )
    }
    }
    
    