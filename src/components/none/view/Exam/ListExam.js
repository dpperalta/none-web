import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MaterialTable from 'material-table';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import { startGetSubjectExams } from '../../../../redux/actions/exam';
import { useHistory } from 'react-router-dom';
import { getSubjectExam, startExamSelection } from '../../../../redux/actions/exam';
import QuizExample from "../Exam/ExamMaker/PreviewExam";


const useStyles = makeStyles((theme) => ({
    spiner: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2)
      }
    }
  }
));

export const ListExam = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();

    let subject = useSelector( state => state.subject.selectedSubject );
    const { checking } = useSelector( state => state.exam );
    const [formdata, setFormData] = useState([]);

    useEffect(() => {
        if(subject.subjectID){
           
            const loadExams = () => dispatch( startGetSubjectExams( subject.subjectID ) );
            loadExams();
        }
    }, []);

    if(!subject){
        subject = { subjectName: 'POR FAVOR SELECCIONE UN CURSO' }
    }

    let exams = useSelector( state => state.exam.subjectExams.rows );
    console.log("Los examenes",exams)
    if(!exams){
        exams = []
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

    const handleExamCreation = () => {
        history.push('/form/exam');
    }
    const handleViewActions = ( exam ) => {
        //dispatch( startExamSelection(exam) );
        history.push('/form/exam-generator');
    }

   
    

    return (
        <>
            <h2> Lista de Exámenes de: { subject.subjectName }</h2>
            <MaterialTable 
                title={ 'Exámenes' }
                columns={[
                    { title: 'Código', field: 'examID' },
                    { title: 'Materia', field: 'subject.subjectName' },
                    { title: 'Tipo', field: 'isPartial', lookup: { true: 'Parcial', false: 'Final' }},
                    { title: 'Fecha Inicio', field: 'startDate' },
                    { title: 'Hora Inicio', field: 'startHour' },
                    { title: 'Fecha Fin', field: 'endDate' },
                    { title: 'Hora Fin', field: 'endHour' },
                    { title: 'Activo', field: 'isActive', lookup: { true: 'Si', false: 'No' }}
                ]}
                data={ exams }
                options={{
                    selection: false, //Se se habilita, permite acciones grupales (sobre los seleccionados)
                    sorting: true,
                    filtering:true,
                    search: true,
                    grouping: true,
                    exportButton: true,
                    actionsColumnIndex: -1,
                    rowStyle: {
                        fontFamily:'Roboto'
                    }
                }}
                actions={[
                    {
                        icon: 'add_box',
                        tooltip: 'Crear examen',
                        isFreeAction: true,
                        //onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                        onClick: () => {
                            handleExamCreation();
                        } 
                    },
                    {
                        icon: 'visibility',
                        tooltip: 'Ver',
                        onClick: (event, rowData) => {
                         <QuizExample data={formdata} />
                        }
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Gestionar preguntas',
                        onClick: (event, rowData) => {
                            handleViewActions( rowData );
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar',
                        onClick: (event, rowData) => alert("Se está eliminando" + rowData.examName)
                    }
                ]}
                localization={{
                    pagination: {
                        labelRowsSelect: 'filas',
                        labelDisplayedRows: '{count} de {from}-{to}',
                        firstTooltip: 'Primera página',
                        previousTooltip: 'Página anterior',
                        nextTooltip: 'Próxima página',
                        lastTooltip: 'Última página',
                        labelRowsPerPage: 'Filas por página:'
                    },
                    grouping: {
                        placeholder: 'Arrastrar encabezados aquí',
                        groupedBy: 'Agrupado por'
                    },
                    toolbar: {
                        nRowsSelected: '{0} filas(s) seleccionadas',
                        searchTooltip: 'Buscar',
                        exportTitle:'Exportar',
                        exportAriaLabel:'Exportar',
                        exportName:'Exportar CSV',
                        searchPlaceholder:'Buscar'
                    },
                    header: {
                        actions: 'Acciones'
                    },
                    body: {
                        emptyDataSourceMessage: 'No hay datos',
                        filterRow: {
                            filterTooltip: 'Filtrar'
                        }
                    }
                }}
            />
        </>
    )
}
