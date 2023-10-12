import { Box,} from "@mui/material";
import BannerSecure from "./BannerSecure"
import Banner from "./Banner"
import CartCheckout from './CartCheckout '; 
import CouponValidation from './CuponValidation'; 
import UserInfo from './UserInfo'; 
import PaymentMethods from "./PaymentMethods"




const CheckoutNext: React.FC = () => {

  return (
    <Box
    sx={{
      backgroundColor: 'white',
      height: '100%',
      maxWidth: '100%',
    }}
    >
              <BannerSecure/>
              <Banner/>
              <CartCheckout />
              <CouponValidation />
              <UserInfo/>
              <PaymentMethods/>
              <CouponValidation />
    </Box>
  );
};

export default CheckoutNext;
