import {
  LayoutDashboard,
  Car,
  Wrench,
  FileText,
  LogOut,
  Menu,
  X,
  ArrowLeft,
  ArrowRight,
  MoreVertical,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Download,
  Upload,
  Search,
  Filter,
  RefreshCw,
  Save,
  Share2,
  Copy,
  ExternalLink,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
  Clock,
  Bell,
  BellOff,
  Gauge,
  Navigation,
  MapPin,
  Route,
  Fuel,
  Zap,
  Key,
  DollarSign,
  TrendingDown,
  TrendingUp,
  TrendingUpDown,
  Wallet,
  CreditCard,
  Receipt,
  Coins,
  Toolbox,
  Cog,
  Shield,
  Battery,
  Droplet,
  Wind,
  FileCode,
  Folder,
  FolderOpen,
  Image,
  Paperclip,
  Lightbulb,
  Target,
  BarChart2,
  PieChart,
  LineChart,
  Activity,
  Calendar,
  CalendarDays,
  Timer,
  User,
  Users,
  UserCircle,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Heart,
  Star,
  Bookmark,
  Tag,
  Link,
  Globe,
  Home,
} from "lucide-react";

export const StatsIcons = {
  trendingDown: TrendingDown,
  trendingUp: TrendingUp,
  trendingUpDown: TrendingUpDown,
} as const;

export const navigationIcons = {
  dashboard: LayoutDashboard,
  vehicles: Car,
  maintenance: Wrench,
  documents: FileText,
  settings: Settings,
  logout: LogOut,
} as const;

export const actionIcons = {
  add: Plus,
  edit: Edit2,
  delete: Trash2,
  download: Download,
  upload: Upload,
  search: Search,
  filter: Filter,
  refresh: RefreshCw,
  save: Save,
  share: Share2,
  copy: Copy,
  menu: Menu,
  close: X,
  back: ArrowLeft,
  forward: ArrowRight,
  more: MoreVertical,
  external: ExternalLink,
} as const;

export const statusIcons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: AlertCircle,
  pending: Clock,
  notification: Bell,
  notificationOff: BellOff,
} as const;

export const categoryIcons = {
  fuel: Fuel,
  electric: Zap,
  maintenance: Wrench,
  insurance: Shield,
  parking: MapPin,
  tolls: Route,
  washing: Droplet,
  accessories: Toolbox,
  registration: FileText,
  financing: Wallet,
  other: FileText,
} as const;

export const vehicleIcons = {
  car: Car,
  mileage: Gauge,
  navigation: Navigation,
  location: MapPin,
  route: Route,
  key: Key,
} as const;

export const financeIcons = {
  dollar: DollarSign,
  wallet: Wallet,
  card: CreditCard,
  receipt: Receipt,
  coins: Coins,
  trendUp: TrendingUp,
} as const;

export const maintenanceStatusIcons = {
  upcoming: Clock,
  done: CheckCircle2,
  overdue: AlertCircle,
  inProgress: RefreshCw,
} as const;

export const documentIcons = {
  file: FileText,
  code: FileCode,
  folder: Folder,
  folderOpen: FolderOpen,
  image: Image,
  attachment: Paperclip,
} as const;

export const insightIcons = {
  tip: Lightbulb,
  warning: AlertTriangle,
  success: TrendingUp,
  info: Info,
  target: Target,
} as const;

export const chartIcons = {
  bar: BarChart2,
  pie: PieChart,
  line: LineChart,
  activity: Activity,
} as const;

export const timeIcons = {
  calendar: Calendar,
  calendarDays: CalendarDays,
  clock: Clock,
  timer: Timer,
} as const;

export const userIcons = {
  user: User,
  users: Users,
  userCircle: UserCircle,
  mail: Mail,
  phone: Phone,
  lock: Lock,
} as const;

export const serviceIcons = {
  oil: Droplet,
  tire: Wind,
  battery: Battery,
  brake: Shield,
  toolbox: Toolbox,
  wrench: Wrench,
  cog: Cog,
} as const;

export const interactionIcons = {
  eye: Eye,
  eyeOff: EyeOff,
  heart: Heart,
  star: Star,
  bookmark: Bookmark,
  tag: Tag,
  link: Link,
} as const;

export const utilityIcons = {
  globe: Globe,
  home: Home,
  info: Info,
} as const;

export const icons = {
  stats: StatsIcons,
  navigation: navigationIcons,
  action: actionIcons,
  status: statusIcons,
  category: categoryIcons,
  vehicle: vehicleIcons,
  finance: financeIcons,
  maintenanceStatus: maintenanceStatusIcons,
  document: documentIcons,
  insight: insightIcons,
  chart: chartIcons,
  time: timeIcons,
  user: userIcons,
  service: serviceIcons,
  interaction: interactionIcons,
  utility: utilityIcons,
} as const;

export type IconComponent = typeof Car;

export function getIcon(
  category: keyof typeof icons,
  name: string,
): IconComponent | undefined {
  const categoryIcons = icons[category] as Record<string, IconComponent>;
  return categoryIcons[name];
}

export function getCategoryIcon(category: string): IconComponent {
  const categoryMap: Record<string, IconComponent> = {
    fuel: categoryIcons.fuel,
    electric: categoryIcons.electric,
    maintenance: categoryIcons.maintenance,
    insurance: categoryIcons.insurance,
    parking: categoryIcons.parking,
    tolls: categoryIcons.tolls,
    washing: categoryIcons.washing,
    accessories: categoryIcons.accessories,
    registration: categoryIcons.registration,
    financing: categoryIcons.financing,
    other: categoryIcons.other,
  };

  return categoryMap[category.toLowerCase()] || categoryIcons.other;
}

export function getMaintenanceStatusIcon(status: string): IconComponent {
  const statusMap: Record<string, IconComponent> = {
    upcoming: maintenanceStatusIcons.upcoming,
    done: maintenanceStatusIcons.done,
    completed: maintenanceStatusIcons.done,
    overdue: maintenanceStatusIcons.overdue,
    in_progress: maintenanceStatusIcons.inProgress,
    scheduled: maintenanceStatusIcons.upcoming,
  };

  return statusMap[status.toLowerCase()] || maintenanceStatusIcons.upcoming;
}

export default icons;
