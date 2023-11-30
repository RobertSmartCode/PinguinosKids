import { AppBar, Toolbar, CssBaseline, Grid, Box, Divider } from "@mui/material";
import PromotionBar from "./PromotionBar/PromotionBar";
import Logo from "./Logo/Logo";
import SearchBar from "./SearchBar/SearchBar";
import MenuButton from "./MenuButton/MenuButton";
import LoginButton from "./LoginButton/LoginButton";
import { Outlet } from "react-router-dom";
import MobileCart from "../NavbarMobile/MobileCart/MobileCart";

const NavbarDesktop = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            {/* Parte superior (25% del espacio) */}
            <Grid item xs={12}>
              <PromotionBar />
            </Grid>

            <Grid item container lg={12}>
              {/* Logo a la izquierda */}
              <Grid item xs={3}>
                <Logo />
              </Grid>

              {/* Barra de búsqueda en el centro */}
              <Grid item xs={7}>
                <SearchBar />
              </Grid>

                {/* Login y Carrito de Compra */}
              <Grid item container xs={2} justifyContent="space-between" spacing={1}>
                <Grid item>
                  <LoginButton />
                </Grid>
                <Grid item>
                  <MobileCart />
                </Grid> 
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
             {/* Parte inferior categorias y tienda (25% del espacio) */}
             <Grid container item lg={12} spacing={2} alignItems="center" justifyContent="center" style={{ height: '100%' }}>
              <Grid item lg={12}>
                <Divider sx={{ backgroundColor: 'black', height: '0.1px'}} />
              </Grid>
              <Grid item lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <MenuButton />
              </Grid>
            </Grid>


      </AppBar>


            {/* Contenedor component="main" para <Outlet /> */}
      
            <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          width: "100%",
          minHeight: "100vh",
          px: 2,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </>
  );
};

export default NavbarDesktop;
