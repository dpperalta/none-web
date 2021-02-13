import React from 'react';
// Router and routes
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { AdminRoutes } from './AdminRoutes';

// Components
import { Login } from '../components/auth/Login';
import { None } from '../components/none/dashboard/None';
<<<<<<< Updated upstream

=======
import { MainUI } from '../components/ui/MainUI';
import Dashboard  from '../components/none/dashboard/Dashboard';
>>>>>>> Stashed changes
export const AppRouter = () => {

    // TODO: Cambiar el valor por el que retorne el API
    const noneUser = 'User';

    // Datos de autenticación que vendrían del state, por ahora quemados
    const checking = false;
    const userID = '1';
    const roleName = 'User';

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
                    <PrivateRoutes exact path="/" component={ None } isAuthenticated={ !!userID }/>
<<<<<<< Updated upstream
=======
                    <PrivateRoutes exact path='/dashboard' component={ MainUI } isAuthenticated={ !!userID } />
                    <PrivateRoutes exact path='/dashboard2' component={ Dashboard } isAuthenticated={ !!userID } />
>>>>>>> Stashed changes
                    {/* For Admin and Super Admin Routes */}
                    {/* <AdminRoutes exact path="/route"  /> */}
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}