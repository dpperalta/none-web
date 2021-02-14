import React from 'react';
// Router and routes
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { AdminRoutes } from './AdminRoutes';

// Components
import { Login } from '../components/auth/Login';
import { None } from '../components/none/dashboard/None';
import { MainUI } from '../components/ui/MainUI';
import { Formulario } from '../components/ui/Formulario';
import Dashboard  from '../components/none/dashboard/Dashboard';
export const AppRouter = () => {

    // TODO: Cambiar el valor por el que retorne el API
    const noneUser = 'User';

    // Datos de autenticación que vendrían del state, por ahora quemados
    const checking = false;
    const userID =  '1';//null;//'1';
    const roleName = 'User'; //null; //'User';

    // For show components and routes by role
    let isAdmin;
    let isSuperAdmin;
    roleName === 'Administrator' ? isAdmin = true : isAdmin = false;
    roleName === 'Super Administrator' ? isSuperAdmin = true : isSuperAdmin = false;
    
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoutes exact path="/login" component={ Login }  isAuthenticated={ !!userID }/>
                    <PrivateRoutes exact path="/demo" component={ None } isAuthenticated={ !!userID }/>
                    <PrivateRoutes exact path='/' component={ MainUI } isAuthenticated={ !!userID } />
                    <PrivateRoutes exact path='/form' component={ Formulario } isAuthenticated={ !!userID } />
                    <PrivateRoutes exact path='/dashboard' component={ Dashboard } isAuthenticated={ !!userID } />
                    {/* For Admin and Super Admin Routes */}
                    {/* <AdminRoutes exact path="/route"  /> */}
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}