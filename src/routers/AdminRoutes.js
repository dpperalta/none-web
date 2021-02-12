import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

export const AdminRoutes = ({
    isAdminAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route 
            { ...rest } 
            component={ (props) => (
                (isAdminAuthenticated)
                ? (<Component { ...props } />)
                : ( <Redirect to='/' /> )
            )}
        />
    )
}

AdminRoutes.propTypes = {
    isAdminAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}