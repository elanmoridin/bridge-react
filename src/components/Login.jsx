import React, { Component } from 'react'
import logo from '../img/logo.png'

import validateCredentials from './Authenticator.jsx'




export default class Login extends Component {


    state = {
        LoginUsername: '',
        LoginPassword: '',
        NewUsername: '',
        NewPassword: '',
        email: '',
    }        

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

//    isValid(){
//        let {errors, isValid} = validateCredentials(this.state);
//        if(!isValid){
//            this.setState({errors})
//        }
//    }
//    onSubmit(event){
//        event.preventDefault()
//        if(this.isValid()){

//        }
//    }



    render() {
        return (
        <div>
            <div className='log-inPage'>
                <div className='log-in'>
                    <div>
                    <img src={logo} alt=''></img>
                    </div>
                    <div className='form'>
                        <form onSubmit={ (evt) => this.props.handleLogin(evt) } >
                            <input type='text' value={this.props.LoginUsername} id='LoginUsername' placeholder='Username' onChange={this.props.handleChange} ></input>
                            <input type='password' value={this.props.LoginPassword} id='LoginPassword' placeholder='Password' onChange={this.props.handleChange} ></input>
                            <input type='submit' value='Log-In' ></input>
                        </form>  
                        <form className='sign-up' onSubmit={ (evt) => this.props.handleSignUp(evt) } >
                        <h3> Not a user yet ?  </h3>
                        <input type='text' value={this.props.NewUsername} id='NewUsername' placeholder='Username' onChange={this.props.handleChange} ></input>
                        <input type='email' placeholder='Email' onChange={this.props.handleChange} value={this.props.email} id='email'></input>
                        <input type='password' placeholder='Password' onChange={this.props.handleChange} value={this.props.NewPassword} id='NewPassword'></input>
                        <input type='submit' value='Sign-Up'></input>
                    </form> 
                    </div>
                    
                </div>
                <div className="share">
                    
                </div>
            
                <div className="share">
                
                </div>
            </div>
        </div>
        )
    }
}
