import React, { useContext } from 'react';
import { UserContext } from '../components/contexts/UseContext';
import Login from '../components/Login';

function PrivateRoutes(props) {
    console.log(props);
    const { user } = useContext(UserContext);
    if (user && !user.auth) {
        return (
            <>
                <Login />
            </>
        );
    }

    return (
        <>
            {props.children}
        </>
    );
}

export default PrivateRoutes;