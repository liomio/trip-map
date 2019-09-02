import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { authenticated: null };
    }

    render() {
        if (this.state.authenticated) {
            return <Redirect to='/home' />;
        } else {
            return (
                <div>Please Login!</div>
            );
        }
    }
}

export default Login;
