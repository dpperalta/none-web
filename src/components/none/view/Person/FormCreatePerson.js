//----------------------------------------------------------------IMPORTS-------------------------------------
import React, { useEffect, useState } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { es } from "date-fns/locale";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import SaveIcon from '@material-ui/icons/Save';
import BackspaceIcon from '@material-ui/icons/Backspace';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import ContactMailIcon from '@material-ui/icons/ContactMail';
// Yup and Formik Validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { startGettingOperators } from '../../../../redux/actions/phoneOperator';
import { startGettingPersonTypes } from '../../../../redux/actions/personType';
import { startGettingCities } from '../../../../redux/actions/city';
import { startCreatePerson } from '../../../../redux/actions/person';
import { CircularProgress, Dialog } from '@material-ui/core';

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
  spiner: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}));

//----------------------------------------------------------------ESQUEMAS DE VALIDACION-------------------------------------
const validationSchema = Yup.object({
  dni: Yup
    .string()
    .min(10, `Mínimo 10 caracteres`)
    .max(15, `Máximo 13 caracteres`)
    .test('numbers', 'Solo se admiten números', (value) => {return /^[0-9]+$/.test(value);})
    .required('Campo obligatorio'),
  firstName: Yup
      .string()
      .min(3, `Mínimo 3 caracteres`)
      .max(100, `Máximo 100 caracteres`)
      .test('alphabets', 'Solo se admiten letras', (value) => {return /^[A-Za-z áéíóúÁÉÍÓÚÑñ]+$/.test(value);})
      .required('Campo obligatorio'),
  lastName: Yup
    .string()
    .min(3, `Mínimo 3 caracteres`)
    .max(100, `Máximo 100 caracteres`)
    .test('alphabets', 'Solo se admiten letras', (value) => {return /^[A-Za-z áéíóúÁÉÍÓÚÑñ]+$/.test(value);})
    .required('Campo obligatorio'),
  personType: Yup
      .string()
      .required('Seleccione una opción'),
  birthdate: Yup
      .date()
      .required('Campo obligatorio'),
  sex: Yup
      .string()
      .required('Campo obligatorio'),
  email: Yup
      .string()
      .email('Correo electrónico incorrecto')
      .max(80, `Máximo 80 caracteres`)
      .required('Campo obligatorio'),
  pass: Yup
      .string()
      .min(6, `Mínimo 6 caracteres`)
      .max(200, `Máximo 200 caracteres`)
      .required('Campo obligatorio'),
  pass2: Yup
      .string()
      .min(6, `Mínimo 6 caracteres`)
      .max(200, `Máximo 200 caracteres`)
      .oneOf([Yup.ref('pass'), null], 'Las contraseñas deben ser iguales')
      .required('Campo obligatorio'),
  mainStreet: Yup
      .string()
      .min(3, `Mínimo 3 caracteres`)
      .max(100, `Máximo 100 caracteres`)
      .required('Campo obligatorio'),
  number: Yup
      .string()
      .min(1, `Mínimo 1 caracter`)
      .max(9, `Máximo 9 caracteres`)
      .required('Campo obligatorio'),
  secondStreet: Yup
      .string()
      .min(3, `Mínimo 3 caracteres`)
      .max(100, `Máximo 100 caracteres`)
      .required('Campo obligatorio'),
  cityName: Yup
      .string()
      .required('Campo obligatorio'),
  /*numberPhone1: Yup
      .string()*/
      //.min(7, `Mínimo 7 caracter`)
      //.max(10, `Máximo 10 caracteres`)
      //.test('numbers', 'Solo se admiten números', (value) => {return /^[0-9]+$/.test(value);})
      //.required('Campo obligatorio')
      //,  
  /*numberPhone2: Yup
      .string()*/
      //.min(7, `Mínimo 7 caracter`)
      //.max(10, `Máximo 10 caracteres`)
      //.test('numbers', 'Solo se admiten números', (value) => {return /^[0-9]+$/.test(value);})
      //.required('Campo obligatorio')
      //, 
  /*selectorOperator1: Yup
      .string()*/
      //.required('Campo obligatorio')
      //,
  /*selectorOperator2: Yup
      .string()*/
      //.required('Campo obligatorio')
})


