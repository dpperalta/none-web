import React, { useState } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { es} from "date-fns/locale";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
//import PhotoCamera from '@material-ui/icons/PhotoCamera';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
//import AlarmIcon from '@material-ui/icons/AlarmIcon';
//import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormGroup from '@material-ui/core/FormGroup';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';

import Autocomplete from '@material-ui/lab/Autocomplete';



// Yup and Formik Validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';


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
//------------------------------------------------------------------
/* Validaciones de Yup para tamaños y tipos de expresiones comunes
.min(5, `Mínimo 5 caracteres`)
.max(25, `Máximo 25 caracteres`)
.required("Campo Requerido")
.test('alphabets', 'Solo se admiten letras', (value) => {return /^[A-Za-z áéíóúÁÉÍÓÚÑñ]+$/.test(value);})
.test('numbers', 'Solo se admiten números', (value) => {return /^[0-9]+$/.test(value);})
.test('alphabets', 'Solo se admiten alfanuméricos', (value) => {return /^[0-9A-Za-z áéíóúÁÉÍÓÚÑñ]+$/.test(value);})
.email("Correo Electronico Invalido")
.test('numbers', 'Solo se admiten teléfonos', (value) => {return /^[0-9+-() ]+$/.test(value);})
.oneOf(['Banco 1', 'Banco 2'])
.test('numbers', 'Solo se admiten solo números y separador decimal coma ', (value) => {return /^[0-9,]+$/.test(value);})
.oneOf([true], 'Es necesaria esta declaración para poder guardar los datos') //Terms: Yup.bool()
*/
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
      .required('Campo obligatorio'),
  checkBox: Yup
      .bool().oneOf([true], 'Se requiere que marque el checkbox'),
  radio: Yup
      .string()
      .required('Campo obligatorio'),
  fecha: Yup
      .date(), 
  hora: Yup
      .date(),
  selector: Yup
      .string()
      .required('Seleccione una opción'),
      //comboBox: Yup .string() .required('Seleccione una opción')

})



