import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import logoM from '../img/logoM.png'
import logoMu from '../img/logoMu.png'
import logoB from '../img/logoB.png'
import logoV from '../img/logoV.png'


export default class Welcome extends Component {
    render() {
        return (
            <div>
                <h1 className='user'>Welcome {this.props.username}</h1>
                <div className='logo'>
                    <div className='imgDiv'>
                    <Link  to='/movies'>
                        <img  src={logoM} alt=''/>  
                    </Link>    
                    </div>
                    <div className='imgDiv'>
                        <Link  to='/music'>
                            <img src={logoMu} alt=''/>  
                        </Link> 
                    </div>    
                    <div className='imgDiv'>
                    
                        <img src={logoB} alt=''/>  
                    </div>    
                    <div className='imgDiv'>
                        <img src={logoV} alt=''/>  
                    </div>       
                </div>
            </div>
        )
    }
}
