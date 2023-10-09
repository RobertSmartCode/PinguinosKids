import { useRef, useEffect, useState } from "react";
import {
  IconButton,
  Toolbar,
  CssBaseline,
  AppBar,
  Box,
} from "@mui/material";


import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

import { Link, Outlet } from "react-router-dom";

import MobileMenuList from "./MobileMenuList/MobileMenuList";
import MobileLogo from "./MobileLogo/MobileLogo";
import SearchBar from "./SearchBar/SearchBar";
import MobileCart from './MobileCart/MobileCart';

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


const NavbarMobile = (props:any) => {

  
  const { window } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);


  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };


  const handleCartClick = () => {
  setIsCartOpen(!isCartOpen);
};



  const [appBarHeight, setAppBarHeight] = useState<number | null>(null);
  const appBarRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    // Obtener la altura de la AppBar una vez que esté renderizada
    if (appBarRef.current) {
      
      setAppBarHeight(appBarRef.current.clientHeight);
    }
  }, []);


  const Top = `${appBarHeight || 0}px`

  const container = window !== undefined ? () => window().document.body : undefined;

  const logoUrl = "https://firebasestorage.googleapis.com/v0/b/pinguinos-kids.appspot.com/o/LogoMobile%2FLogoMobile.png?alt=media&token=eca73682-14ea-4dbd-803d-31be6a85d6ad";



  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        ref={appBarRef} 
        sx={{
          width: "100%",
          zIndex: 1,
          backgroundColor: customColors.secondary.main // Aquí se le cambia el color al fondo le navbar
        }}
      >
       <Toolbar
        sx={{
        gap: "20px",
        display: "flex",
        justifyContent: "space-between",
        }}
    >
    <div style={{ display: "flex", alignItems: "center" }}>

    {/* Elementos a la izquierda (menú de hamburguesa y Logo de la empresa) */}


                         {/* Menú de hamburguesa */}
    <IconButton
      color="secondary"
      aria-label="toggle menu"
      edge="start"
      onClick={handleMenuToggle}
    >
  {isMenuOpen ? <CloseIcon sx={{ color: customColors.primary.main }} /> : <MenuIcon sx={{ color: customColors.primary.main }} />}
</IconButton>

                            {/* Logo de la Empresa */}

    <Link to="/" style={{ color: "whitesmoke", textDecoration: "none" }}>
    <MobileLogo src={logoUrl} alt="Logo" />
    </Link>
  </div>
  <div style={{ display: "flex", alignItems: "center" }}>

                           {/* Campo de búsqueda */}
   <IconButton
     sx={{ color: customColors.primary.main }}
     aria-label="search"
     onClick={toggleSearch}
    >
    <SearchIcon />
    </IconButton>

                           {/* Icono del carrito */}

    <MobileCart  onClick={handleCartClick} />
          
  </div>
  
</Toolbar>

      </AppBar>

                   {/* Lista de menú */}

     <Box component="nav" aria-label="mailbox folders">
     <MobileMenuList
          handleMenuToggle={handleMenuToggle}
          isMenuOpen={isMenuOpen}
          container={container}
          Top={Top}
        />
     </Box>
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

  {isSearchOpen && (
  <Toolbar>
    <SearchBar isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />
  </Toolbar>
)}


        <Outlet />
      </Box>
    </Box>
  );
 
};

export default NavbarMobile;


