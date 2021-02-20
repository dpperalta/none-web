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
import AssigmentIcon from '@material-ui/icons/Assignment';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// Yup and Formik Validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { FormControl, IconButton, InputLabel, MenuItem, Select } from '@material-ui/core';

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
  inputHidden: {
    display: 'none',
  },
}));

//----------------------------------------------------------------ESQUEMAS DE VALIDACION-------------------------------------
const validationSchema = Yup.object({
  resourceName: Yup
    .string()
    .min(5, `Mínimo 5 caracteres`)
    .max(250, `Máximo 250 caracteres`)
    .required('Campo obligatorio'),
  resourceDetail: Yup
  .string()
  .min(3, `Mínimo 3 caracteres`)
  .max(500, `Máximo 500 caracteres`)
  .required('Campo obligatorio'),
  resourceType: Yup
  .string()
  .required('Seleccione una opción'),
  url: Yup
    .string()
    .min(5, `Mínimo 5 caracteres`)
    .max(250, `Máximo 250 caracteres`)
    .required('Campo obligatorio'),


})


//----------------------------------------------------------------COMPONENT-------------------------------------
export const FormCreateTaskResolutionResource = () => {
  const classes = useStyles();


  const [ object, setObject ] = useState({});

  //Formik initial values
  const formik = useFormik({
    initialValues: {
        resourceName: '',
        resourceDetail: '',
        resourceType: '',
        url: ''
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
          Archivo adjunto de su tarea
        </Typography>
        </Grid>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Grid container direction="row" alignContent="center" alignItems="center" justify="center"> 
              <Grid item><AssigmentIcon /></Grid>
              <Grid item>DATOS DEL RECURSO</Grid>
            </Grid>
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <TextField
                autoComplete="resourceName"
                name="resourceName"
                variant="outlined"
                required
                fullWidth
                id="resourceName"
                label="Nombre del recurso"
                autoFocus
                value={ formik.values.resourceName }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
              {
                            formik.errors.resourceName && formik.touched.resourceName
                            ? ( 
                                <div className={ classes.alert }>
                                    <Alert severity="error">{ formik.errors.resourceName }</Alert>
                                </div>
                             )
                            : null
              }
              </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <FormControl variant="outlined" Style="width:100%" className={classes.formControl}>
                <InputLabel id="select-label">Tipo de recurso</InputLabel>
                <Select
                  labelId="select-label"
                  id="resourceType"
                  name="resourceType"
                  required
                  fullWidth
                  value={formik.values.resourceType}
                  onChange={formik.handleChange}
                  onBlur={ formik.handleBlur }
                  label="Tipo de recurso"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Documento PDF</MenuItem>
                  <MenuItem value={2}>Documento Word</MenuItem>
                  <MenuItem value={3}>Sitio Web</MenuItem>
                  <MenuItem value={4}>Artículo web</MenuItem>
		  <MenuItem value={5}>URL con video</MenuItem>
                </Select>
                {
                            formik.errors.resourceType && formik.touched.resourceType
                            ? ( 
                                <div className={ classes.alert }>
                                    <Alert severity="error">{ formik.errors.resourceType }</Alert>
                                </div>
                             )
                            : null
                }
              </FormControl>
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
                id="resourceDetail"
                label="Descripción"
                name="resourceDetail"
                autoComplete="resourceDetail"
                value={ formik.values.resourceDetail }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
                className={classes.textField}
              />
              {
                            formik.errors.resourceDetail && formik.touched.resourceDetail
                            ? ( 
                                <div className={ classes.alert }>
                                    <Alert severity="error">{ formik.errors.resourceDetail }</Alert>
                                </div>
                             )
                            : null
              }
            </Grid>
            </Grid>
            <Grid container spacing={2}>
        <Grid item xs={12}>
        <TextField
                autoComplete="url"
                name="url"
                variant="outlined"
                required
                fullWidth
                id="url"
                label="URL del recurso"
                autoFocus
                value={ formik.values.url }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
              {
                            formik.errors.url && formik.touched.url
                            ? ( 
                                <div className={ classes.alert }>
                                    <Alert severity="error">{ formik.errors.url }</Alert>
                                </div>
                             )
                            : null
              }
              </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
           
                <input accept="image/*" className={classes.inputHidden} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture" component="span" Style="font-size:medium">
                    <CloudUploadIcon />&nbsp;Cargar archivo adjunto
                  </IconButton> 
                </label>

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


