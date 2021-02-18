import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import BarChartIcon from '@material-ui/icons/BarChart';
import PeopleIcon from '@material-ui/icons/People';
import MessageIcon from '@material-ui/icons/Message';
import ArrowBack from '@material-ui/icons/ArrowBack';
/* export const mainMenuList = () => {
    return ( */
export const mainMenuList = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Materias" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BorderColorIcon />
            </ListItemIcon>
            <ListItemText primary="Resolver Tareas" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reportes" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Lista de Contactos" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <MessageIcon />
            </ListItemIcon>
            <ListItemText primary="Mensajería" />
        </ListItem>
    </div>
);
/*     );
} */

/* export const secondMenuItems  = () => {
    return ( */
export const secondMenuItems = (
    <div>
        <ListSubheader inset>
            Tareas Pendientes
        </ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <ArrowBack />
            </ListItemIcon>
            <ListItemText primary="Semana Actual" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ArrowBack/>
            </ListItemIcon>
            <ListItemText primary="Próxima Semana" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ArrowBack />
            </ListItemIcon>
            <ListItemText primary="Tareas Pasadas" />
        </ListItem>
    </div>
);
/*     );
}
 */