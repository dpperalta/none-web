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
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { es } from "date-fns/locale";
import CircularProgress from '@material-ui/core/CircularProgress';

// Yup and Formik Validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateAcademicPeriod } from '../../../../redux/actions/academicPeriod';

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
  periodName: Yup
    .string()
    .min(5, `Mínimo 5 caracteres`)
    .max(150, `Máximo 150 caracteres`)
    .required('Campo obligatorio'),
  detail: Yup
    .string()
    .min(3, `Mínimo 3 caracteres`)
    .max(2000, `Máximo 2000 caracteres`)
    .required('Campo obligatorio'),
  startPeriod: Yup
    .date()
    .required('Campo obligatorio'),
  endPeriod: Yup
    .date()
    .required('Campo obligatorio')
});

//----------------------------------------------------------------COMPONENT-------------------------------------

export const FormCreateAcademicPeriod = () => {
  
  const classes = useStyles();

  const dispatch = useDispatch();
  const { checking } = useSelector( state => state.academicPeriod );
  
  const [ selectStartDate, setSelectStartDate ] = React.useState(new Date());
  const [ selectEndDate, setSelectEndDate ] = React.useState(new Date());

  const handleStartDate = (date) => {
    setSelectStartDate(date);
  };

  const handleEndDate = (date) => {
    setSelectEndDate(date);
  };
  
  //Formik initial values
  const formik = useFormik({
    initialValues: {
        periodName: '',
        detail: '',
        startPeriod: selectStartDate,
        endPeriod: selectEndDate,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let academicPeriod = {
        periodName: values.periodName,
        detail: values.detail,
        startPeriod: selectStartDate,
        endPeriod: selectEndDate
      }
      dispatch( startCreateAcademicPeriod(academicPeriod) );
      formik.handleReset();
      setSelectStartDate(new Date());
      selectEndDate(new Date());
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
              Registro de Periodo Académico
            </Typography>
          </Grid>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Grid container direction="row" alignContent="center" alignItems="center" justify="center"> 
              <Grid item><AssigmentIcon /></Grid>
              <Grid item>DATOS DEL PERIODO</Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                &nbsp;&nbsp;&nbsp;
                <MuiPickersUtilsProvider  locale={es}   utils={DateFnsUtils}>                  
                  <KeyboardDatePicker
                    margin="normal"
                    id="startPeriod"
                    Style="width:95%"
                    name="startPeriod"
                    label="Fecha de inicio"
                    format="yyyy-MM-dd"
                    required
                    value={ selectStartDate }
                    onChange={ handleStartDate }
                    onBlur={ formik.handleBlur }
                  />
                  {
                    formik.errors.startPeriod && formik.touched.startPeriod
                    ? ( 
                      <div className={ classes.alert }>
                        <Alert severity="error">{ formik.errors.startPeriod }</Alert>
                      </div>
                    )
                    : null
                  }
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                &nbsp;&nbsp;&nbsp;
                <MuiPickersUtilsProvider locale={es}  utils={DateFnsUtils}>                  
                  <KeyboardDatePicker
                  margin="normal"
                  id="endPeriod"
                  Style="width:95%"
                  name="endPeriod"
                  label="Fecha de finalización"
                  format="yyyy-MM-dd"
                  required
                  value={ selectEndDate }
                  onChange={ handleEndDate }
                  onBlur={ formik.handleBlur }
                  />
                  {
                    formik.errors.endPeriod && formik.touched.endPeriod
                    ? ( 
                      <div className={ classes.alert }>
                          <Alert severity="error">{ formik.errors.endPeriod }</Alert>
                      </div>
                    )
                    : null
                  }
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="periodName"
                  variant="outlined"
                  required
                  fullWidth
                  id="periodName"
                  label="Nombre del periodo académico"
                  autoFocus
                  value={ formik.values.periodName }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                />
                {
                  formik.errors.periodName && formik.touched.periodName
                  ? ( 
                    <div className={ classes.alert }>
                        <Alert severity="error">{ formik.errors.periodName }</Alert>
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
                  id="detail"
                  label="Detalles del periodo académico"
                  name="detail"
                  autoComplete="off"
                  value={ formik.values.detail }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                  className={classes.textField}
                />
                {
                  formik.errors.detail && formik.touched.detail
                  ? ( 
                    <div className={ classes.alert }>
                        <Alert severity="error">{ formik.errors.detail }</Alert>
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


