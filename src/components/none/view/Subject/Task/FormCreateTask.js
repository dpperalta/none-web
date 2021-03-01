//----------------------------------------------------------------IMPORTS-------------------------------------
import React from 'react';
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
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import CircularProgress from '@material-ui/core/CircularProgress';
// Yup and Formik Validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { es} from "date-fns/locale";
import { useDispatch, useSelector } from 'react-redux';
import { startCreateTask } from '../../../../../redux/actions/task';
import moment from 'moment';

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
  taskName: Yup
    .string()
    .min(3, `Mínimo 3 caracteres`)
    .max(300, `Máximo 300 caracteres`)
    .required('Campo obligatorio'),
  taskDetail: Yup
    .string()
    .min(3, `Mínimo 3 caracteres`)
    .max(4000, `Máximo 4000 caracteres`)
    .required('Campo obligatorio'),
  startDate: Yup
    .date()
    .required('Campo obligatorio'),
  endDate: Yup
    .date()
    .required('Campo obligatorio'),
  startHour: Yup
    .date()
    .required('Campo obligatorio'),
  endHour: Yup
    .date()
    .required('Campo obligatorio'),
  radio: Yup
    .string()
    .required('Campo obligatorio'),
  maxDelay: Yup
    .string()
    .min(1, `Mínimo 1 caracteres`)
    .max(2, `Máximo 2 caracteres`)
    .required('Campo obligatorio')
    .test('numbers', 'Solo se admiten días como números enteros', (value) => {return /^[0-9]+$/.test(value);})
})

