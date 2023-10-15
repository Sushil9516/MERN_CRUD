import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.clear();
        navigate('/signup');
    }
    return (
        <div>
            <img src="https://cdn.dribbble.com/users/2948332/screenshots/5926397/media/97472cb011b51f566f0ab93c11d967d1.jpg"
             alt="" className="logo"
         />
            {auth ?
                <ul className="nav-ul">
                    <li><Link to='/'>Products</Link></li>
                    <li><Link to='/add'>Add Product</Link></li>
                    <li><Link to='/update'>Update Product</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link onClick={logOut} to='/logout'>Logout {JSON.parse(auth).name}</Link></li>
                </ul>
                :
                <ul className="nav-ul nav-right">
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/signup'>SignUp</Link></li>
                </ul>

            }
        </div>
    )
}
export default Nav;