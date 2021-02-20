import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';

function onClick(e, item) {
    //Para autorización
    window.alert(JSON.stringify(' Soy estudiante, estoy en' + item.name , null, 2));
  }

export const items = [
    { name: "/", label: "Inicio", Icon: HomeIcon },
    {
      name: "/list/college",
      label: "Mi Curso",
      Icon: ReceiptIcon,
      items: [
        { name: "/form/college", label: "Registrar nuevo", Icon: ReceiptIcon, onClick },
        { name: "Editar", label: "Editar", Icon: ReceiptIcon, onClick },
        { name: "listar", label: "Listar", Icon: ReceiptIcon, onClick },
      ]
    },
    {
        name: "/list/college",
        label: "Materias",
        Icon: PersonIcon,
        items: [
          { name: "/form/person", label: "Profesores", Icon: PersonIcon, Icon: ReceiptIcon, onClick },
          { name: "/form/person", label: "Alumnos", Icon: PersonIcon, Icon: ReceiptIcon, onClick },
          { name: "/form/person", label: "Autoridades", Icon: PersonIcon, Icon: ReceiptIcon, onClick },
          { name: "Editar", label: "Editar", Icon: ReceiptIcon, onClick },
          { name: "/list/person", label: "Listar", Icon: ReceiptIcon, onClick },
        ]
    },
    {
        name: "/list/college",
        label: "Tareas",
        Icon: ReceiptIcon,
        items: [
          { name: "/form/college", label: "Registrar nuevo", Icon: ReceiptIcon, onClick },
          { name: "Editar", label: "Editar", Icon: ReceiptIcon, onClick },
          { name: "listar", label: "Listar", Icon: ReceiptIcon, onClick },
        ]
    },
    {
        name: "/list/college",
        label: "Exámenes",
        Icon: ReceiptIcon,
        items: [
          { name: "/form/college", label: "Registrar nuevo", Icon: ReceiptIcon, onClick },
          { name: "Editar", label: "Editar", Icon: ReceiptIcon, onClick },
          { name: "listar", label: "Listar", Icon: ReceiptIcon, onClick },
        ]
    },
    {
        name: "/list/college",
        label: "Foros",
        Icon: ReceiptIcon,
        items: [
          { name: "/form/college", label: "Registrar nuevo", Icon: ReceiptIcon, onClick },
          { name: "Editar", label: "Editar", Icon: ReceiptIcon, onClick },
          { name: "listar", label: "Listar", Icon: ReceiptIcon, onClick },
        ]
    },
    {
        name: "/list/college",
        label: "Chats",
        Icon: ReceiptIcon,
        items: [
          { name: "/form/college", label: "Registrar nuevo", Icon: ReceiptIcon, onClick },
          { name: "Editar", label: "Editar", Icon: ReceiptIcon, onClick },
          { name: "listar", label: "Listar", Icon: ReceiptIcon, onClick },
        ]
    },
    {
        name: "/list/college",
        label: "Calendario Académico",
        Icon: ReceiptIcon,
        items: [
          { name: "/form/college", label: "Registrar nuevo", Icon: ReceiptIcon, onClick },
          { name: "Editar", label: "Editar", Icon: ReceiptIcon, onClick },
          { name: "listar", label: "Listar", Icon: ReceiptIcon, onClick },
        ]
    },
    "divider",
    {
      name: "settings",
      label: "Settings",
      Icon: SettingsIcon,
      items: [
        { name: "profile", label: "Profile" },
        { name: "insurance", label: "Insurance", Icon: ReceiptIcon, onClick },
        "divider",
        {
          name: "notifications",
          label: "Notifications",
          Icon: NotificationsIcon,
          items: [
            { name: "email", label: "Email", Icon: ReceiptIcon, onClick },
            {
              name: "desktop",
              label: "Desktop",
              Icon: DesktopWindowsIcon,
              items: [
                { name: "schedule", label: "Schedule" },
                { name: "frequency", label: "Frequency" }
              ]
            },
            { name: "sms", label: "SMS" }
          ]
        }
      ]
    }
  ]

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    items,
}
  