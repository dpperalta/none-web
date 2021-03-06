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
import CircularProgress from '@material-ui/core/CircularProgress';
// Yup and Formik Validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateCourse } from '../../../../redux/actions/course';

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
  courseName: Yup
    .string()
    .min(3, `Mínimo 3 caracteres`)
    .max(500, `Máximo 500 caracteres`)
    .required('Campo obligatorio'),
  description: Yup
    .string()
    .min(3, `Mínimo 3 caracteres`)
    .max(2000, `Máximo 2000 caracteres`)
    .required('Campo obligatorio')
})


//----------------------------------------------------------------COMPONENT-------------------------------------
export const FormCreateCourse = () => {
  
  const classes = useStyles();

  const dispatch = useDispatch();
  const { checking } = useSelector( state => state.course );

  //Formik initial values
  const formik = useFormik({
    initialValues: {
        courseName: '',
        description: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch ( startCreateCourse(values) );
      formik.handleReset();
    },
  });

  if(checking){
    return (
      <div className={ classes.spiner }>
        <Grid
          container
          spacing={ 0 }
          direction="column"
          alignItems="center"
          justify="center"
          style={ { minHeight: '100vh' } }
        >
          <Grid item xs={ 3 }>
            <CircularProgress />
          </Grid>
        </Grid>
      </div>
    )
  }

  return (
    <>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.form}>
          <Grid container direction="row" alignItems="center" justify="center">
            <Avatar id="avatar" className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar> 
            <Typography component="h1" variant="h5">
              Registro de Cursos
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
                  autoComplete="off"
                  name="courseName"
                  variant="outlined"
                  required
                  fullWidth
                  id="courseName"
                  label="Nombre del curso"
                  autoFocus
                  value={ formik.values.courseName }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                />
                {
                  formik.errors.courseName && formik.touched.courseName
                  ? ( 
                      <div className={ classes.alert }>
                          <Alert severity="error">{ formik.errors.courseName }</Alert>
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
                  autoComplete="off"
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
    </>
  );
  
}


