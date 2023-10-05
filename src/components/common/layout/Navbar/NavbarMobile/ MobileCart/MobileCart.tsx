import React, { useState, useContext } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from "@mui/icons-material/Close";
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { CartContext } from '../../../../../../context/CartContext';
import { Link } from 'react-router-dom';

import CartItemList from './CartItemList'; 
import ShippingMethods from './ShippingMethods/ShippingMethods'; 
import { Button } from '@mui/material';

interface MobileCartProps {
  onClick: () => void; 
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}



const MobileCart: React.FC<MobileCartProps> = () => {
  const [cartOpen, setCartOpen] = useState(false);
 

  const [selectedShippingMethod, setSelectedShippingMethod] = useState<ShippingMethod | null>(null);




  
  const { cart, getTotalPrice, getTotalQuantity } = useContext(CartContext) ?? {};

  const handleCartClick = () => {
    setCartOpen(!cartOpen);
  };
// Obtener el subtotal sin envío
const subtotal = getTotalPrice ? getTotalPrice() : 0;

// Obtener el costo de envío del método seleccionado
const shippingCost = selectedShippingMethod ? selectedShippingMethod.price : 0;

// Calcular el total sumando el subtotal y el costo de envío
const total = subtotal + shippingCost;

const handleShippingMethodSelect = (method: ShippingMethod) => {
  setSelectedShippingMethod(method);
};

  const customColors = {
    primary: {
      main: '#000',
      contrastText: '#000',
    },
    secondary: {
      main: '#fff',
      contrastText: '#fff',
    },
  };

  const cartContainerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    margin: "0 auto",
    backgroundColor: customColors.secondary.main,
  };

  const cartIconStyles = {
    color: customColors.primary.main,
    fontSize: '24px' 
  };

  const itemCountStyles = {
    color: customColors.primary.main,
    fontSize: "1.2rem",
    marginTop: "-10px",
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
    marginRight: '2px',
    marginLeft: '0',
    fontSize: '24px',
  };

  const buyButtonStyles = {
    backgroundColor: customColors.primary.main, // Color de fondo del botón
    color: customColors.secondary.contrastText, // Color del texto del botón
    '&:hover, &:focus': {
      backgroundColor: customColors.secondary.main,
      color: customColors.primary.contrastText},
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "25px", 
  };


  const searchTextStyles = {
    fontSize: '20px',
    color: customColors.secondary.main,
    marginLeft: '24px',
  };

  const cartTitleStyles = {
    fontSize: '1.5rem',
    marginBottom: '16px',
    color: customColors.secondary.main,
  };

  return (
    <Box sx={cartContainerStyles}>
      <IconButton
        aria-label="shopping cart"
        onClick={handleCartClick}
      >
        <ShoppingCartIcon sx={cartIconStyles} /> 
        <Typography sx={itemCountStyles}>
          {getTotalQuantity ? getTotalQuantity() : 0}
        </Typography>
      </IconButton>

      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
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
          <Typography sx={searchTextStyles}>Carrito de Compras</Typography>
          <IconButton
            aria-label="close"
            onClick={handleCartClick}
            sx={closeButtonStyles}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={cartIconStyles}>
          <Typography variant="h6" sx={cartTitleStyles}>
            Carrito de compras
          </Typography>

          {cart?.length ?? 0 > 0 ? (
            <>
              <CartItemList />
              <ShippingMethods onSelectMethod={handleShippingMethodSelect} />
              <Box  style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography style={{ fontSize: '1.2rem', fontWeight: 'bold', paddingLeft: '30px' }}>Total:</Typography>
              <Typography style={{ fontSize: '1.2rem', fontWeight: 'bold', paddingRight: '50px' }}>${total}</Typography>
              </Box>

              <Box 
                  style={{ display: "flex", justifyContent: "center", alignItems: "center"}}
                  onClick={handleCartClick}
                  
                  >
                {/* Renderiza los productos del carrito aquí */}
                <Link to="/checkout">
                  <Button 
                  sx={buyButtonStyles }
                  variant="contained"
                  size="medium">
                    Iniciar Compra
                  </Button>
                </Link>
              </Box>
              
            </>
          ) : (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              
              }}
             
              
            >
              <Typography variant="body1">El carrito está vacío</Typography>
            </Box>

          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileCart;
