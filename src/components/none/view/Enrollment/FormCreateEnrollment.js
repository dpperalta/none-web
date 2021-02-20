//----------------------------------------------------------------IMPORTS-------------------------------------
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import SaveIcon from '@material-ui/icons/Save';
import BackspaceIcon from '@material-ui/icons/Backspace';
import AssigmentIcon from '@material-ui/icons/Assignment';
// Yup and Formik Validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

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
    studentID: Yup
    .number()
    .required('Seleccione una opción'),
    courseID: Yup
    .number()
    .required('Seleccione una opción')

})


//----------------------------------------------------------------COMPONENT-------------------------------------
export const FormCreateEnrollment = () => {
  const classes = useStyles();
 
  const [ object, setObject ] = useState({});

  //Formik initial values
  const formik = useFormik({
    initialValues: {
        studentID: '',
        courseID: ''
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
          Matriculación de estudiante
        </Typography>
        </Grid>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Grid container direction="row" alignContent="center" alignItems="center" justify="center"> 
              <Grid item><AssigmentIcon /></Grid>
              <Grid item>DATOS DE LA ASIGNACION: PERIODO ACADEMICO 2021-2022</Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                <FormControl variant="outlined" Style="width:100%" className={classes.formControl}>
                <InputLabel id="select-label">Curso</InputLabel>
                <Select
                  labelId="select-label"
                  id="courseID"
                  name="courseID"
                  required
                  fullWidth
                  value={formik.values.courseID}
                  onChange={formik.handleChange}
                  onBlur={ formik.handleBlur }
                  label="Estudiante"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                {
                            formik.errors.courseID && formik.touched.courseID
                            ? ( 
                                <div className={ classes.alert }>
                                    <Alert severity="error">{ formik.errors.courseID }</Alert>
                                </div>
                             )
                            : null
                }
              </FormControl>
                </Grid>               
            </Grid>
<br/>
            <Grid container spacing={1}>
            <Grid item xs={12}>
            <FormControl variant="outlined" Style="width:100%" className={classes.formControl}>
                <InputLabel id="select-label">Estudiante</InputLabel>
                <Select
                  labelId="select-label"
                  id="studentID"
                  name="studentID"
                  required
                  fullWidth
                  value={formik.values.studentID}
                  onChange={formik.handleChange}
                  onBlur={ formik.handleBlur }
                  label="Estudiante"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                {
                            formik.errors.studentID && formik.touched.studentID
                            ? ( 
                                <div className={ classes.alert }>
                                    <Alert severity="error">{ formik.errors.studentID }</Alert>
                                </div>
                             )
                            : null
                }
              </FormControl>

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


