import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminItems } from '../components/ui/MenuAdminList';
import { collegeItems } from '../components/ui/MenuCollegeList';
import { teacherItems } from '../components/ui/MenuTeacherList';
import { studentItems } from '../components/ui/MenuStudentList';
import { parentItems } from '../components/ui/MenuParentList';

import Dashboard from '../components/none/dashboard/Dashboard';
import DashboardStudent  from '../components/none/dashStudent/index';
import DashboardTeacher  from '../components/none/dashTeacher/index';

// Router and routes
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { AdminRoutes } from './AdminRoutes';
import { TeacherRoutes } from './TeacherRoutes';

// Components
import { Login } from '../components/auth/Login';
import { Formulario } from '../components/ui/Formulario';
import { FormCreatePerson } from '../components/none/view/Person/FormCreatePerson';
import { ListPerson } from '../components/none/view/Person/ListPerson';
import { FormCreateCollege } from '../components/none/view/College/FormCreateCollege';
import { FormCreateCourse } from '../components/none/view/Course/FormCreateCourse';
import Quiz  from '../components/none/view/Exam/Quiz/quiz';
import {ExamGenerator}  from '../components/none/view/Exam/ExamMaker/ExamGenerator';
import { FormCreateSubject } from '../components/none/view/Subject/FormCreateSubject';
import { FormCreateContent } from '../components/none/view/Subject/Content/FormCreateContent';
import { FormCreateTask } from '../components/none/view/Subject/Task/FormCreateTask';
import { FormCreateExam } from '../components/none/view/Exam/FormCreateExam';
import Editor from '../components/none/view/Subject/Task/Resolution/FormCreateTaskResolution';
import { FormCreateEnrollmentStatus } from '../components/none/view/Enrollment/FormCreateEnrollmentStatus';
import { ComponentsUI } from '../components/ui/ComponentsUI';
import {TableIndividual} from '../components/ui/MaterialTables/TableIndividual';
import {TableGroups} from '../components/ui/MaterialTables/TableGroups';
import None  from '../components/none/dashboard/Dashboard';
import TareaIcon from '@material-ui/icons/Description';
import ExamenIcon from '@material-ui/icons/AssignmentTurnedIn';
import { startChecking } from '../redux/actions/auth';
import { ProgressBar } from '../components/ui/ProgressBar';
import { FormCreateAcademicPeriod } from '../components/none/view/AcademicPeriod/FormCreateAcademicPeriod';
import { ListCourse } from '../components/none/view/Course/ListCourse';
import { ListSubject } from '../components/none/view/Subject/ListSubject';
import { ListTask } from '../components/none/view/Subject/Task/ListTask';
import { ListExam } from '../components/none/view/Exam/ListExam';
import { ListTeacherSubject } from '../components/none/view/Subject/Teacher/ListTeacherSubject';

//Imports MainUI
import clsx from 'clsx';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon  from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import DarkModeIcon from '@material-ui/icons/Brightness4';
import AssignmentIcon from '@material-ui/icons/AssignmentSharp';
import ForoIcon from '@material-ui/icons/Forum';
import Chat2Icon from '@material-ui/icons/Sms';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { FormControlLabel} from '@material-ui/core';
import mentoredLogo from '../assets/images/logo-mentored-main.png';
import Sidebar from "../components/ui/Sidebar";
import { useHistory , Link, BrowserRouter} from 'react-router-dom';
import { startLogout } from '../redux/actions/auth';
import Swal from 'sweetalert2';
import SwitchDark from '@material-ui/core/Switch';
import { startGettingPerson } from '../redux/actions/person';
import { startGettingTeacher } from '../redux/actions/teacher';

//MainUI
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            { 'Copyright © ' }
            
                PM^BS
            
            { ' ' + new Date().getFullYear() + '.' }
        </Typography>
    );
}



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    toolbar: {
        paddingRight: 24
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${ drawerWidth }px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
    },
    menuButton: {
        marginRight: 36
    },
    menuButtonHidden: {
        display: 'none'
    },
    title: {
        flexGrow: 1
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowarp',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9)
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100%',
        overflow: 'auto'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    fixedHeight: {
        height: 240
    },
    link:{
        textDecoration: 'none',
        color: theme.palette.text.primary
    }
}));


