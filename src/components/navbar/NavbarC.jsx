import React, { useState } from 'react';
import { logout } from '../../redux/reducers/auth';
import { useDispatch, useSelector } from 'react-redux';

const NavbarC = () => {

const dispatch = useDispatch()
const user = useSelector(state => state.authReducer.activeUser);

  const handleLogout = () => {
    dispatch(logout());
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container ">
        <div className="collapse d-flex justify-content-between navbar-collapse" id="navbarNav">
        <div>

        <h3 style={{color:'white',marginTop:"10px"}}>{`logged In as ${user.status} `}</h3>
        </div>
             <div>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
             </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarC;
