import HomeIcon from "@material-ui/icons/School";
import ReceiptIcon from "@material-ui/icons/Receipt";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import CalendarioIcon from '@material-ui/icons/EventNote';
import ForoIcon from '@material-ui/icons/Forum';
import ChatIcon from '@material-ui/icons/Sms';
import PersonaIcon from '@material-ui/icons/Portrait';
import PersonasIcon from '@material-ui/icons/People';
import CrearIcon from '@material-ui/icons/PlaylistAdd';
import Editar2Icon from '@material-ui/icons/MenuOpen';
import RevisarIcon from '@material-ui/icons/PlaylistAddCheck';
import CampanaIcon from '@material-ui/icons/NotificationsActive';
import DeberIcon from '@material-ui/icons/NoteAdd';
import BajarContenidoIcon from '@material-ui/icons/MoveToInbox';
import CorreoIcon from '@material-ui/icons/Mail';
import Correo2Icon from '@material-ui/icons/MailOutline';
import ListaIcon from '@material-ui/icons/FormatListNumbered';
import ExamenIcon from '@material-ui/icons/AssignmentTurnedIn';
import CopiarIcon from '@material-ui/icons/FileCopy';
import TareaIcon from '@material-ui/icons/Description';
import MateriaIcon from '@material-ui/icons/Apps';
import CursoIcon from '@material-ui/icons/GroupWork';
import RegistrarIcon from '@material-ui/icons/PlaylistAdd';
import EditarIcon from '@material-ui/icons/Update';
import ListarIcon from '@material-ui/icons/ListAlt';
import PagosIcon from '@material-ui/icons/MonetizationOn';
import PagarIcon from '@material-ui/icons/Payment';
import FacturaIcon from '@material-ui/icons/Receipt';
import ReportesIcon from '@material-ui/icons/PieChart';
import PerfilIcon from '@material-ui/icons/PersonPin';
import PasswordIcon from '@material-ui/icons/VpnKey';
import AndroidIcon from '@material-ui/icons/PhoneAndroid';
import ReporteIcon from '@material-ui/icons/BarChart';
import Chat2Icon from '@material-ui/icons/Chat';
import BandejaIcon from '@material-ui/icons/AllInbox';
import EnviadoIcon from '@material-ui/icons/Telegram';
import Foro2Icon from '@material-ui/icons/SpeakerNotes';
import Foro3Icon from '@material-ui/icons/Comment';
import SubirIcon from '@material-ui/icons/Publish';
import BajarIcon from '@material-ui/icons/SystemUpdateAlt';
import Subir2Icon from '@material-ui/icons/AttachFile';
import PresenciaIcon from '@material-ui/icons/PanTool';
import PermisoIcon from '@material-ui/icons/ImportContacts';



function onClick(e, item) {
    //Para autorización
    window.alert(JSON.stringify(' Soy representante, estoy en ' + item.name , null, 2));
  }

export const items = [
   
    {
      name: "/", label: "Mis representados", Icon: HomeIcon,
      items: [
        { name: "/list/general", label: "Resumen general", Icon: ListarIcon, onClick },
        { name: "/list/calendar", label: "Calendario académico", Icon: CalendarioIcon, onClick },
        { name: "/list/dashboard", label: "Dashboard", Icon: ReportesIcon, onClick }
      ]
  },
  
    {
        name: "subjects",
        label: "Materias",
        Icon: MateriaIcon,
        items: [
          { name: "/list/subject", label: "Lista de materias", Icon: ListaIcon, onClick },
          { name: "/report/assistance", label: "Asistencias", Icon: PresenciaIcon, onClick },
          { name: "/form/permission", label: "Permisos", Icon: PermisoIcon, onClick },
        ]
    },
    {
        name: "tasks",
        label: "Tareas",
        Icon: TareaIcon,
        items: [
          { name: "/list/task", label: "Tareas Pendientes", Icon: ListaIcon, onClick },          
          { name: "/report/task", label: "Calificaciones", Icon: ReporteIcon, onClick }
        ]
    },
    {
        name: "exams",
        label: "Exámenes",
        Icon: ExamenIcon,
        items: [
          { name: "/list/exam", label: "Exámenes Pendientes", Icon: ListaIcon, onClick },
          { name: "/report/exam", label: "Calificaciones", Icon: ReporteIcon, onClick }
        ]
    },
    "divider",
    {
      name: "mails",
      label: "Correo",
      Icon: CorreoIcon,
      items: [
        { name: "/mail/new", label: "Crear nuevo", Icon: Correo2Icon, onClick },
        { name: "/mail/inbox", label: "Bandeja", Icon: BandejaIcon, onClick },
        { name: "/mail/sent", label: "Enviados", Icon: EnviadoIcon, onClick }
      ]
  },
      "divider",
    {
      name: "payments",
      label: "Pensiones",
      Icon: PagosIcon,
      items: [
        { name: "/payment/pay", label: "Pagar pensiones", Icon: PagarIcon, onClick },
        { name: "/payment/bill", label: "Facturas", Icon: FacturaIcon, onClick },
        { name: "/report/payment", label: "Historial de pagos", Icon: ReporteIcon, onClick }
       
      ]
  },
  {
    name: "reports",
    label: "Reportes",
    Icon: ReportesIcon,
    items: [
      { name: "/report/grade", label: "Libreta calificaciones", Icon: ReporteIcon, onClick },
      { name: "/report/subject", label: "Resumen materias", Icon: ReporteIcon, onClick },
      { name: "/report/assistance", label: "Asistencias", Icon: ReporteIcon, onClick },
      { name: "/report/persmission", label: "Permisos", Icon: ReporteIcon, onClick }
      
    ]
},
    "divider",
    {
      name: "settings",
      label: "Configuraciones",
      Icon: SettingsIcon,
      items: [
        { name: "/config/edit-profile", label: "Mi Información", Icon: PerfilIcon, onClick },
        { name: "/config/edit-password", label: "Cambiar contraseña", Icon: PasswordIcon, onClick },
        
        {
          name: "notifications",
          label: "Notificationes",
          Icon: NotificationsIcon,
          items: [
            { name: "/config/notify-mail", label: "Por correo", Icon: Correo2Icon, onClick },
            { name: "/config/notify-webapp", label: "En WebApp", Icon: DesktopWindowsIcon, onClick },
            { name: "/config/notify-mobile", label: "En Smartphone", Icon: AndroidIcon, onClick }
          ]
        }
      ]
    }
  ]

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    items,
}
  