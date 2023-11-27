import { AppBar, Toolbar, CssBaseline, Grid } from "@mui/material";
import PromotionBar from "./PromotionBar/PromotionBar";
import Logo from "./Logo/Logo";
import SearchBar from "./SearchBar/SearchBar";
import MenuButton from "./MenuButton/MenuButton";
import LoginButton from "./LoginButton/LoginButton";
import ShoppingCartIcon from "./ShoppingCart/ShoppingCart";

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

            <Grid item container xs={12}>
              {/* Logo a la izquierda */}
              <Grid item xs={3}>
                <Logo />
              </Grid>

              {/* Barra de búsqueda en el centro */}
              <Grid item xs={7}>
                <SearchBar />
              </Grid>

              <Grid item container xs={2} justifyContent="space-between" spacing={1}>
                <Grid item>
                  <LoginButton />
                </Grid>
                <Grid item>
                  <ShoppingCartIcon />
                </Grid> 
              </Grid>
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavbarDesktop;
