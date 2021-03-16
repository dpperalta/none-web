import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MaterialTable from 'material-table';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { startGetTeacherStudents } from '../../../../../redux/actions/student';

const useStyles = makeStyles((theme) => ({
    spiner: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2)
      }
    }
  }
));

export const ListStudentCourse = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();

    const course = useSelector( state => state.course );
    let teacher = useSelector( state => state.teacher.authTeacher );

    const { checking } = useSelector( state => state.student );

    // Load all students of course of teacher
    useEffect(() => {
        if(teacher.teacherid){
            const loadStudents = () => dispatch( startGetTeacherStudents( teacher.teacherid ) );
            loadStudents();
        } 
    }, []);

    let students = useSelector( state => state.student.studentTeacher );
    if(!students){
        students = [];
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
            <h1>Lista de estudiantes</h1>
            <MaterialTable 
                title={ 'Alumnos' }
                columns={[
                    { title: 'Código', field: 'studentCode' },
                    { title: 'Nombre', field: 'completeName' },
                    { title: 'Curso', field: 'courseName' },
                    { title: 'Materia', field: 'subjectName' },
                    { title: 'Activo', field: 'isActive', lookup: { true: 'Si', false: 'No' }}
                ]}
                data={ students }
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
                    /*{
                        icon: 'add_box',
                        tooltip: 'Crear tarea',
                        isFreeAction: true,
                        onClick: () => {
                            //handleTaskCreation();
                            console.log('Review this task');
                        } 
                    },*/
                    {
                        icon: 'visibility',
                        tooltip: 'Ver',
                        onClick: (event, rowData) => {
                            console.log("Se envía a ver " + rowData.studentID + ' ' + rowData.completeName);
                            //handleViewSubject( rowData );
                        }
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Editar',
                        onClick: (event, rowData) => {
                            console.log("Se está editando " + rowData.completeName);
                            //handleViewSubject( rowData );
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar',
                        onClick: (event, rowData) => {
                            console.log("Se está eliminando" + rowData.subjectName);
                        }
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