//----------------------------------------------------------------COMPONENT-------------------------------------
export const FormCreateTask = () => {
  
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedDate2, setSelectedDate2] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };

  
  const dispatch = useDispatch();
  let subject = useSelector( state => state.subject.selectedSubject );
  //let { collegeID } = useSelector( state => state.auth.user );
  const { checking } = useSelector( state => state.subject );

  if(!subject) {
    subject = { subjectName: '' }
  }

  //Formik initial values
  const formik = useFormik({
    initialValues: {
        taskName: '',
        taskDetail: '',
        startDate: selectedDate,
        endDate: selectedDate,
        startHour: selectedDate,
        endHour: selectedDate,
        radio: 'false',
        maxDelay:'0'
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let inicio = moment(selectedDate).format('YYYY-MM-DD'); 
      let fin = moment(selectedDate2).format('YYYY-MM-DD');
      let inicioHora = moment(selectedDate).format('HH:mm:ss'); 
      let finHora = moment(selectedDate2).format('HH:mm:ss');
      
      let task = {
        startDate: inicio + ' ' + inicioHora,
        endDate: fin + ' ' + finHora,
        taskName: values.taskName,
        taskDetail: values.taskDetail,
        permitsDelay: values.radio,
        maxDelay: values.maxDelay,
        subjectID: subject.subjectID
      }
      dispatch( startCreateTask(task) );
      formik.handleReset();
      setSelectedDate(new Date());
      setSelectedDate2(new Date());
    },    
  });

  const handleLimpiar = () => {
    formik.handleReset();
    setSelectedDate(new Date());
    setSelectedDate2(new Date());
  }
 
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
              Registro de Tarea para { subject.subjectName }
            </Typography>
          </Grid>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Grid container direction="row" alignContent="center" alignItems="center" justify="center"> 
              <Grid item><LibraryBooksIcon /></Grid>
                <Grid item>DATOS DE LA TAREA</Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="taskName"
                  variant="outlined"
                  required
                  fullWidth
                  id="taskName"
                  label="Nombre de la materia"
                  autoFocus
                  value={ formik.values.taskName }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                />
                {
                  formik.errors.taskName && formik.touched.taskName
                  ? ( 
                    <div className={ classes.alert }>
                      <Alert severity="error">{ formik.errors.taskName }</Alert>
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
                  id="taskDetail"
                  label="Descripción"
                  name="taskDetail"
                  autoComplete="off"
                  value={ formik.values.taskDetail }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                  className={classes.textField}
                />
                {
                  formik.errors.taskDetail && formik.touched.taskDetail
                  ? ( 
                    <div className={ classes.alert }>
                       <Alert severity="error">{ formik.errors.taskDetail }</Alert>
                    </div>
                  )
                  : null
                }
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                &nbsp;&nbsp;&nbsp;
                <MuiPickersUtilsProvider locale={es}  utils={DateFnsUtils}>                  
                  <KeyboardDatePicker
                    margin="normal"
                    id="startDate"
                    Style="width:95%"
                    name="startDate"
                    label="Fecha de inicio"
                    format="yyyy-MM-dd"
                    required
                    value={selectedDate}
                    onChange={handleDateChange}
                    onBlur={ formik.handleBlur }
                  />
                  {
                    formik.errors.startDate && formik.touched.startDate
                    ? ( 
                      <div className={ classes.alert }>
                        <Alert severity="error">{ formik.errors.startDate }</Alert>
                      </div>
                    )
                    : null
                  }
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                &nbsp;&nbsp;&nbsp;
                  <KeyboardTimePicker
                    margin="normal"
                    id="startHour"
                    Style="width:95%"
                    name="startHour"
                    ampm={false}
                    required
                    label="Hora de inicio"
                    value={selectedDate}
                    onChange={handleDateChange}
                    onBlur={ formik.handleBlur }
                  />
                  {
                    formik.errors.startHour && formik.touched.startHour
                    ? ( 
                      <div className={ classes.alert }>
                        <Alert severity="error">{ formik.errors.startHour }</Alert>
                      </div>
                    )
                    : null
                  }
                  </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                &nbsp;&nbsp;&nbsp;
                <MuiPickersUtilsProvider locale={es}  utils={DateFnsUtils}>                  
                  <KeyboardDatePicker
                    margin="normal"
                    id="endDate"
                    Style="width:95%"
                    name="endDate"
                    label="Fecha de finalización"
                    format="yyyy-MM-dd"
                    required
                    value={selectedDate2}
                    onChange={handleDateChange2}
                    onBlur={ formik.handleBlur }
                  />
                  {
                    formik.errors.endDate && formik.touched.endDate
                    ? ( 
                      <div className={ classes.alert }>
                        <Alert severity="error">{ formik.errors.endDate }</Alert>
                      </div>
                    )
                    : null
                  }
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                  &nbsp;&nbsp;&nbsp;
                  <KeyboardTimePicker
                    margin="normal"
                    id="endHour"
                    Style="width:95%"
                    name="endHour"
                    ampm={false}
                    required
                    label="Hora de finalización"
                    value={selectedDate2}
                    onChange={handleDateChange2}
                    onBlur={ formik.handleBlur }
                  />
                  {
                    formik.errors.endHour && formik.touched.endHour
                    ? ( 
                      <div className={ classes.alert }>
                        <Alert severity="error">{ formik.errors.endHour }</Alert>
                      </div>
                    )
                    : null
                  }
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <label >&nbsp;&nbsp;&nbsp;Se permite restraso en la entrega</label>
                    <RadioGroup aria-label="gender" name="radio" id="radio" value={formik.values.radio} onChange={ formik.handleChange} row>
                      &nbsp;&nbsp;&nbsp;<FormControlLabel value="false" control={<Radio />} label="No" />
                      &nbsp;&nbsp;&nbsp;<FormControlLabel value="true" control={<Radio />} label="Si" />
                    </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="maxDelay"
                  name="maxDelay"
                  variant="outlined"
                  required
                  fullWidth
                  id="maxDelay"
                  label="Retraso máximo en días"
                  value={ formik.values.maxDelay }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                />
                {
                  formik.errors.maxDelay && formik.touched.maxDelay
                  ? ( 
                    <div className={ classes.alert }>
                      <Alert severity="error">{ formik.errors.maxDelay }</Alert>
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
                <Button variant="outlined" Style="width:100%" color="primary" className={classes.submit} onClick={handleLimpiar} startIcon={<BackspaceIcon />}>
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