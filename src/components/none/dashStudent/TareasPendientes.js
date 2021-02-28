
import MaterialTable from "material-table";
import React from "react";


  export const TareasPendientes = () => {
   
        const tableRef = React.createRef();
      return (
        <MaterialTable        
            title="Lista de pendientes"
            tableRef={tableRef}
                
            columns={[
                {
                    title: 'Tipo',
                    field: 'type',
                    lookup: { 1: 'Tareas', 2: 'Exámenes', 3:'Foros', 4:'Otros' },
                },
                { title: 'Materia', field: 'subject' },
                { title: 'Tarea', field: 'task' },
                { title: 'Fecha entrega', field: 'date' },
                {
                    title: 'Estado',
                    field: 'status',
                    lookup: { 1: 'Pendiente', 2: 'Inciada', 3:'No presentada'},
                }
               
            ]}
            data={[
                
                { type: 1, subject: 'Literatura', task: 'Ensayo libro', date: '12/01/2021', status:1 },
                { type: 2, subject: 'Matemáticas', task: 'Miscelanea', date: '20/01/2021', status:2 },
                { type: 3, subject: 'Física', task: 'Foro sobre Universo', date: '06/01/2021', status:1 },
                { type: 1, subject: 'Computación', task: 'Prueba conectividad', date: '15/01/2021', status:2 },
                { type: 1, subject: 'Historia', task: 'Ensayo indpendencia', date: '22/01/2021', status:2 },
                { type: 2, subject: 'Física', task: 'Examen mensual', date: '12/01/2021', status:1 }

              
            ]}     
            options={{
                selection: false, 
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
                    icon: 'search',
                    tooltip: 'Ver Detalle',
                    onClick: (event, rowData) => alert("Se ha guardado " + rowData.name)
                },
                {
                    icon: 'edit',
                    tooltip: 'Resolver',
                    onClick: (event, rowData) => alert("Se está editando " + rowData.name)
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
    );     
}


  /*
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
*/

 /*
 
 https://material-table.com/#/

 "material-table": "^1.69.2",
  */