//----------------------------------------------------------------COMPONENT-------------------------------------
export const FormCreatePerson = () => {

  const dispatch = useDispatch();

  const classes = useStyles();

  const [ selectedDate, setSelectedDate ] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Effect to load information for selectable lists
  useEffect( () => {
   const loadPhoneOperator = () => dispatch( startGettingOperators() );
   loadPhoneOperator();
   const loadPersonTypes = () => dispatch( startGettingPersonTypes() );
   loadPersonTypes();
   const loadCities = () => dispatch( startGettingCities() );
   loadCities();
  }, []);

  // Loading the information of Phone Operators
  let phoneOperators = useSelector( state => state.phoneOperator.operatorsList );
  if( !phoneOperators ) {
    phoneOperators = [];
  }

  // Loading information of Person Types
  let personTypes = useSelector( state => state.personType.personTypeList );
  if( !personTypes ){
    personTypes = [];
  }

  // Loading information of Cities
  let cities = useSelector ( state  => state.city.citiesList );
  if( !cities ) {
    cities = [];
  }

  // Validate process
  let { checking } = useSelector( state => state.person );

  //Formik initial values
  const formik = useFormik({
    initialValues: {
        dni: '',
        firstName: '',
        lastName: '',
        sex:'male',
        birthdate: selectedDate,
        personType:'',
        mainStreet:'',
        number:'',
        secondStreet:'',
        cityName:'',
        numberPhone1:'',
        selectorOperator1:'',
        numberPhone2:'',
        selectorOperator2:'',
        email: '',
        pass: '',
        pass2: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let homePhone;
      let mobilePhone;
      if( values.numberPhone1 !== '' ){
        homePhone = {
          number: values.numberPhone1,
          operatorID: values.selectorOperator1,
          phoneType: 1
        }
      }
      if( values.numberPhone2 !== '' ){
        mobilePhone = {
          number: values.numberPhone2,
          operatorID: values.selectorOperator2,
          phoneType: 2
        }
      }
      const data = {
        person: {
          dni: values.dni,
          names: values.firstName,
          lastNames: values.lastName,
          birthdate: selectedDate,//values.birthdate,
          sex: values.sex,
          personTypeID: values.personType
        },
        address: {
          mainStreet: values.mainStreet,
          number: values.number,
          secondStreet: values.secondStreet,
          cityID: values.cityName
        },
        user: {
          email: values.email,
          pass: values.pass
        },
        homePhone,
        mobilePhone
      }
      dispatch(startCreatePerson( data ));
      formik.handleReset();
      setSelectedDate(moment().format('YYYY-MM-DD'));
    }
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
              Registro de Persona
            </Typography>
          </Grid>
          <form 
            className={classes.form} 
            noValidate
            onSubmit={ formik.handleSubmit }
          >
            <Grid container direction="row" alignContent="center" alignItems="center" justify="center"> 
              <Grid item><PersonIcon /></Grid>
              <Grid item>DATOS BASICOS</Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  //autoComplete="dni"
                  name="dni"
                  variant="outlined"
                  required
                  fullWidth
                  id="dni"
                  label="DNI (Cédula)"
                  autoFocus
                  value={ formik.values.dni }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                />
                {
                  formik.errors.dni && formik.touched.dni
                  ? ( 
                      <div className={ classes.alert }>
                          <Alert severity="error">{ formik.errors.dni }</Alert>
                      </div>
                  )
                  : null
                }
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  //autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombres Completos"
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
                  label="Apellidos Completos"
                  name="lastName"
                  //autoComplete="lname"
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
                <FormControl variant="outlined" Style="width:100%" className={classes.formControl}>
                  <InputLabel id="personTypeLabel">Tipo de persona</InputLabel>
                  <Select
                    labelId="personTypeLabel"
                    id="personType"
                    name="personType"
                    required
                    fullWidth
                    value={formik.values.personType}
                    onChange={formik.handleChange}
                    onBlur={ formik.handleBlur }
                    label="Tipo de persona"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      personTypes.map( type => (
                        <MenuItem
                          value={ type.personTypeID }
                        >
                          { type.typeName }
                        </MenuItem>
                      ) )
                    }
                  </Select>
                  {
                    formik.errors.personType && formik.touched.personType
                    ? ( 
                        <div className={ classes.alert }>
                            <Alert severity="error">{ formik.errors.personType }</Alert>
                        </div>
                    )
                    : null
                  }
                </FormControl>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  &nbsp;&nbsp;&nbsp;
                  <MuiPickersUtilsProvider locale={es}  utils={DateFnsUtils}>                  
                    <KeyboardDatePicker
                      id="birthdate"
                      margin="normal"
                      Style="width:95%"
                      name="birthdate"
                      label="Fecha de nacimiento"
                      format="yyyy-MM-dd"
                      required
                      value={ selectedDate }
                      onChange={ handleDateChange }
                      onBlur={ formik.handleBlur }
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    {
                      formik.errors.birthdate && formik.touched.birthdate
                      ? ( 
                          <div className={ classes.alert }>
                              <Alert severity="error">{ formik.errors.birthdate }</Alert>
                          </div>
                      )
                      : null
                    }
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl component="fieldset">
                    <label >Sexo</label>
                        <RadioGroup aria-label="sex" name="sex" id="sex" value={formik.values.sex} onChange={ formik.handleChange} row>
                          <FormControlLabel value="female" control={<Radio />} label="Femenino" />
                          <FormControlLabel value="male" control={<Radio />} label="Masculino" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <br/>
            <Grid container direction="row" alignContent="center" alignItems="center" justify="center"> 
              <Grid item><HomeIcon /></Grid>
              <Grid item>DIRECCION DE DOMICILIO</Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="mainStreet"
                  name="mainStreet"
                  variant="outlined"
                  required
                  fullWidth
                  id="mainStreet"
                  label="Calle principal"
                  value={ formik.values.mainStreet }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                />
                {
                  formik.errors.mainStreet && formik.touched.mainStreet
                  ? ( 
                      <div className={ classes.alert }>
                          <Alert severity="error">{ formik.errors.mainStreet }</Alert>
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
                  id="number"
                  label="Número de casa"
                  name="number"
                  value={ formik.values.number }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                />
                {
                  formik.errors.number && formik.touched.number
                  ? ( 
                      <div className={ classes.alert }>
                        <Alert severity="error">{ formik.errors.number }</Alert>
                      </div>
                  )
                  : null
                }
                </Grid>
              </Grid>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="secondStreet"
                  name="secondStreet"
                  variant="outlined"
                  required
                  fullWidth
                  id="secondStreet"
                  label="Calle principal"
                  value={ formik.values.secondStreet }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                />
                {
                  formik.errors.secondStreet && formik.touched.secondStreet
                  ? ( 
                      <div className={ classes.alert }>
                          <Alert severity="error">{ formik.errors.secondStreet }</Alert>
                      </div>
                  )
                  : null
                }
              </Grid>
              <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" Style="width:100%" className={classes.formControl}>
                    <InputLabel id="cityName">Ciudad</InputLabel>
                    <Select
                      labelId="cityName"
                      id="cityName"
                      name="cityName"
                      required
                      fullWidth
                      value={formik.values.cityName}
                      onChange={formik.handleChange}
                      onBlur={ formik.handleBlur }
                      label="Ciudad"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {
                        cities.map( city => (
                          <MenuItem
                            value={ city.cityID }
                          >
                            { city.cityName }
                          </MenuItem>
                        ) )
                      }
                    </Select>
                    {
                      formik.errors.cityName && formik.touched.cityName
                      ? ( 
                          <div className={ classes.alert }>
                              <Alert severity="error">{ formik.errors.cityName }</Alert>
                          </div>
                      )
                      : null
                    }
                  </FormControl>
              </Grid>
            </Grid>
            <br/>
            <Grid container direction="row" alignContent="center" alignItems="center" justify="center"> 
              <Grid item><PhoneIcon /></Grid>
              <Grid item>TELEFONOS PARA CONTACTO</Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="numberPhone1"
                  name="numberPhone1"
                  variant="outlined"
                  //required
                  fullWidth
                  id="numberPhone1"
                  label="Teléfono Convencional"
                  value={ formik.values.numberPhone1 }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                />
                {
                  formik.errors.numberPhone1 && formik.touched.numberPhone1
                  ? ( 
                      <div className={ classes.alert }>
                          <Alert severity="error">{ formik.errors.numberPhone1 }</Alert>
                      </div>
                  )
                  : null
                }
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" Style="width:100%" className={classes.formControl}>
                  <InputLabel id="select-label">Operadora</InputLabel>
                  <Select
                    labelId="select-label"
                    id="selectorOperator1"
                    name="selectorOperator1"
                    //required
                    fullWidth
                    value={formik.values.selectorOperator1}
                    onChange={formik.handleChange}
                    onBlur={ formik.handleBlur }
                    label="Tipo de operadora"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      phoneOperators.map( operator => (
                        <MenuItem
                          value={ operator.operatorID }
                        >
                          { operator.operatorName }
                        </MenuItem>
                      ) )
                    }
                  </Select>
                  {
                    formik.errors.selectorOperator1 && formik.touched.selectorOperator1
                    ? ( 
                        <div className={ classes.alert }>
                            <Alert severity="error">{ formik.errors.selectorOperator1 }</Alert>
                        </div>
                    )
                    : null
                  }
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="numberPhone2"
                  name="numberPhone2"
                  variant="outlined"
                  //required
                  fullWidth
                  id="numberPhone2"
                  label="Teléfono Móvil"
                  value={ formik.values.numberPhone2 }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                />
                {
                  formik.errors.numberPhone2 && formik.touched.numberPhone2
                  ? ( 
                      <div className={ classes.alert }>
                          <Alert severity="error">{ formik.errors.numberPhone2 }</Alert>
                      </div>
                  )
                  : null
                }
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" Style="width:100%" className={classes.formControl}>
                  <InputLabel id="select-label">Operadora</InputLabel>
                  <Select
                    labelId="select-label"
                    id="selectorOperator2"
                    name="selectorOperator2"
                    //required
                    fullWidth
                    value={formik.values.selectorOperator2}
                    onChange={formik.handleChange}
                    onBlur={ formik.handleBlur }
                    label="Operadora"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      phoneOperators.map( operator => (
                        <MenuItem
                          value={ operator.operatorID }
                        >
                          { operator.operatorName }
                        </MenuItem>
                      ) )
                    }
                  </Select>
                  {
                    formik.errors.selectorOperator2 && formik.touched.selectorOperator2
                    ? ( 
                        <div className={ classes.alert }>
                            <Alert severity="error">{ formik.errors.selectorOperator2 }</Alert>
                        </div>
                    )
                    : null
                  }
                </FormControl>
              </Grid>
            </Grid>
            <br/>
            <Grid container direction="row" alignContent="center" alignItems="center" justify="center"> 
              <Grid item><ContactMailIcon /></Grid>
              <Grid item>&nbsp;DATOS PARA EL USUARIO</Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Correo electrónico"
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
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="pass"
                  label="Contraseña"
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="pass2"
                  label="Repetir Contraseña"
                  type="password"
                  id="pass2"
                  autoComplete="current-password"
                  value={ formik.values.pass2 }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
              />
              {
                formik.errors.pass2 && formik.touched.pass2
                ? ( 
                    <div className={ classes.alert }>
                        <Alert severity="error">{ formik.errors.pass2 }</Alert>
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
                  className={ classes.submit }
                  startIcon={<SaveIcon />}
                >
                  Guardar datos
                </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined" 
                  Style="width:100%" 
                  color="primary" 
                  className={classes.submit} 
                  onClick={formik.handleReset} 
                  startIcon={<BackspaceIcon />}>
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
//------------------------------------------------------------------
/* Validaciones de Yup para tamaños y tipos de expresiones comunes
.min(5, `Mínimo 5 caracteres`)
.max(25, `Máximo 25 caracteres`)
.required("Campo Requerido")
.test('alphabets', 'Solo se admiten letras', (value) => {return /^[A-Za-z áéíóúÁÉÍÓÚÑñ]+$/.test(value);})
.test('numbers', 'Solo se admiten números', (value) => {return /^[0-9]+$/.test(value);})
.test('alphabets', 'Solo se admiten alfanuméricos', (value) => {return /^[0-9A-Za-z áéíóúÁÉÍÓÚÑñ]+$/.test(value);})
.email("Correo Electronico Invalido")
.test('numbers', 'Solo se admiten teéfonos', (value) => {return /^[0-9+-() ]+$/.test(value);})
.oneOf(['Banco 1', 'Banco 2'])
.test('numbers', 'Solo se admiten solo números y separador decimal coma ', (value) => {return /^[0-9,]+$/.test(value);})
.oneOf([true], 'Es necesaria esta declaración para poder guardar los datos') //Terms: Yup.bool()
*/