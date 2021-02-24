
import MaterialTable from "material-table";
import React from "react";

  export const TableIndividual = () => {
   
        const tableRef = React.createRef();
      return (
        <MaterialTable        
            title="Tabla con acciones individuales"
            tableRef={tableRef}
                /* 
                // Estos datos consumen una API remota de prueba
                columns={[
                    {
                    title: 'Avatar',
                    field: 'avatar',
                    render: rowData => (
                        <img
                        style={{ height: 36, borderRadius: '50%' }}
                        src={rowData.avatar}
                        />
                    ),
                    },
                    { title: 'Id', field: 'id' },
                    { title: 'First Name', field: 'first_name' },
                    { title: 'Last Name', field: 'last_name' },
                ]}
                data={query =>
                    new Promise((resolve, reject) => {
                    let url = 'https://reqres.in/api/users?'
                    url += 'per_page=' + query.pageSize
                    url += '&page=' + (query.page + 1)
                    fetch(url)
                        .then(response => response.json())
                        .then(result => {
                        resolve({
                            data: result.data,
                            page: result.page - 1,
                            totalCount: result.total,
                        })
                        })
                    })
                }
                */
            columns={[
                { title: 'Nombre', field: 'name' },
                { title: 'Apellido', field: 'surname' },
                { title: 'Año de nacimiento', field: 'birthYear', type: 'numeric' },
                {
                title: 'Lugar de nacimiento',
                field: 'birthCity',
                lookup: { 34: 'Loja 1', 63: 'loja 2', 99:'Tangamandapio' },
                },
            ]}
            data={[
                { name: 'Diego', surname: 'Peralta', birthYear: 1984, birthCity: 63 },
                { name: 'Carlos', surname: 'Roman', birthYear: 1984, birthCity: 34 },
                { name: 'Oscar', surname: 'Peralta', birthYear: 1983, birthCity: 34 },
                { name: 'César', surname: 'Rojas', birthYear: 1987, birthCity: 99 },
                { name: 'Diego1', surname: 'Peralta1', birthYear: 1984, birthCity: 63 },
                { name: 'Carlos1', surname: 'Roman1', birthYear: 1984, birthCity: 34 },
                { name: 'Oscar1', surname: 'Peralta1', birthYear: 1983, birthCity: 34 },
                { name: 'César1', surname: 'Rojas1', birthYear: 1987, birthCity: 99 }
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
                icon: 'refresh',
                tooltip: 'Actualizar datos',
                isFreeAction: true,
                onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                },
                {
                    icon: 'save',
                    tooltip: 'Guardar',
                    onClick: (event, rowData) => alert("Se ha guardado " + rowData.name)
                },
                {
                    icon: 'edit',
                    tooltip: 'Editar',
                    onClick: (event, rowData) => alert("Se está editando " + rowData.name)
                },
                {
                    icon: 'delete',
                    tooltip: 'Eliminar',
                    onClick: (event, rowData) => alert("Se está eliminando" + rowData.name)
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