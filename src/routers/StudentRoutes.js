import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

export const StudentRoutes = ({
    isStudentAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route 
            { ...rest } 
            component={ (props) => (
                (isStudentAuthenticated)
                ? (<Component { ...props } />)
                : ( <Redirect to='/' /> )
            )}
        />
    )
}

StudentRoutes.propTypes = {
    isStudentAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}