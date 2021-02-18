import React from 'react';
import { useDispatch } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

// Yup and Formik Validation
import { useFormik } from 'formik';
import * as Yup from 'yup';

// None images
import imageMentored from '../../assets/images/auth-background.jpg';
import mentoredLogo from '../../assets/images/logo-mentored-main.png';
import { startLogin } from '../../redux/actions/auth';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            { 'Copyright © ' }
            <Link color="inherit" href="http://www.pm-bs.org">
                PM^BS
            </Link>
            {' ' + new Date().getFullYear() } { '.' }
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${ imageMentored })`,
        backgrounRepeat: 'no-repeat',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    alert: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2)
        }
    },
    logoCenter: {
        padding: theme.spacing(2),
        textAlign: 'center'
    }
}));

// Validation Schema
const validationSchema = Yup.object({
    email: Yup
        .string()
        .email('Correo electrónico incorrecto')
        .required('Campo obligatorio'),
    pass: Yup
        .string()
        .required('Campo obligatorio')
})

export const Login = () => {

    const dispatch = useDispatch();

    const classes = useStyles();

    const getEmail = localStorage.getItem('email') || '';
    const getRemember = JSON.parse(localStorage.getItem('remember')) || false;

    const formik = useFormik({
        initialValues: {
            email: getEmail,
            pass: '',
            rememberMe: getRemember
        },
        validationSchema: validationSchema,
        onSubmit: ( values ) => {
            if(values.rememberMe === true) {
                localStorage.setItem('email', values.email);
                localStorage.setItem('remember', JSON.stringify(true));
            } else {
                localStorage.removeItem('email');
                localStorage.removeItem('remember');
            }
            const { email, pass } = values;
            dispatch( startLogin(email, pass) );
        }
    });

    return (
        <Grid container component="main" className={ classes.root }>
            <CssBaseline />
            <Grid item xs={ false } sm={ 4 } md={ 7 } className={ classes.image }> 
                {/* <Grid containerd direction="row" justify="center" alignItems="center">
                    <img  src={ mentoredLogo } className={ classes.logoCenter } />
                </Grid> */}
            </Grid>
            <Grid item xs={ 12 } sm={ 8 } md={ 5 } component={ Paper } elevation={ 6 } square>
                <div className={ classes.paper }>
                    <img src={ mentoredLogo } alt="Mentored logo" width="300px" />
                    <Avatar className={ classes.avatar }>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Autenticación
                    </Typography>
                    <form 
                        className={ classes.form } 
                        noValidate
                        onSubmit={ formik.handleSubmit }
                    >
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            label="eMail Address"
                            autoComplete="email"
                            autoFocus
                            value={ formik.values.email }
                            onChange={ formik.handleChange }
                            onBlur={ formik.handleBlur }
                        />
                        {
                            formik.errors.email && formik.touched.email
                            ? ( 
                                <div className={ classes.alert }>
                                    <Alert severity="error">{ formik.errors.email }</Alert>
                                </div>
                             )
                            : null
                        }
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="pass"
                            label="Password"
                            type="password"
                            id="pass"
                            autoComplete="current-password"
                            value={ formik.values.pass }
                            onChange={ formik.handleChange }
                            onBlur={ formik.handleBlur }
                        />
                        {
                            formik.errors.pass && formik.touched.pass
                            ? ( 
                                <div className={ classes.alert }>
                                    <Alert severity="error">{ formik.errors.pass }</Alert>
                                </div>
                             )
                            : null
                        }
                        <FormControlLabel 
                            control={ 
                                <CheckBox  
                                    name="rememberMe"
                                    type="checkbox"
                                    id="rememberMe"
                                    color="primary"
                                    checked={ formik.values.rememberMe }
                                    value={ formik.values.rememberMe }
                                    onChange={ formik.handleChange }
                                /> 
                            }
                            label="Recordarme en este equipo"
                        />
                        <Button 
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={ classes.submit }
                        >
                            Iniciar Sesión
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    ¿Olvidó su contraseña?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    { '¿No tiene cuenta? Registrarse' }
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={ 5 }>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}