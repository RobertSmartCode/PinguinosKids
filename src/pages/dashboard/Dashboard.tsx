import {Box} from "@mui/material";
import ProductAddForm from "./ProductAddForm";
import ProductsList from "./ProductsList";
import MyOrders from "./MyOrders";
import PaymentMethodsList from "./PaymentMethodsList";
import ShippingMethodsList from "./ShippingMethodsList";
import StoreDataList from "./StoreDataList";



const containerStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: "80px", 
  marginRight: "80px", 
  gap:"20px"

};



const Dashboard: React.FC = () => {



  return (
    <Box 
    sx={containerStyles}>

        <MyOrders />
        
      <ProductAddForm />

      <ProductsList />
      
      
     
      <PaymentMethodsList/>

      <ShippingMethodsList/>

      <StoreDataList/>


    </Box>
  );
};

export default Dashboard;
