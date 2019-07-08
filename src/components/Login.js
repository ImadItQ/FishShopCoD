import React from 'react';
import propTypes from 'prop-types';

const Login = (props) => (
    <nav className="login">
        <h2> Inventory Login </h2>
        <p> Login to gain access to the Inventory </p>
        <button className="github" onClick={() => props.authenticate('Github')}> Login To Github </button>
    </nav>
);
 Login.propTypes = {
     authenticate : propTypes.func.isRequired
 };
export default Login;