function RandomNumber(userID,number){
    return (
        userID + number
        //Math.floor(Math.random() * 10)
    );
}
export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, user, role, authUser } = useSelector( state => state.auth );
    let userID;
    let person;
    let teacher;
    // TODO: student and parent information
    /*let student;
    let parent;*/

    const boolDark = JSON.parse( localStorage.getItem('dark')) || false;
    const [darkState, setDarkState] = useState(boolDark);
    const palletType = darkState ? "dark" : "light";
    const darkTheme = createMuiTheme({
        palette: {
            type: palletType,
        }
    });

    const classes = useStyles();
    const [ open, setOpen ] = useState(true);
    const [ anchorEl, setAnchorEl ] = useState(null);

    useEffect(() => {
        dispatch( startChecking() );
        if(authUser){
            dispatch( startGettingPerson( user.personID ) );
        }
    }, [dispatch, authUser]);

    if(user){
        userID = user.userID;
    }
    
    person = useSelector( state => state.person.authPerson );
    if(!person){
        person = { nombres: '' };
    }

    // For show components and routes by role
    let isAdmin;
    let isSuperAdmin;
    let isTeacher;
    role === 'Administrator' ? isAdmin = true : isAdmin = false;
    role === 'Super Administrator' ? isSuperAdmin = true : isSuperAdmin = false;
    role === 'Teacher' ? isTeacher = true : isTeacher = false;

    // Load especific information for users based in their role
    // Loading teacher's information
    useEffect(() => {
        if( isTeacher ){
            if(authUser){
                if(person.id){
                    console.log(person.id);
                    dispatch( startGettingTeacher( person.id ) );
                }
            }
        }
        // TODO: Loading student's information
        // TODO: Loading parent's information
    }, [isTeacher, person] );

    if(checking){
        return (
            <ProgressBar />
        );
    }

    // Switcher of sidemenu items
    let items;
    let DashboardBase = Dashboard;
    switch (role) {
        case 'Administrator':
        case 'Super Administrator':
            items = adminItems;
            DashboardBase = DashboardTeacher;
            break;
        case 'Teacher':
            items = teacherItems;
            DashboardBase = DashboardTeacher;
            break;
        case 'Operative':
            items = collegeItems;
            DashboardBase = Dashboard;
            break;
        case 'Student':
            items = studentItems;
            DashboardBase = DashboardStudent;
            break;
        case 'Parent':
                items = parentItems;
                DashboardBase = DashboardStudent;
                break;    
        default:
            items = adminItems;
    }

    //MainUI
    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

    // For left menu
    const leftMenuOpen = Boolean( anchorEl );

    const handleLeftMenuClick = (event) => {
        setAnchorEl( event.currentTarget );
    }
    const handleLeftMenuClose = () => {
        setAnchorEl(null);
    }

    const handleThemeChange = () => {
        setDarkState(!darkState);
        localStorage.setItem('dark', JSON.stringify(!darkState)); 
    };

    const handleLogout = () => {
        // Confirm Logout
        Swal.fire({
            title: '¿Está seguro que desea salir?',
            text: "La sesión se cerrará y deberá ingresar nuevamente su usuario y contraseña",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Dispatch logout
                dispatch( startLogout( user.userID ) );
            }
        });
    }
    
    // Load especific information for users
    // Loading teacher's information
    if( isTeacher ){
        //const teacher = useSelector()
    }
    // TODO: Loading student's information
    // TODO: Loading parent's information
    
    return (
        <>
          {
            !authUser
            ? (
                <>
                    <Router>
                        <Switch>
                            <PublicRoutes exact path="/login" component={ Login }  isAuthenticated={ !!userID }/>
                            <Redirect to="/login" />
                        </Switch>
                    </Router>
                </>
            )
            : (
                <div>
                    <BrowserRouter>
                        <ThemeProvider  theme={darkTheme}>
                            <div className={ classes.root }>
                                <CssBaseline />
                                <AppBar position="absolute" color="inherit" className={ clsx( classes.appBar, open && classes.appBarShift ) }>
                                    <Toolbar className={ classes.toolbar }>
                                        <IconButton
                                            edge="start"
                                            color="inherit"
                                            aria-label="open drawer"
                                            onClick={ handleDrawerOpen }
                                            className={ clsx( classes.menuButton, open && classes.menuButtonHidden ) }
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                        <Typography component="h1" variant="h6" color="inherit" noWrap className={ classes.title }>
                                            {/* MentoRed de { user.email } <small>{ role }</small> */}
                                            MentoRed de { person.nombres } <small>{ role }</small>
                                        </Typography>
                                        
                                        <IconButton color="inherit">
                                        <Link to="/list/task" className={classes.link}>
                                            <Badge badgeContent={ RandomNumber(userID,2) } color="primary">
                                                <TareaIcon />
                                            </Badge>
                                        </Link> 
                                        </IconButton>
                                        <IconButton color="inherit">
                                        <Link to="/list/exam" className={classes.link}>
                                            <Badge badgeContent={ RandomNumber(userID,1) } color="primary">
                                                <ExamenIcon />
                                            </Badge>
                                        </Link> 
                                        </IconButton>
                                        <IconButton color="inherit">
                                        <Link to="/list/todo" className={classes.link}>
                                            <Badge badgeContent={ RandomNumber(userID,4) } color="secondary">
                                                <NotificationsIcon />
                                            </Badge>
                                        </Link> 
                                        </IconButton>
                                        
                                        <IconButton color="inherit">
                                        <Link to="/list/inbox" className={classes.link}>
                                            <Badge badgeContent={ RandomNumber(userID,6) } color="secondary">
                                                <MailIcon />
                                            </Badge>
                                        </Link> 
                                        </IconButton>
                                        <IconButton color="inherit">
                                        <Link to="/list/chat" className={classes.link}>
                                            <Badge badgeContent={ RandomNumber(userID,7) } color="secondary">
                                                <Chat2Icon />
                                            </Badge>
                                        </Link> 
                                        </IconButton>
                                        &nbsp;
                                        <div
                                            style={{ display: 'flex', justifyContent: 'space-between' }}
                                        >
                                            <IconButton 
                                                aria-label="more"
                                                aria-controls="left-menu"
                                                aria-haspopup="true"
                                                onClick={ handleLeftMenuClick }
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                id="left-menu"
                                                anchorEl={ anchorEl }
                                                keepMounted
                                                open={ leftMenuOpen }
                                                onClick={ handleLeftMenuClose }
                                                PaperProps={{
                                                    style: {
                                                        maxHeight: 48 * 4.5,
                                                        width: '30ch',
                                                    },
                                                }}
                                            >
                                                <MenuItem>
                                                    <PersonIcon/> { user.email }
                                                </MenuItem>
                                                <Divider />
                                                <MenuItem>
                                                    <DarkModeIcon />
                                                    <FormControlLabel
                                                        control={
                                                            <SwitchDark checked={darkState}  color="default" onChange={handleThemeChange} />
                                                        }
                                                        label="Modo Oscuro"
                                                    />
                                                </MenuItem>
                                                <Divider />
                                                <MenuItem>
                                                    <SettingsIcon/> Configuraciones
                                                </MenuItem>
                                                <Divider />
                                                <MenuItem
                                                    onClick={ handleLogout }
                                                >
                                                    <ExitToAppIcon/> Cerrar Sesión
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                    </Toolbar>
                                </AppBar>
                                <Drawer
                                    variant="permanent"
                                    classes={{
                                        paper: clsx( classes.drawerPaper, !open && classes.drawerPaperClose )
                                    }}
                                    open={ open }
                                >
                                    <div className={ classes.toolbarIcon }>
                                        <IconButton
                                            onClick={ handleDrawerClose }
                                        >
                                            <img src={ mentoredLogo } alt="Mentored logo" width="175px" />
                                            <ChevronLeftIcon />
                                        </IconButton>
                                    </div>
                                    <Divider />
                                    <Sidebar items={items} />
                                </Drawer>
                                <main className={ classes.content }>
                                    <div className={ classes.appBarSpacer }></div>
                                    <Container maxWidth="lg" className={classes.container}>
                                        <Grid container spacing={ 3 }>
                                            <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
                                                
                                            <div>
                                                <Switch>
                                                    {/* <PublicRoutes exact path="/login" component={ Login }  isAuthenticated={ !!userID }/> */}
                                                    <PrivateRoutes exact path="/demo" component={ None } isAuthenticated={ !!userID }/>
                                                    <PrivateRoutes exact path="/dashboard" component={ DashboardStudent } isAuthenticated={ !!userID }/>
                                                    <PrivateRoutes exact path='/' component={ DashboardBase } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form' component={ Formulario } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/person' component={ FormCreatePerson } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/list/person' component={ ListPerson } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/college' component={ FormCreateCollege } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/course' component={ FormCreateCourse } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/list/course' component={ ListCourse } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/exam-solve' component={ Quiz } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/exam-generator' component={ ExamGenerator } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/subject' component={ FormCreateSubject } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/list/subject' component={ ListSubject } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/list/task' component={ ListTask } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/list/exam' component={ ListExam } isAuthenticated={ !!userID } />

                                                    <PrivateRoutes exact path='/form/content' component={ FormCreateContent } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/task' component={ FormCreateTask } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/exam' component={ FormCreateExam } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/editor' component={ Editor } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/academic-period' component={ FormCreateAcademicPeriod } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/enrollment-status' component={ FormCreateEnrollmentStatus } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/tabla1' component={ TableIndividual } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/tabla2' component={ TableGroups } isAuthenticated={ !!userID } />
                                                                
                                                    {/* For Admin and Super Admin Routes */}
                                                    {/* <AdminRoutes exact path="/route"  /> */}
                                                    {/* TEACHER ROUTES */}
                                                    <TeacherRoutes exact path='/teacher/list/subject' component={ ListTeacherSubject } isTeacherAuthenticated={ isTeacher } />
                                                    <Redirect to="/" />
                                                </Switch>
                                            </div>
                                        
                    
                                            </Grid>
                                        </Grid>
                                        <Box pt={ 4 }>
                                            <Copyright />
                                        </Box>
                                    </Container>
                                </main>
                            </div>
                        </ThemeProvider>
                    </BrowserRouter>
                </div>)
            }
        </>
    );
}