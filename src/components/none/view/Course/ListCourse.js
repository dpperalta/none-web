import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MaterialTable from 'material-table';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

import { getCollegeInformation } from '../../../../redux/actions/college';
import { getCollegeCourse } from '../../../../redux/actions/course';


const useStyles = makeStyles((theme) => ({
    spiner: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2)
      }
    }
  }));

export const ListCourse = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const { collegeID } = useSelector( state => state.auth.user  );
    const { checking } = useSelector( state => state.college );
    
    useEffect(() => {
        const loadCollege = () => dispatch( getCollegeInformation(collegeID) );
        loadCollege();
        const loadCollegeCourses = () => dispatch( getCollegeCourse( collegeID ) );
        loadCollegeCourses();
    }, []);
    
    let usersCollege = useSelector( state => state.college.usersCollege );
    if(!usersCollege){
        usersCollege = '';
    }

    let courses = useSelector( state => state.course.collegeCourses.rows );
    if(!courses) {
        courses = [];
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
            <MaterialTable
                title={`Cursos de ${ usersCollege.collegeShowName }:` }
                columns={[
                    { title: 'Código', field: 'courseCode' },
                    { title: 'Nombre', field: 'courseName' },
                    { title: 'Descripción', field: 'description' },
                    { title: 'Activo', field: 'isActive', lookup: { true: 'Si', false: 'No' }}
                ]}
                data={ courses }
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
                    icon: 'refresh',
                    tooltip: 'Actualizar datos',
                    isFreeAction: true,
                    //onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                    onClick: () => console.log('Acción'),
                    },
                    {
                        icon: 'visibility',
                        tooltip: 'Ver',
                        onClick: (event, rowData) => alert("Se ha guardado " + rowData.courseName)
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Editar',
                        onClick: (event, rowData) => alert("Se está editando " + rowData.courseName)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar',
                        onClick: (event, rowData) => alert("Se está eliminando" + rowData.courseName)
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