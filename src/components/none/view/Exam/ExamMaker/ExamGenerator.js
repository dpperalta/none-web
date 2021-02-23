import React, { useState } from "react";
import ReactDOM from "react-dom";
import { QuizzBuilder } from "react-quizzes";
import QuizExample from "./PreviewExam";
//import "react-quizzes/lib/assets/antd.css";
import './antd.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

//Paquete para generar exámenes
//https://www.npmjs.com/package/react-quizzes


export const ExamGenerator = () => {
    const classes = useStyles();
  const [formdata, setFormData] = useState([]);

  return (
    <div className={classes.root}>
      <QuizExample data={formdata} />
      <QuizzBuilder onChange={setFormData} />
    </div>
  );
}


/*
Modificar none-web\node_modules\react-quizzes\lib\translations\messages\en.json
{
    "toolbox.textinput.name": "Respuesta de texto simple",
    "toolbox.headertext.name": "Encabezado",
    "toolbox.label.name": "Etiqueta",
    "toolbox.divider.name": "Divisor",
    "toolbox.select.name": "Selección simple",
    "toolbox.tags.name": "Etiquetas",
    "toolbox.checkboxes.name": "Casilla de selección",
    "toolbox.radiobuttons.name": "Botón de radio",
    "toolbox.numberinput.name": "Entrada numérica",
    "toolbox.multilineinput.name": "Entrada texto multilínea",
    "toolbox.datepicker.name": "Calendario",
    "toolbox.slider.name": "Deslizador",
    "toolbox.rangepicker.name": "Selector de rango",
    "toolbox.rate.name": "Rating",
    "btn.cancel": "Cancelar",
    "btn.save": "Guardar",
    "btn.submit": "Enviar",
    "settings.form.questions": "Preguntas",
    "settings.form.options": "Opciones",
    "settings.form.required": "Requerido",
    "confirm.action": "¿Está seguro？",
    "btn.yes": "Si",
    "btn.no": "No",
    "btn.add": "Agregar"
}


Aparte quitar pt ennone-web\node_modules\react-quizzes\lib\ToolBox\index.js en la línea 40


*/

