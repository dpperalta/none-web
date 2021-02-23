import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {items} from '../components/ui/MenuAdminList';
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
import { ListPerson } from '../components/none/view/Person/ListPerson';
import { FormCreateCollege } from '../components/none/view/College/FormCreateCollege';
import { FormCreateCourse } from '../components/none/view/Course/FormCreateCourse';
import Quiz  from '../components/none/view/Exam/Quiz/quiz';
import {ExamGenerator}  from '../components/none/view/Exam/ExamMaker/ExamGenerator';
import { FormCreateSubject } from '../components/none/view/Subject/FormCreateSubject';
import { FormCreateContent } from '../components/none/view/Subject/Content/FormCreateContent';
import { FormCreateTask } from '../components/none/view/Subject/Task/FormCreateTask';
import Editor from '../components/none/view/Subject/Task/Resolution/FormCreateTaskResolution';
import { FormCreateEnrollmentStatus } from '../components/none/view/Enrollment/FormCreateEnrollmentStatus';
import { ComponentsUI } from '../components/ui/ComponentsUI';

import Dashboard  from '../components/none/dashboard/Dashboard';
import { startChecking } from '../redux/actions/auth';
import { ProgressBar } from '../components/ui/ProgressBar';

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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { FormControlLabel} from '@material-ui/core';
import mentoredLogo from '../assets/images/logo-mentored-main.png';
import Sidebar from "../components/ui/Sidebar";
import { useHistory , Link, BrowserRouter} from 'react-router-dom';
import { startLogout } from '../redux/actions/auth';
import Swal from 'sweetalert2';
import SwitchDark from '@material-ui/core/Switch';



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
    }
}));


export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, user, role, authUser } = useSelector( state => state.auth );
    let userID;

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
    }, [dispatch]);

    if(user){
        userID = user.userID;
    }

    // For show components and routes by role
    let isAdmin;
    let isSuperAdmin;
    role === 'Administrator' ? isAdmin = true : isAdmin = false;
    role === 'Super Administrator' ? isSuperAdmin = true : isSuperAdmin = false;

    if(checking){
        return (
            <ProgressBar />
        );
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
                                            MentoRed Dashboard
                                        </Typography>
                                        <IconButton color="inherit">
                                            <Badge badgeContent={ 10 } color="secondary">
                                                <NotificationsIcon />
                                            </Badge>
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
                                                    <PrivateRoutes exact path='/' component={ ComponentsUI } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form' component={ Formulario } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/person' component={ FormCreatePerson } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/list/person' component={ ListPerson } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/college' component={ FormCreateCollege } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/course' component={ FormCreateCourse } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/exam' component={ Quiz } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/exam-generator' component={ ExamGenerator } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/subject' component={ FormCreateSubject } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/content' component={ FormCreateContent } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/task' component={ FormCreateTask } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/editor' component={ Editor } isAuthenticated={ !!userID } />
                                                    <PrivateRoutes exact path='/form/enrollment-status' component={ FormCreateEnrollmentStatus } isAuthenticated={ !!userID } />
                                                                
                                                    {/* For Admin and Super Admin Routes */}
                                                    {/* <AdminRoutes exact path="/route"  /> */}
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