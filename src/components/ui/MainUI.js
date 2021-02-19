import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { mainMenuList, secondMenuItems } from './MenuList';
import { ComponentsUI } from './ComponentsUI';
import mentoredLogo from '../../assets/images/logo-mentored-main.png';
import { Provider } from 'react-redux';
import { store } from '../../redux/store/store';
import {AppRouter} from '../../routers/AppRouter';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            { 'Copyright © ' }
            <Link color="inherit" href="http://www.pm-bs.org">
                PM^BS
            </Link>
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
        height: '100vh',
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

    const classes = useStyles();
    
    const [ open, setOpen ] = useState(true);
    
    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

    const fixedHeightPaper = clsx( classes.paper, classes.fixedHeight );

    return (
        <div className={ classes.root }>
            <CssBaseline />
            <AppBar position="absolute" className={ clsx( classes.appBar, open && classes.appBarShift ) }>
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
                        <Badge badgeContent={ 4 } color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
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
                <List>
                    { mainMenuList }
                </List>
                <Divider />
                <List>
                    { secondMenuItems }
                </List>
            </Drawer>
            <main className={ classes.content }>
                <div className={ classes.appBarSpacer }></div>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={ 3 }>
                        <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
                            
                        <Provider store={ store }>
                             <AppRouter />
                        </Provider>

                        </Grid>
                    </Grid>
                    <Box pt={ 4 }>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}
