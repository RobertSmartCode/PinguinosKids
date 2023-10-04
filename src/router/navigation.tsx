import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
// import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";


interface MenuItem {
  id: string;
  path: string;
  title: string;
  Icon: React.ComponentType;
}

export const menuItems: MenuItem[] = [
  {
    id: "home",
    path: "/",
    title: "Inicio",
    Icon: HomeIcon
  },
  {
    id: "products",
    path: "/shop",
    title: "Tienda",
    Icon: StoreIcon
  },
  // {
  //   id: "cart",
  //   path: "/cart",
  //   title: "Carrito",
  //   Icon: ShoppingCartCheckoutIcon
  // }
  
];