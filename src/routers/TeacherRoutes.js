import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

export const TeacherRoutes = ({
    isTeacherAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route 
            { ...rest } 
            component={ (props) => (
                (isTeacherAuthenticated)
                ? (<Component { ...props } />)
                : ( <Redirect to='/' /> )
            )}
        />
    )
}

TeacherRoutes.propTypes = {
    isAdminAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}