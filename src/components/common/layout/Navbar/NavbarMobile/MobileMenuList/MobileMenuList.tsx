import { useContext } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  SwipeableDrawer,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShopIcon from "@mui/icons-material/Shop";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { menuItems } from "../../../../../../router/navigation";
import { logout } from "../../../../../../firebase/firebaseConfig";
import { AuthContext } from "../../../../../../context/AuthContext";

// Define colores personalizados
const customColors = {
  primary: {
    main: '#000',
    contrastText: '#000',
  },
  secondary: {
    main: '#fff',
    contrastText: '#FFFFFF',
  },
};

interface MobileMenuListProps {
  handleMenuToggle: () => void;
  isMenuOpen: boolean;
  container?: any;
  Top: string;
}

const MobileMenuList: React.FC<MobileMenuListProps> = ({
  handleMenuToggle,
  isMenuOpen,
  container,
  Top
}) => {
  const { logoutContext, isLogged, user } = useContext(AuthContext)!;
  const rolAdmin = import.meta.env.VITE_ROL_ADMIN;


  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    logoutContext();
    navigate("/login");
  };

  return (
    <SwipeableDrawer
      anchor="left"
      open={isMenuOpen}
      onClose={handleMenuToggle}
      onOpen={() => {}}
      container={container}
      sx={{
        display: { xs: "block" },
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 411,
          top: Top,
          backgroundColor: customColors.primary.main, // Usando el color personalizado
          height: "100%",
          zIndex: 1300,
        },
      }}
    >
      <div>
        <List>
          {menuItems.map(({ id, path, title, Icon }) => {
            return (
              <Link key={id} to={path} onClick={handleMenuToggle}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon sx={{ color: customColors.secondary.contrastText }}> {/* Usando el color personalizado */}
                      <SvgIcon>
                        <Icon />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText
                      primary={title}
                      primaryTypographyProps={{
                        sx: { color: customColors.secondary.contrastText }, // Usando el color personalizado
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}

          {!isLogged ? (
            <Link to="/login" onClick={handleMenuToggle}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LoginIcon sx={{ color: customColors.secondary.contrastText }} /> {/* Usando el color personalizado */}
                  </ListItemIcon>
                  <ListItemText
                    primary={"Iniciar sesión"}
                    primaryTypographyProps={{
                      sx: { color: customColors.secondary.contrastText }, // Usando el color personalizado
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ) : null}

          {isLogged && user.rol === rolAdmin && (
            <Link to="/dashboard" onClick={handleMenuToggle}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon sx={{ color: customColors.secondary.contrastText }} /> {/* Usando el color personalizado */}
                  </ListItemIcon>
                  <ListItemText
                    primary={"Dashboard"}
                    primaryTypographyProps={{
                      sx: { color: customColors.secondary.contrastText }, // Usando el color personalizado
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          )}

          {isLogged && user.rol !== rolAdmin && (
            <Link to="/user-orders" onClick={handleMenuToggle}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ShopIcon sx={{ color: customColors.secondary.contrastText }} /> {/* Usando el color personalizado */}
                  </ListItemIcon>
                  <ListItemText
                    primary={"Mis compras"}
                    primaryTypographyProps={{
                      sx: { color: customColors.secondary.contrastText }, // Usando el color personalizado
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          )}

          {isLogged && (
            <ListItem disablePadding onClick={handleLogout}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: customColors.secondary.contrastText }} /> {/* Usando el color personalizado */}
                </ListItemIcon>
                <ListItemText
                  primary={"Cerrar sesión"}
                  primaryTypographyProps={{
                    sx: { color: customColors.secondary.contrastText }, // Usando el color personalizado
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default MobileMenuList;
