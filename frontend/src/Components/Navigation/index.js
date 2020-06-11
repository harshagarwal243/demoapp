import { NavLink as Link , withRouter } from 'react-router-dom'
import React from 'react';
import { isAutheticated } from '../../Auth'
import './Navbar.css'
import { signout } from '../../Auth'

const Navigation = ({history }) => {
    return (
        <ul className="nav  bg-dark">
        { !isAutheticated()  &&  <li className="nav-item">
        <Link to="/signin" className="nav-link " >SignIn</Link>
        </li>}
        { !isAutheticated() && <li className="nav-item">
        <Link to="/signup" className="nav-link " >SignUp</Link>
        </li>}
        
        { isAutheticated() && <li className="nav-item">
            <Link to="/account" className="nav-link " >Account</Link>
        </li>}
        { isAutheticated() && <li className="nav-item" onClick={() => { signout(() => { history.push('/signin')})}}>
            <Link to="/signout" className="nav-link" >SignOut</Link>
        </li>}
       </ul>
    )
}





export default  withRouter(Navigation) ;