export const ComponentsUI = () => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [ object, setObject ] = useState({});

  //Formik initial values
  const formik = useFormik({
    initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        pass: '',
        checkBox: false,
        radio:'other',
        fecha: selectedDate,
        hora: selectedDate,
        selector:''
        //comboBox:''
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
    //Swal.fire('Datos', JSON.stringify(object, null, 2), 'info');
  }

  return (
    //<Container component="main" maxWidth="xs"> // SI se quiere el formulario pequeño, hay tamaños: sm, {md, lg} recomendados esos dos
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.form}>
      <Grid container direction="row" alignItems="center" justify="center">
        <Avatar id="avatar" className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> 
        <Typography component="h1" variant="h5">
          Listado de controles
        </Typography>
        </Grid>
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
            <Grid item xs={12} sm={6}>
            <br/>CHECKBOX<br/>
                <Checkbox
                autoComplete="cbox"
                name="checkBox"
                variant="outlined"
                required
                fullWidth
                id="checkBox"
                label="CheckBox"
		            type="checkbox"
                value={ formik.values.checkBox }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
              <label htmlFor="checkBox">Texto del checkbox</label>
              {
                            formik.errors.checkBox && formik.touched.checkBox
                            ? ( 
                                <div className={ classes.alert }>
                                    <Alert severity="error">{ formik.errors.checkBox }</Alert>
                                </div>
                             )
                            : null
              }
            </Grid>
            
            
          </Grid>
          <Grid item xs={12}>
          <br/>RADIOBUTTONS<br/>
          <FormControl component="fieldset">
          <FormLabel component="legend">Horizontal</FormLabel>
              <RadioGroup aria-label="gender" name="radio" id="radio" value={formik.values.radio} onChange={ formik.handleChange} row>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
              <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset">
          <FormLabel component="legend">Vertical</FormLabel>
              <RadioGroup aria-label="gender" name="radio" id="radio" value={formik.values.radio} onChange={ formik.handleChange}>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
             
            </RadioGroup>
          </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
          <br/>CALENDARIOS<br/>
                  <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                  
                    <KeyboardDatePicker
                      margin="normal"
                      id="fecha"
                      name="fecha"
                      label="Selector de fecha"
                      format="dd/MM/yyyy"
                      required
                      value={selectedDate}
                      onChange={handleDateChange}
                      onBlur={ formik.handleBlur }
                    />
                    {
                            formik.errors.fecha && formik.touched.fecha
                            ? ( 
                                <div className={ classes.alert }>
                                    <Alert severity="error">{ formik.errors.fecha }</Alert>
                                </div>
                             )
                            : null
                    }
                    <KeyboardTimePicker
                      margin="normal"
                      id="hora"
                      name="hora"
                      required
                      label="Selector de hora"
                      value={selectedDate}
                      onChange={handleDateChange}
                      onBlur={ formik.handleBlur }
                    />
                    {
                            formik.errors.hora && formik.touched.hora
                            ? ( 
                                <div className={ classes.alert }>
                                    <Alert severity="error">{ formik.errors.hora }</Alert>
                                </div>
                             )
                            : null
                    }
                  
                </MuiPickersUtilsProvider>

            </Grid>
          
          <Grid item xs={12}>
            <br/>LISTAS DE SELECCION &nbsp;
                <FormControl variant="outlined" Style="width:100%" className={classes.formControl}>
                <InputLabel id="select-label">Edad</InputLabel>
                <Select
                  labelId="select-label"
                  id="selector"
                  name="selector"
                  required
                  fullWidth
                  value={formik.values.selector}
                  onChange={formik.handleChange}
                  onBlur={ formik.handleBlur }
                  label="Edad"
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
          <Grid item xs={12}>
            <br/>LISTA PARA AUTOCOMPLETAR (Sin formik, y aún así está haciendo lento el formulario)<br/>
                 <Autocomplete Style="width:100%"
                id="comboBox"
                name="comboBox"
                required
                //value={formik.values.comboBox}
                //onChange={formik.handleChange}
                //onBlur={ formik.handleBlur }
                options={top100Films}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField {...params} label="Lista con autocompletado" variant="outlined" />}
              />
             
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
          <br/>BOTONES<br/>
                <Button variant="contained">Default</Button>
                <Button variant="contained" color="primary">
                  Primary
                </Button>
                <Button variant="contained" color="secondary">
                  Secondary
                </Button>
                <Button variant="contained" disabled>
                  Disabled
                </Button>
                <Button variant="contained" color="primary" href="#contained-buttons">
                  Link
                </Button>
                <Button>Default</Button>
                <Button color="primary">Primary</Button>
                <Button color="secondary">Secondary</Button>
                <Button disabled>Disabled</Button>
                <Button href="#text-buttons" color="primary">
                  Link
                </Button>
                <Button variant="outlined">Default</Button>
                <Button variant="outlined" color="primary">
                  Primary
                </Button>
                <Button variant="outlined" color="secondary">
                  Secondary
                </Button>
                <Button variant="outlined" disabled>
                  Disabled
                </Button>
                <Button variant="outlined" color="primary" href="#outlined-buttons">
                  Link
                </Button>
          </Grid>
          <Grid item xs={12}>
          <br/>BOTON CARGA DE ARCHIVOS<br/>
      Botón opcional&nbsp;
                  <input 
                  accept="image/*"
                  className={classes.inputHidden}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    SUBIR ARCHIVO
                  </Button>
                </label>
                <input accept="image/*" className={classes.inputHidden} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <CloudUploadIcon />
                  </IconButton>
                </label>
                          </Grid>
          <Grid item xs={12}>
          <br/>BOTONES CON ICONOS<br/>
                <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>send</Icon>}
              >
                Send
              </Button>
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>
              <Button
                variant="contained"
                disabled
                color="secondary"
                className={classes.button}
                startIcon={<KeyboardVoiceIcon />}
              >
                Talk
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>

          </Grid>
          <Grid item xs={12}>
          <br/>BOTONES SOLO CON ICONOS<br/>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="delete" disabled color="primary">
                <DeleteIcon />
              </IconButton>
              

          </Grid>
          <Grid item xs={12}>
          <br/>GRUPOS DE BOTONES<br/>
              <ButtonGroup color="primary" aria-label="outlined primary button group">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>    

                  <ButtonGroup
              orientation="vertical"
              color="primary"
              aria-label="vertical outlined primary button group"
            >
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup
              orientation="vertical"
              color="primary"
              aria-label="vertical contained primary button group"
              variant="contained"
            >
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup
              orientation="vertical"
              color="primary"
              aria-label="vertical contained primary button group"
              variant="text"
            >
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>

          </Grid>
          <Grid item xs={12}>
            <br/>CHECKBOXES<br/>
              <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked="false" name="checkedA" />}
                label="Secondary"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked="false"
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Primary"
              />
              <FormControlLabel control={<Checkbox name="checkedC" />} label="Uncontrolled" />
              <FormControlLabel disabled control={<Checkbox name="checkedD" />} label="Disabled" />
              <FormControlLabel disabled control={<Checkbox checked name="checkedE" />} label="Disabled" />
              <FormControlLabel
                control={
                  <Checkbox
                    checked="false"
                    
                    name="checkedF"
                    indeterminate
                  />
                }
                label="Indeterminate"
              />
              
              <FormControlLabel
                control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                label="Custom icon"
              />
             
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
              <Typography id="discrete-slider" gutterBottom>
                Ejemplo de Slider numérico
              </Typography>
              <Slider
                defaultValue={50}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={5}
                marks
                min={0}
                max={100}
              />
          </Grid>
          <Grid item xs={12}>
          <FormControlLabel control={<Switch />} label="Uncontrolled" />
          <FormControlLabel disabled control={<Switch />} label="Disabled" />
          <FormControlLabel disabled control={<Switch checked />} label="Disabled" />

          </Grid>
          <Grid item xs={12}>
            Para esperar acciones 
            <CircularProgress />
      <CircularProgress color="secondary" />
          </Grid>
          <Grid item xs={12}>
            Dialogos y modales: https://material-ui.com/components/dialogs/
          </Grid>
          <Grid item xs={12}>
            Tablas: https://material-ui.com/components/tables/
          </Grid>
          <Grid item xs={12}>
            Listas para bandejas de mensajes/tareas: https://material-ui.com/components/lists/
          </Grid>
          <Grid item xs={12}>
            Badges (Íconos con un número) para mensajería y notificaciones: https://material-ui.com/components/badges/
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>          
          <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Guardar datos
          </Button>
          </Grid>
          
          
        </form>
      </div>
      
    </Container>
  );
  
}
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];