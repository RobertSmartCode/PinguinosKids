import { useState,useContext } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from "@mui/icons-material/Close";
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { CartContext } from '../../../../../../context/CartContext';
import { Link } from 'react-router-dom';



import CartItemList from './CartItemList'; 
import PaymentMethodSelector from './PaymentMethodSelector';

interface MobileCartProps {
  onClick: () => void; 
}

const MobileCart: React.FC<MobileCartProps> = () => {
  const [cartOpen, setCartOpen] = useState(false);
  
  const { cart, clearCart, getTotalPrice, getTotalQuantity } = useContext(CartContext) ?? {};

  const handleCartClick = () => {
    setCartOpen(!cartOpen);
  };

  let total = getTotalPrice ? getTotalPrice() : 0;

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
        <Typography sx={itemCountStyles}>{getTotalQuantity ? getTotalQuantity() : 0}</Typography>
        
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
          {/* Resto del contenido del carrito */}

          {cart?.length ?? 0 > 0 ? (
            <>
              <CartItemList />
              <Typography>Total: ${total}</Typography>
              <Link to="/checkout">Ir al checkout</Link>
              <button onClick={clearCart}>Limpiar Carrito</button>
              <PaymentMethodSelector />
            </>
          ) : (
            <Typography>El carrito está vacío</Typography>
          )}
          
        </Box>

    
      </Drawer>
    </Box>
  );
};

export default MobileCart;
