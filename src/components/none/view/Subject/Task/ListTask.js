import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MaterialTable from 'material-table';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import { startGetSubjectTasks } from '../../../../../redux/actions/task';
import { useHistory } from 'react-router-dom';
import { getSubjectTask, startTaskSelection } from '../../../../../redux/actions/task';


const useStyles = makeStyles((theme) => ({
    spiner: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2)
      }
    }
  }
));

export const ListTask = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();

    let subject = useSelector( state => state.subject.selectedSubject );
    const { checking } = useSelector( state => state.task );


    useEffect(() => {
        if(subject.subjectID){
           
            const loadTasks = () => dispatch( startGetSubjectTasks( subject.subjectID ) );
            loadTasks();
        }
    }, []);

    if(!subject){
        subject = { subjectName: 'POR FAVOR SELECCIONE UN CURSO' }
    }

    let tasks = useSelector( state => state.task.subjectTasks.rows );
    if(!tasks){
        tasks = []
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
    const handleViewActions = ( task ) => {
        dispatch( startTaskSelection(task) );
        history.push('/list/task');
    }


    return (
        <>
            <h2> Lista de Materias de: { subject.subjectName }</h2>
            <MaterialTable 
                title={ 'Materias' }
                columns={[
                    { title: 'Código', field: 'taskCode' },
                    { title: 'Nombre', field: 'taskName' },
                    { title: 'Descripción', field: 'description' },
                    { title: 'Profesor', field: 'teacher.person.completeName' },
                    { title: 'Activo', field: 'isActive', lookup: { true: 'Si', false: 'No' }}
                ]}
                data={ tasks }
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
                        //onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                        onClick: () => {
                            handleTaskCreation();
                            console.log('Formulario de creación de materia');
                        } 
                    },
                    {
                        icon: 'visibility',
                        tooltip: 'Ver',
                        onClick: (event, rowData) => {
                            //alert("Se envía a ver " + rowData.subjectID + ' ' + rowData.taskName) 
                            handleViewActions( rowData );
                           //console.log('Acción');
                            //handleCreateTask();
                        }
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Editar',
                        onClick: (event, rowData) => alert("Se está editando " + rowData.taskName)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar',
                        onClick: (event, rowData) => alert("Se está eliminando" + rowData.taskName)
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
