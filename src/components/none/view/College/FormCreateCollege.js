//----------------------------------------------------------------IMPORTS-------------------------------------
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import SaveIcon from '@material-ui/icons/Save';
import BackspaceIcon from '@material-ui/icons/Backspace';
import HomeIcon from '@material-ui/icons/Home';
// Yup and Formik Validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

//----------------------------------------------------------------ESTILOS-------------------------------------
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

//----------------------------------------------------------------ESQUEMAS DE VALIDACION-------------------------------------
const validationSchema = Yup.object({
  collegeName: Yup
    .string()
    .min(5, `Mínimo 5 caracteres`)
    .max(500, `Máximo 500 caracteres`)
    .required('Campo obligatorio'),
  collegeShowName: Yup
      .string()
      .min(3, `Mínimo 3 caracteres`)
      .max(400, `Máximo 400 caracteres`)
      .required('Campo obligatorio'),
  description: Yup
  .string()
  .min(3, `Mínimo 3 caracteres`)
  .max(2000, `Máximo 2000 caracteres`)
  .required('Campo obligatorio')

})


//----------------------------------------------------------------COMPONENT-------------------------------------
export const FormCreateCollege = () => {
  const classes = useStyles();


  const [ object, setObject ] = useState({});

  //Formik initial values
  const formik = useFormik({
    initialValues: {
        collegeName: '',
        collegeShowName: '',
        description: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setObject(values);
      Swal.fire('Datos', JSON.stringify(values, null, 2), 'info');
      mostrarMensaje();
     alert(JSON.stringify(values, null, 2));
    },
    
});

  const mostrarMensaje = () => {
    setTimeout(() => {
      
      Swal.fire('Correcto', 'Datos guardados correctamente', 'success');
    }, 200);
    //Si la operación fue correcta, limpia el formulario
    let res = true;
    if (res === true)
    {
        formik.handleReset();
    }
    
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.form}>
        <Grid container direction="row" alignItems="center" justify="center">
        <Avatar id="avatar" className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> 
        <Typography component="h1" variant="h5">
          Registro de Colegios
        </Typography>
        </Grid>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Grid container direction="row" alignContent="center" alignItems="center" justify="center"> 
              <Grid item><HomeIcon /></Grid>
              <Grid item>DATOS BASICOS</Grid>
            </Grid>
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <TextField
                autoComplete="collegeName"
                name="collegeName"
                variant="outlined"
                required
                fullWidth
                id="collegeName"
                label="Nombre jurídico"
                autoFocus
                value={ formik.values.collegeName }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
              {
                            formik.errors.collegeName && formik.touched.collegeName
                            ? ( 
                                <div className={ classes.alert }>
                                    <Alert severity="error">{ formik.errors.collegeName }</Alert>
                                </div>
                             )
                            : null
              }
              </Grid>
        </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="collegeShowName"
                name="collegeShowName"
                variant="outlined"
                required
                fullWidth
                id="collegeShowName"
                label="Nombre visible"
                value={ formik.values.collegeShowName }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
              {
                            formik.errors.collegeShowName && formik.touched.collegeShowName
                            ? ( 
                                <div className={ classes.alert }>
                                    <Alert severity="error">{ formik.errors.collegeShowName }</Alert>
                                </div>
                             )
                            : null
              }
            </Grid>
            </Grid>
            <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                rows="5"
                id="description"
                label="Descripción"
                name="description"
                autoComplete="description"
                value={ formik.values.description }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
                className={classes.textField}
              />
              {
                            formik.errors.description && formik.touched.description
                            ? ( 
                                <div className={ classes.alert }>
                                    <Alert severity="error">{ formik.errors.description }</Alert>
                                </div>
                             )
                            : null
              }
            </Grid>
            </Grid>
         
                  
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        startIcon={<SaveIcon />}
                    >
                        Guardar datos
                    </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
                        <Button variant="outlined" Style="width:100%" color="primary" className={classes.submit} onClick={formik.handleReset} startIcon={<BackspaceIcon />}>
                            Limpiar Datos
                    </Button>
            </Grid>
          </Grid>         
          
        </form>
      </div>
      
    </Container>
  );
  
}
