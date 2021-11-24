import Dashboard from "@material-ui/icons/Dashboard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { HomeSeller } from "../../Seller/pages/HomeSeller";



const dashboardRoutes = [
  {
    path: "/Dashboard",
    name: "Perfil",
    icon: AccountCircleIcon,
   
  },
  {
    path: "/HomeUser",
    name: "Productos",
    icon: Dashboard,

  },
  {
    path: "/ShoppingCart",
    name: "Carrito de Compras",
    icon: AddShoppingCartIcon,
  },
  {
    path: "/dashboard",
    name: "Conoce tus gastos",
    icon: AccountBalanceWalletIcon,
  },
];

export default dashboardRoutes;