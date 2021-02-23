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
    window.alert(JSON.stringify(' Soy profesor, estoy en ' + item.name , null, 2));
  }

export const items = [
   
    {
      name: "/", label: "Mis cursos", Icon: HomeIcon,
      items: [
        { name: "/list/general", label: "Resumen general", Icon: ListarIcon, onClick },
        { name: "/list/calendar", label: "Calendario académico", Icon: CalendarioIcon, onClick },
        { name: "/list/dashboard", label: "Dashboard", Icon: ReportesIcon, onClick }
      ]
  },
  
    {
        name: "subjects",
        label: "Mis materias",
        Icon: MateriaIcon,
        items: [
          { name: "/list/subject", label: "Mis materias", Icon: ListaIcon, onClick },
          { name: "/report/assistance", label: "Registrar asistencias", Icon: PresenciaIcon, onClick },
          { name: "/form/permission", label: "Registrar permisos", Icon: PermisoIcon, onClick },
          { name: "/form/gifts", label: "Registrar incentivos", Icon: RegaloIcon, onClick },
          { name: "/list/content", label: "Gestionar contenido", Icon: SubirIcon, onClick }
        ]
    },
    {
        name: "tasks",
        label: "Tareas",
        Icon: TareaIcon,
        items: [
          { name: "/form/task", label: "Nueva tarea", Icon: RegistrarIcon, onClick },
          { name: "/list/task", label: "Listar tareas", Icon: ListaIcon, onClick },
          { name: "/form/task-resolve", label: "Calificar tareas", Icon: DeberIcon, onClick },
          { name: "/report/task", label: "Calificaciones", Icon: ReporteIcon, onClick }
        ]
    },
    {
        name: "exams",
        label: "Exámenes",
        Icon: ExamenIcon,
        items: [
          { name: "/form/exam", label: "Nuevo examen", Icon: RegistrarIcon, onClick },
          { name: "/list/exam", label: "Listar exámenes", Icon: ListaIcon, onClick },
          { name: "/form/exam-resolve", label: "Calificar exámenes", Icon: ReceiptIcon, onClick },
          { name: "/report/exam", label: "Calificaciones", Icon: ReporteIcon, onClick }
        ]
    },
    "divider",
    {
        name: "/list/college",
        label: "Foros",
        Icon: ForoIcon,
        items: [
          { name: "/forum/create", label: "Nuevo foro", Icon: RegistrarIcon, onClick },
          { name: "/forum/class", label: "Foros de clase", Icon: Foro2Icon, onClick },
          { name: "/forum/global", label: "Foros generales", Icon: Foro3Icon, onClick },
          { name: "report/activiry", label: "Alumnos de foros", Icon: PersonasIcon, onClick },
          
        ]
    },
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
    {
        name: "chats",
        label: "Chats",
        Icon: ChatIcon,
        items: [
          { name: "/chat/one", label: "Individual", Icon: Chat2Icon, onClick },
          { name: "/chat/group", label: "Grupal", Icon: ChatIcon, onClick },
          { name: "/chat/list", label: "Lista Chats", Icon: ListaIcon, onClick },
        ]
    },
    "divider",
    
  {
    name: "reports",
    label: "Reportes",
    Icon: ReportesIcon,
    items: [
      { name: "/report/grade", label: "Libreta calificaciones", Icon: ReporteIcon, onClick },
      { name: "/report/subject", label: "Resumen mis materias", Icon: ReporteIcon, onClick },
      { name: "/report/assistance", label: "Resumen mis alumnos", Icon: ReporteIcon, onClick }
      
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
  