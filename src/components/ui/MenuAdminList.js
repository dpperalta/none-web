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
import RegaloIcon from '@material-ui/icons/Redeem';



function onClick(e, item) {
    //Para autorización
    //window.alert(JSON.stringify(' Soy el administrador, estoy en ' + item.name , null, 2));
  }

export const items = [
   
  {
    name: "colleges", label: "Colegios", Icon: HomeIcon,
    items: [
      { name: "/form/college", label: "Registrar nuevo", Icon: RegistrarIcon, onClick },
      { name: "/list/college", label: "Gestionar colegios", Icon: ListarIcon, onClick },
      { name: "/form/college-rules", label: "Parametrización", Icon: SettingsIcon, onClick }
    ]
},  
  {
    name: "periods", label: "Periodo académico", Icon: CalendarioIcon,
    items: [
      { name: "/form/academic-period", label: "Registrar nuevo", Icon: RegistrarIcon, onClick },
      { name: "/list/general", label: "Gestionar periodos", Icon: ListarIcon, onClick },
      { name: "/list/calendar", label: "Calendario académico", Icon: CalendarioIcon, onClick },
    ]
},  
{
  name: "persons", label: "Personas", Icon: PersonasIcon,
  items: [
    { name: "/form/person", label: "Registrar personal", Icon: RegistrarIcon, onClick },
    { name: "/list/person", label: "Gestionar personal", Icon: ListarIcon, onClick },
  ]
}, 
  {
      name: "/", label: "Cursos", Icon: CursoIcon,
      items: [
        { name: "/form/course", label: "Registrar curso", Icon: RegistrarIcon, onClick },
        { name: "/list/course", label: "Gestionar cursos", Icon: ListarIcon, onClick }
      ]
  },
  
    {
        name: "subjects",
        label: "Materias",
        Icon: MateriaIcon,
        items: [
          { name: "/form/subject", label: "Registrar materia", Icon: RegistrarIcon, onClick },
          { name: "/list/subject", label: "Gestionar materias", Icon: ListarIcon, onClick },
          { name: "/form/subject-enroll", label: "Asignar profesores", Icon: RegistrarIcon, onClick },
          { name: "/form/subject-rules", label: "Parametrización", Icon: SettingsIcon, onClick }
        ]
    },
    "divider",
    {
      name: "mails",
      label: "Notificaciones",
      Icon: CorreoIcon,
      items: [
        { name: "/mail/new", label: "Crear nuevo", Icon: Correo2Icon, onClick },
        { name: "/mail/inbox", label: "Bandeja", Icon: BandejaIcon, onClick },
        { name: "/mail/sent", label: "Enviados", Icon: EnviadoIcon, onClick }
      ]
  },
    "divider",
    
  {
    name: "reports",
    label: "Reportes",
    Icon: ReportesIcon,
    items: [
      { name: "/report/grade", label: "Uso del sistema", Icon: ReporteIcon, onClick }
      
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
  