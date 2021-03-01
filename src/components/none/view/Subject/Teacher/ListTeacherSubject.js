import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MaterialTable from 'material-table';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { startGettingTeacherSubjects, startSubjectSelection } from '../../../../../redux/actions/subject';


const useStyles = makeStyles((theme) => ({
    spiner: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2)
      }
    }
  }
));

export const ListTeacherSubject = () => {
    
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();

    let teacher = useSelector( state => state.teacher.authTeacher );
    const { checking } = useSelector( state => state.subject );

    // Load all subjects of the teacher
    useEffect(() => {
        if(teacher.teacherid){
            const loadSubjects = () => dispatch( startGettingTeacherSubjects(teacher.teacherid) );
            loadSubjects();
        }
    }, []);

    let subjects = useSelector( state => state.subject.teacherSubjects.rows );
    if(!subjects){
        subjects = []
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

    const handleTaskCreation = () => {
        history.push('/form/task');   
    }

    const handleViewSubject = ( subject ) => {
        dispatch( startSubjectSelection( subject ) );
        history.push('/list/task');
    }

    return (
        <>
            <h1>Materias de { teacher.completename }</h1>
            <MaterialTable
                title={ 'Materias' }
                columns={[
                    { title: 'Código', field: 'subjectCode' },
                    { title: 'Nombre', field: 'subjectName' },
                    { title: 'Descripción', field: 'description' },
                    { title: 'Activo', field: 'isActive', lookup: { true: 'Si', false: 'No' }}
                ]}
                data={ subjects }
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
                        tooltip: 'Crear tarea',
                        isFreeAction: true,
                        onClick: () => {
                            handleTaskCreation();
                        } 
                    },
                    {
                        icon: 'visibility',
                        tooltip: 'Ver',
                        onClick: (event, rowData) => {
                            //alert("Se envía a ver " + rowData.subjectID + ' ' + rowData.subjectName) 
                            handleViewSubject( rowData );
                        }
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Editar',
                        onClick: (event, rowData) => {
                            alert("Se está editando " + rowData.subjectName)
                            //handleViewSubject( rowData );
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar',
                        onClick: (event, rowData) => alert("Se está eliminando" + rowData.subjectName)
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