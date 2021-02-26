//----------------------------------------------------------------IMPORTS-------------------------------------
import React, { useEffect, useState } from 'react';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

// Yup and Formik Validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { startGetCollegeTeachers } from '../../../../redux/actions/teacher';
import { startCreateSubject } from '../../../../redux/actions/subject';

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
  subjectName: Yup
    .string()
    .min(3, `Mínimo 3 caracteres`)
    .max(200, `Máximo 200 caracteres`)
    .required('Campo obligatorio'),
  description: Yup
    .string()
    .min(3, `Mínimo 3 caracteres`)
    .max(2000, `Máximo 2000 caracteres`)
    .required('Campo obligatorio'),
  gradeMinimun: Yup
    .string()
    .min(1, `Mínimo 1 caracteres`)
    .max(4, `Máximo 4 caracteres`)
    .required('Campo obligatorio')
    .test('numbers', 'Solo se admiten números enteros', (value) => {return /^[0-9]+$/.test(value);}),
  gradeMaximun: Yup
    .string()
    .min(1, `Mínimo 1 caracteres`)
    .max(4, `Máximo 4 caracteres`)
    .required('Campo obligatorio')
    .test('numbers', 'Solo se admiten números enteros', (value) => {return /^[0-9]+$/.test(value);}),
  selector: Yup
    .string()
    //.required('Seleccione una opción')
});

//----------------------------------------------------------------COMPONENT-------------------------------------
export const FormCreateSubject = () => {
  
  const classes = useStyles();
  
  const [ teacherID, setTeacherID ] = useState(null);
  const [ teacher, setTeacher ] = useState(null);
  
  const dispatch = useDispatch();
  let course = useSelector( state => state.course.selectedCourse );
  let { collegeID } = useSelector( state => state.auth.user );
  const { checking } = useSelector( state => state.subject );

  if(!course) {
    course = { courseName: '' }
  }

  useEffect(() => {
    const loadTeachers = () => dispatch( startGetCollegeTeachers( collegeID ) );
    loadTeachers();
  }, []);

  let teachers = useSelector( state => state.teacher.collegeTeachers );
  if(!teachers){
    teachers = [];
  }
  
  //Formik initial values
  const formik = useFormik({
    initialValues: {
        subjectName: '',
        description: '',
        gradeMinimun: 0,
        gradeMaximun: 10,
        selector:'',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let subject = {
        subjectName: values.subjectName,
        description: values.description,
        gradeMinimun: values.gradeMaximun,
        gradeMaximun: values.gradeMinimun,
        teacherID,
        courseID: course.courseID
      }
      
      dispatch( startCreateSubject(subject) );
      formik.handleReset();
      setTeacherID(null);
      setTeacher(null);
      
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
              Registro de Materias para { course.courseName }
            </Typography>
          </Grid>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Grid container direction="row" alignContent="center" alignItems="center" justify="center"> 
              <Grid item><LibraryBooksIcon /></Grid>
              <Grid item>DATOS BASICOS</Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="subjectName"
                  variant="outlined"
                  required
                  fullWidth
                  id="subjectName"
                  label="Nombre de la materia"
                  autoFocus
                  value={ formik.values.subjectName }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                />
                {
                  formik.errors.subjectName && formik.touched.subjectName
                  ? ( 
                    <div className={ classes.alert }>
                      <Alert severity="error">{ formik.errors.subjectName }</Alert>
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
                <TextField
                  autoComplete="off"
                  name="gradeMinimun"
                  variant="outlined"
                  required
                  fullWidth
                  id="gradeMinimun"
                  label="Nota mínima"
                  autoFocus
                  type="number"
                  value={ formik.values.gradeMinimun }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                />
                {
                  formik.errors.gradeMinimun && formik.touched.gradeMinimun
                  ? ( 
                    <div className={ classes.alert }>
                      <Alert severity="error">{ formik.errors.gradeMinimun }</Alert>
                    </div>
                  )
                  : null
                }
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="off"
                  name="gradeMaximun"
                  variant="outlined"
                  required
                  fullWidth
                  id="gradeMaximun"
                  label="Nota máxima"
                  type="number"
                  value={ formik.values.gradeMaximun }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                />
                {
                  formik.errors.gradeMaximun && formik.touched.gradeMaximun
                  ? ( 
                    <div className={ classes.alert }>
                      <Alert severity="error">{ formik.errors.gradeMaximun }</Alert>
                    </div>
                  )
                  : null
                }
              </Grid>
            </Grid>
            <Grid container spacing={ 2 }>
              <Grid item xs={12}>
                <Autocomplete Style="width:100%"
                  id="teacher"
                  name="teacher"
                  required
                  options={ teachers }
                  getOptionLabel={ (option) => option.completo }
                  //value={ teacher }
                  onChange={ (event, newValue) => {
                      if(newValue){
                        setTeacherID(newValue.profesor);
                        setTeacher(newValue.completo)
                      }
                  } }
                  renderInput={(params) => <TextField {...params} label="Lista de profesores disponibles" variant="outlined" />}
                />
              </Grid>
            </Grid>
            {/*
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl variant="outlined" Style="width:100%" className={classes.formControl}>
                  <InputLabel id="select-label">Profesor asignado</InputLabel>
                  <Select
                    labelId="select-label"
                    id="selector"
                    name="selector"
                    //required
                    fullWidth
                    value={formik.values.selector}
                    onChange={formik.handleChange}
                    onBlur={ formik.handleBlur }
                    label="Profesor asignado"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  {
                    formik.errors.selector && formik.touched.selector
                    ? ( 
                      <div className={ classes.alert }>
                        <Alert severity="error">{ formik.errors.selector }</Alert>
                      </div>
                    )
                    : null
                  }
                </FormControl>
              </Grid>
            </Grid> */}
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