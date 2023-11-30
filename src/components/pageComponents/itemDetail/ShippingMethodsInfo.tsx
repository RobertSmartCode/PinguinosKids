import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@mui/material";

const ShippingMethodsInfo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseDrawer = () => {
    setIsOpen(false);
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
        <Typography variant="subtitle1" onClick={toggleDrawer}>
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
            width: "100%",
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
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
          nulla vel ligula tristique vestibulum.
        </Typography>
      </Drawer>
    </Box>
  );
};

export default ShippingMethodsInfo;
