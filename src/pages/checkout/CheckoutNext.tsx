import { Box,CssBaseline,} from "@mui/material";
import BannerSecure from "./BannerSecure"
import Banner from "./Banner"
import CartCheckout from './CartCheckout '; 
import CouponValidation from './CuponValidation'; 
import UserInfo from './UserInfo'; 
import PaymentMethods from "./PaymentMethods"
import { MercadoPagoPayment } from "./MercadoPagoPayment";



const CheckoutNext: React.FC = () => {

  return (
    <Box
    sx={{
      backgroundColor: 'white',
      height: '100%',
      maxWidth: '100%',
    }}
    >
    <CssBaseline />
              <BannerSecure/>
              <Banner/>
              <CartCheckout />
              <CouponValidation />
              <UserInfo/>
              <MercadoPagoPayment/>
              <PaymentMethods/>
             
    </Box>
  );
};

export default CheckoutNext;
