import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import InputIcon from '@material-ui/icons/Input';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import SaveIcon from '@material-ui/icons/Save';
import BackspaceIcon from '@material-ui/icons/Backspace';

import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { startGetPersonToStudent } from '../../../../redux/actions/person';
import { startGetActiveCourses } from '../../../../redux/actions/course';
import { useHistory } from 'react-router-dom';
import { startCreateStudent } from '../../../../redux/actions/student';

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    spiner: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2)
        }
    }
}));

//------------------------------------------VALIDATION SCHEMA-------------------------------------------------
const validationSchema = Yup.object({
    course: Yup
        .string()
        .nullable()
        .required('Seleccione una opción'),
    person: Yup
        .string()
        .nullable()
        .required('Seleccione una opción'),
    details: Yup
        .string()
});

//----------------------------------------------COMPONENT-----------------------------------------------------

export const FormCreateStudent = () => {
    
    const dispatch = useDispatch();

    const history = useHistory();

    const classes = useStyles();

    const [ courseID, setCourseID ] = useState(null);
    const [ personID, setPersonID ] = useState(null);

    const { checking } = useSelector( state => state.student );

    // TODO: Effect to load information for people and courses
    useEffect(() => {
        const loadPeople = () => dispatch( startGetPersonToStudent() );
        loadPeople();
        const loadCourses = () => dispatch( startGetActiveCourses() );
        loadCourses();
    }, []);

    // Load information about student candidates
    let peopleStudent = useSelector( state => state.person.personStudents );
    if(!peopleStudent){
        peopleStudent = []
    }

    // Load information of courses 
    let courses = useSelector( state => state.course.activeCourses.rows );
    if(!courses){
        courses = []
    }

    // Formik initial values
    const formik = useFormik({
        initialValues: {
            course: '',
            person: '',
            details: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const student = {
                courseID,
                personID,
                details: values.details,
                status: 1, // This status means active student
            }
            console.log('student:', student);
            dispatch( startCreateStudent( student ) );
            handleLimpiar();
            history.push('/student/form/student');
        }
    });

    const handleLimpiar = () => {
        formik.handleReset();
        setCourseID(null);
        setPersonID(null);
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
                <div className={ classes.form }>
                    <Grid container direction="row" alignItems="center" justify="center">
                        <Avatar id="avatar" className={ classes.avatar }>
                            <InputIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Registro de Estudiantes
                        </Typography>
                    </Grid>
                    <form
                        className={ classes.form }
                        noValidate
                        onSubmit={ formik.handleSubmit }
                    >
                        <Grid container direction="row" alignContent="center" alignItems="center" justify="center">
                            <Grid item><EmojiPeopleIcon/></Grid>
                            <Grid item>DATOS DEL ESTUDIANTE</Grid>
                        </Grid>
                        <Grid container spacing={ 2 }>
                            <Grid item xs={ 12 }>
                                <Autocomplete 
                                    Style="width:100%"
                                    id="courseID"
                                    name="courseID"
                                    required
                                    options= { courses }
                                    getOptionLabel={ (option) => option.courseName }
                                    getOptionSelected={ (option) => option.courseName }
                                    noOptionsText={ 'Registre cursos por favor' }
                                    onChange={ (event, newValue) => {
                                        if(newValue) {
                                            setCourseID( newValue.courseID )
                                        }
                                    } }
                                    renderInput={ (params) => <TextField { ...params } label="Lista de cursos disponibles" variant="outlined"/> }
                                />
                                <TextField 
                                    autoComplete="off"
                                    id="course"
                                    name="course"
                                    value={ formik.values.course = courseID }
                                    hidden={ true }
                                />
                                {
                                    formik.errors.course && formik.touched.course
                                    ? (
                                        <div>
                                            <Alert severity="error">{ formik.errors.course }</Alert>
                                        </div>
                                    )
                                    : null
                                }
                            </Grid>
                        </Grid>
                        <Grid container spacing={ 2 }>
                            <Grid item xs={ 12 }>
                                <Autocomplete 
                                    Style="width:100%"
                                    id="personID"
                                    name="personID"
                                    required
                                    options= { peopleStudent }
                                    getOptionLabel={ (option) => option.nombrecompleto }
                                    getOptionSelected={ (option) => option.nombrecompleto }
                                    noOptionsText={ 'Registre personas de tipo estudiante por favor' }
                                    onChange={ (event, newValue) => {
                                        if(newValue) {
                                            setPersonID( newValue.idpersona )
                                        }
                                    } }
                                    renderInput={ (params) => <TextField { ...params } label="Lista de personas para inscribir" variant="outlined"/> }
                                />
                                <TextField 
                                    autoComplete="off"
                                    id="person"
                                    name="person"
                                    value={ formik.values.person = personID }
                                    hidden={ true }
                                />
                                {
                                    formik.errors.person && formik.touched.person
                                    ? (
                                        <div>
                                            <Alert severity="error">{ formik.errors.person }</Alert>
                                        </div>
                                    )
                                    : null
                                }
                            </Grid>
                        </Grid>
                        <Grid container spacing={ 2 }>
                            <Grid item xs={ 12 }>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows="5"
                                    id="details"
                                    name="details"
                                    autoComplete="off"
                                    label="Detalles adicionales (si son requeridos)"
                                    value={ formik.values.details }
                                    onChange={ formik.handleChange }
                                    onBlur={ formik.handleBlur }
                                />
                                {
                                    formik.errors.details && formik.touched.details
                                    ? (
                                        <div>
                                            <Alert severity="error">{ formik.errors.details }</Alert>
                                        </div>
                                    )
                                    : null
                                }
                            </Grid>
                        </Grid>
                        <Grid container spacing={ 2 }>
                            <Grid item xs={ 12 } sm={ 6 }>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={ classes.submit }
                                    startIcon={ <SaveIcon /> }
                                >
                                    Guardar datos
                                </Button>
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 }>
                                <Button
                                    type="button"
                                    color="primary"
                                    className={ classes.submit }
                                    startIcon={ <BackspaceIcon /> }
                                    variant="outlined"
                                    Style="width:100%"
                                >
                                    Limpiar datos
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    )
}
