import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar(props) {
    return (
        <div className='navbar'>
            <Link className='nav-link' to='/movies'>Movies</Link>
            <Link className='nav-link' to='/music'>Music</Link>
            <Link className='nav-link' to='/lastdance'>Last Dance</Link>
            <Link className='nav-link' to='/books'>Books</Link>
            <Link onClick={()=> props.handleLogout()} className='nav-link' to='/'>Log-Out</Link>
        </div>
    )
}
