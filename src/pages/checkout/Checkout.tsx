import React, { useContext,  useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Box,} from "@mui/material";
import BannerSecure from "./BannerSecure"
import Banner from "./Banner"
import CartCheckout from './CartCheckout '; 
import ShippingMethods from '../../components/common/layout/Navbar/NavbarMobile/ MobileCart/ShippingMethods/ShippingMethods'; 

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}


const Checkout: React.FC = () => {

  const {  updateShippingInfo, getSelectedShippingMethod } = useContext(CartContext)!;

  const initialSelectedShippingMethod= getSelectedShippingMethod()
  console.log(initialSelectedShippingMethod)
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<ShippingMethod | null>(initialSelectedShippingMethod);
 
 
 const handleShippingMethodSelect = (method: ShippingMethod) => {
   setSelectedShippingMethod(method);
   updateShippingInfo(method, method.price);
 
 };


  return (
    <Box 
    sx={{
      backgroundColor: 'white',
      height: '100vh', // Cubre toda la pantalla vertical
      maxWidth: '100%', // Ajusta al ancho de pantalla móvil
    }}
    
    >

            <BannerSecure/>
            <Banner/>
            <CartCheckout />
            <ShippingMethods
              onSelectMethod={handleShippingMethodSelect}
              initialSelectedMethod={selectedShippingMethod}
            />

    </Box>
  );
};

export default Checkout;
