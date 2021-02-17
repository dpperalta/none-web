import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


// Yup and Formik Validation
import { useFormik } from 'formik';
import * as Yup from 'yup';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// Validation Schema
const validationSchema = Yup.object({
  firstName: Yup
      .string()
      .required('Campo obligatorio'),
  lastName: Yup
      .string()
      .required('Campo obligatorio'),
  email: Yup
      .string()
      .email('Correo electrónico incorrecto')
      .required('Campo obligatorio'),
  pass: Yup
      .string()
      .required('Campo obligatorio')
})

export const Formulario = () => {
  const classes = useStyles();

  //Formik initial values
  const formik = useFormik({
    initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        pass: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
})

  return (
    //<Container component="main" maxWidth="xs"> // SI se quiere el formulario pequeño
    <Container component="main" maxWidth="s">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingreso de datos
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={ formik.values.firstName }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
              {
                            formik.errors.firstName && formik.touched.firstName
                            ? ( 
                                <div className={ classes.alert }>
                                    <Alert severity="error">{ formik.errors.firstName }</Alert>
                                </div>
                             )
                            : null
              }
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={ formik.values.lastName }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
              {
                            formik.errors.lastName && formik.touched.lastName
                            ? ( 
                                <div className={ classes.alert }>
                                    <Alert severity="error">{ formik.errors.lastName }</Alert>
                                </div>
                             )
                            : null
              }
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            
          </Grid>
          <Grid item xs={12}>
          <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" value={formik.values.radio} onChange={ formik.handleChange}>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
              <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
            </RadioGroup>
          </FormControl>
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Guardar datos
          </Button>
          
        </form>
      </div>
      
    </Container>
  );
}
