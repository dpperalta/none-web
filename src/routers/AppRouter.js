import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Router and routes
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { AdminRoutes } from './AdminRoutes';

// Components
import { Login } from '../components/auth/Login';
import { None } from '../components/none/dashboard/None';
import { Formulario } from '../components/ui/Formulario';
import { FormCreatePerson } from '../components/none/view/Person/FormCreatePerson';
import { FormCreateCollege } from '../components/none/view/College/FormCreateCollege';
import { FormCreateCourse } from '../components/none/view/Course/FormCreateCourse';
import { FormCreateSubject } from '../components/none/view/Subject/FormCreateSubject';
import { FormCreateContent } from '../components/none/view/Subject/Content/FormCreateContent';
import { FormCreateTask } from '../components/none/view/Subject/Task/FormCreateTask';
import { FormCreateEnrollmentStatus } from '../components/none/view/Enrollment/FormCreateEnrollmentStatus';
import { MainUI } from '../components/ui/MainUI';

import Dashboard  from '../components/none/dashboard/Dashboard';

import { startChecking } from '../redux/actions/auth';
import { ProgressBar } from '../components/ui/ProgressBar';

export const AppRouter = () => {

    // TODO: Cambiar el valor por el que retorne el API

    const dispatch = useDispatch();
    //const { checking, uid } = useSelector( state => state.auth);
    const { checking, user, role, authUser } = useSelector( state => state.auth );
    let userID;

    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch]);

    if(user){
        userID = user.userID;
    }

    // For show components and routes by role
    let isAdmin;
    let isSuperAdmin;
    role === 'Administrator' ? isAdmin = true : isAdmin = false;
    role === 'Super Administrator' ? isSuperAdmin = true : isSuperAdmin = false;
    
    console.log('admin:', isAdmin);
    console.log('super:',isSuperAdmin);

    if(checking){
        return (
            <ProgressBar />
        );
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoutes exact path="/login" component={ Login }  isAuthenticated={ !!userID }/>
                    <PrivateRoutes exact path="/demo" component={ None } isAuthenticated={ !!userID }/>
                    <PrivateRoutes exact path='/' component={ None } isAuthenticated={ !!userID } />
                    <PrivateRoutes exact path='/form' component={ Formulario } isAuthenticated={ !!userID } />
                    <PrivateRoutes exact path='/form/person' component={ FormCreatePerson } isAuthenticated={ !!userID } />
                    <PrivateRoutes exact path='/form/college' component={ FormCreateCollege } isAuthenticated={ !!userID } />
                    <PrivateRoutes exact path='/form/course' component={ FormCreateCourse } isAuthenticated={ !!userID } />
                    <PrivateRoutes exact path='/form/subject' component={ FormCreateSubject } isAuthenticated={ !!userID } />
                    <PrivateRoutes exact path='/form/content' component={ FormCreateContent } isAuthenticated={ !!userID } />
                    <PrivateRoutes exact path='/form/task' component={ FormCreateTask } isAuthenticated={ !!userID } />
                    <PrivateRoutes exact path='/form/enrollment-status' component={ FormCreateEnrollmentStatus } isAuthenticated={ !!userID } />
                    
                    
                    {/* For Admin and Super Admin Routes */}
                    {/* <AdminRoutes exact path="/route"  /> */}
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}