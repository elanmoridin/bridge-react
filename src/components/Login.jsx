import React, { Component } from 'react'
import logo from '../img/logo.png'
import logoM from '../img/logoM.png'
import logoMu from '../img/logoMu.png'
import logoB from '../img/logoB.png'
import logoV from '../img/logoV.png'

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
                <div className='headerFirst'>
                    <div className='first-page'>
                    </div>   
                </div>
                <div className='first-grid'>
                    <div className='grid'>
                        <img className='first-lo' src={logoM}></img>
                    <h5> looking for a good movie?<br></br>
                    check out our list of users's favorite movies 
                    Don't forget<br></br> to share you favorite movies with others 
                    </h5>
                    </div>
                    <div className='grid'>
                        <img className='first-lo' src={logoMu}></img>
                        <h5> listen to the latest song's preview <br></br>
                    search and share you favorite music with others
                    <br></br> explore the favorite lists
                    </h5>
                    </div>
                    <div className='grid'>
                        <img className='first-lo' src={logoB}></img>
                        <h5> Explore and read the summary of the next book you want to read
                    find and share your favorite books with community
                    </h5>
                    </div>
                    <div className='grid'>
                        <img className='first-lo' src={logoV}></img>
                        <h5> do you wan to know the latest NBA game result?<br></br>
                    check out our Hoops page and only search your team name
                   
                    </h5>
                    </div>
                </div>
                
            </div>
        </div>
        )
    }
}
