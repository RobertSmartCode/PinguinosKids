import React, { useContext, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Typography } from "@mui/material";
import ShippingMethods from "../../common/layout/Navbar/NavbarMobile/MobileCart/ShippingMethods/ShippingMethods";
import {ShippingMethod} from "../../../type/type"
import {CartContext} from "../../../context/CartContext";

const ShippingMethodsInfo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const { updateShippingInfo, getSelectedShippingMethod} = useContext(CartContext)!;


  const [selectedShippingMethod, setSelectedShippingMethod] = useState<ShippingMethod | null>(null);

  useEffect(() => {
    const initialSelectedMethod = getSelectedShippingMethod();
    setSelectedShippingMethod(initialSelectedMethod);
  }, [getSelectedShippingMethod]);



  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseDrawer = () => {
    setIsOpen(false);
  };


  const handleShippingMethodSelect = (method: ShippingMethod) => {
    setSelectedShippingMethod(method);
    updateShippingInfo(method, method.price);
  
  };

  // Colores personalizados
  const customColors = {
    primary: {
      main: "#000",
      contrastText: "#000",
    },
    secondary: {
      main: "#FFFFFF",
      contrastText: "#FFFFFF",
    },
  };

  const topBarStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: "12px 8px",
    width: "100%",
    margin: "0 auto",
    backgroundColor: customColors.primary.main,
    color: customColors.secondary.main,
  };

  const closeButtonStyles = {
    color: customColors.secondary.main,
    marginRight: "2px",
    marginLeft: "0",
    fontSize: "24px",
  };

  const shippingTextStyles = {
    fontSize: "20px",
  };

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Typography
         variant="subtitle1" 
         onClick={toggleDrawer}
         sx={{
          cursor: 'pointer',
        }}
         >
          Métodos de Envío
        </Typography> 
        <IconButton onClick={toggleDrawer}>
          <LocalShippingIcon />
        </IconButton>

      </Box>

      <Drawer
      anchor="left"
      open={isOpen}
      onClose={handleCloseDrawer}
      sx={{
        display: { xs: "block" },
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: isMobile ? "100%" : 350, // Ajusta el ancho según sea necesario
          height: "100%",
          zIndex: 1300,
        },
      }}
    >
        <Box sx={topBarStyles}>
          <Typography sx={shippingTextStyles}>Métodos de Envío</Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseDrawer}
            sx={closeButtonStyles}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <ShippingMethods
              onSelectMethod={handleShippingMethodSelect}
              initialSelectedMethod={selectedShippingMethod}
            />
      </Drawer>
    </Box>
  );
};

export default ShippingMethodsInfo;
