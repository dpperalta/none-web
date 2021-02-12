import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

export const AdminRoutes = ({
    isSuperadminAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route 
            { ...rest } 
            component={ (props) => (
                (isSuperadminAuthenticated)
                ? (<Component { ...props } />)
                : ( <Redirect to='/' /> )
            )}
        />
    )
}

AdminRoutes.propTypes = {
    isSuperadminAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}