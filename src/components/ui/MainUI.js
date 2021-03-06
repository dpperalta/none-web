import React, { useState } from 'react';
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
import { FormControlLabel, Switch } from '@material-ui/core';
import {AppRouter} from '../../routers/AppRouter';
import mentoredLogo from '../../assets/images/logo-mentored-main.png';
import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import Sidebar from "./Sidebar";
import { Redirect, useHistory , Link, BrowserRouter, Route} from 'react-router-dom';

import PersonIcon from '@material-ui/icons/Person';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../redux/actions/auth';
import Swal from 'sweetalert2';
import { Person } from '@material-ui/icons';
import { None } from '../../components/none/dashboard/None';
import { FormCreatePerson } from '../../components/none/view/Person/FormCreatePerson';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            { 'Copyright © ' }
            
                PM^BS
            
            { ' ' + new Date().getFullYear() + '.' }
        </Typography>
    );
}


function onClick(e, item) {
    //window.alert(JSON.stringify(item, null, 2));
    //window.location.href = item.name;
  }
  
  const items = [
    { name: "/", label: "Inicio", Icon: HomeIcon },
    {
      name: "/list/college",
      label: "Colegios",
      Icon: ReceiptIcon,
      items: [
        { name: "/form/college", label: "Registrar nuevo", onClick },
        { name: "Editar", label: "Editar", onClick },
        { name: "listar", label: "Listar", onClick },
      ]
    },
    {
        name: "/list/college",
        label: "Personas",
        Icon: PersonIcon,
        items: [
          { name: "/form/person", label: "Profesores", Icon: PersonIcon, onClick },
          { name: "/form/person", label: "Alumnos", Icon: PersonIcon, onClick },
          { name: "/form/person", label: "Autoridades", Icon: PersonIcon, onClick },
          { name: "Editar", label: "Editar", onClick },
          { name: "listar", label: "Listar", onClick },
        ]
    },
    {
        name: "/list/college",
        label: "Cursos",
        Icon: ReceiptIcon,
        items: [
          { name: "/form/college", label: "Registrar nuevo", onClick },
          { name: "Editar", label: "Editar", onClick },
          { name: "listar", label: "Listar", onClick },
        ]
    },
    {
        name: "/list/college",
        label: "Materias",
        Icon: ReceiptIcon,
        items: [
          { name: "/form/college", label: "Registrar nuevo", onClick },
          { name: "Editar", label: "Editar", onClick },
          { name: "listar", label: "Listar", onClick },
        ]
    },
    {
        name: "/list/college",
        label: "Tareas",
        Icon: ReceiptIcon,
        items: [
          { name: "/form/college", label: "Registrar nuevo", onClick },
          { name: "Editar", label: "Editar", onClick },
          { name: "listar", label: "Listar", onClick },
        ]
    },
    {
        name: "/list/college",
        label: "Exámenes",
        Icon: ReceiptIcon,
        items: [
          { name: "/form/college", label: "Registrar nuevo", onClick },
          { name: "Editar", label: "Editar", onClick },
          { name: "listar", label: "Listar", onClick },
        ]
    },
    {
        name: "/list/college",
        label: "Foros",
        Icon: ReceiptIcon,
        items: [
          { name: "/form/college", label: "Registrar nuevo", onClick },
          { name: "Editar", label: "Editar", onClick },
          { name: "listar", label: "Listar", onClick },
        ]
    },
    {
        name: "/list/chats",
        label: "Cursos",
        Icon: ReceiptIcon,
        items: [
          { name: "/form/college", label: "Registrar nuevo", onClick },
          { name: "Editar", label: "Editar", onClick },
          { name: "listar", label: "Listar", onClick },
        ]
    },
    "divider",
    {
      name: "settings",
      label: "Settings",
      Icon: SettingsIcon,
      items: [
        { name: "profile", label: "Profile" },
        { name: "insurance", label: "Insurance", onClick },
        "divider",
        {
          name: "notifications",
          label: "Notifications",
          Icon: NotificationsIcon,
          items: [
            { name: "email", label: "Email", onClick },
            {
              name: "desktop",
              label: "Desktop",
              Icon: DesktopWindowsIcon,
              items: [
                { name: "schedule", label: "Schedule" },
                { name: "frequency", label: "Frequency" }
              ]
            },
            { name: "sms", label: "SMS" }
          ]
        }
      ]
    }
  ];
  

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

export const MainUI = () => {

    const dispatch = useDispatch();
    const { user } = useSelector( state => state.auth );

    const classes = useStyles();
    
    const [ open, setOpen ] = useState(true);
    
    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

    // For left menu
    const [ anchorEl, setAnchorEl ] = useState(null);
    const leftMenuOpen = Boolean( anchorEl );

    const handleLeftMenuClick = (event) => {
        setAnchorEl( event.currentTarget );
    }
    const handleLeftMenuClose = () => {
        setAnchorEl(null);
    }

    const fixedHeightPaper = clsx( classes.paper, classes.fixedHeight );
    const boolDark = JSON.parse( localStorage.getItem('dark')) || false;
    const [darkState, setDarkState] = useState(boolDark);
    const palletType = darkState ? "dark" : "light";
    const darkTheme = createMuiTheme({
        palette: {
            type: palletType,
        }
    });

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
        //dispatch( startLogout( user.userID ) );
    }

    return (
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
                    {/* <FormControlLabel
                        control={
                            <Switch checked={darkState}  color="default" onChange={handleThemeChange} />
                        }
                        label="Dark"
                    /> */}
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
                                        <Switch checked={darkState}  color="default" onChange={handleThemeChange} />
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
                            
                      
                        
                            <Route exact path="/" component={None} isAuthenticated={ true }/>
                            <Route path="/form/person" component={FormCreatePerson} isAuthenticated={ true } />
                           
                        
                       

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
        </div>
       
    );
}

