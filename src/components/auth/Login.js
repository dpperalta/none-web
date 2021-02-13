import React from 'react';
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

    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            email: '',
            pass: ''
        },
        validationSchema: validationSchema
    })

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
                        Sign in
                    </Typography>
                    <form className={ classes.form } noValidate>
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
                            control={ <CheckBox  value="remember"  color="primary"/> }
                            label="Remember me"
                        />
                        <Button 
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={ classes.submit }
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    { 'Does not have an account? Sign Up' }
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