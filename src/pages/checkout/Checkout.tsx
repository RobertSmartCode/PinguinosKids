
// import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
// import axios from "axios";
import { Box,} from "@mui/material";
// import { AuthContext } from "../../context/AuthContext";
// import {  useLocation } from "react-router-dom";
// import { db } from "../../firebase/firebaseConfig";
// import {
//   addDoc,
//   collection,
//   doc,
//   updateDoc,
//   serverTimestamp,
  
// } from "firebase/firestore";

import BannerSecure from "./BannerSecure"
import Banner from "./Banner"
import CartCheckout from './CartCheckout '; 
import ShippingMethodCheckout from './ShippingMethodCheckout'; 
import CouponValidation from './CuponValidation'; 
import CheckoutForm from './CheckoutForm'; 



// interface Product {
//   id: number;
//   title: string;
//   unit_price: number;
//   quantity: number;
//   stock: number;
// }

// interface Order {
//   cp: string;
//   phone: string;
//   items: Product[];
//   total: number;
//   email: string;
// }

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}




const Checkout: React.FC = () => {





  // const { user } = useContext(AuthContext)!;
  // initMercadoPago(import.meta.env.VITE_PUBLICKEY, {
  //   locale: "es-AR",
  // });
  // const [preferenceId, setPreferenceId] = useState<string | null>(null);

  // const [orderId, setOrderId] = useState<string | null>(null);
  // const [shipmentCost, setShipmentCost] = useState<number>(0);

  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const paramValue = queryParams.get("status"); // approved --- reject

  // useEffect(() => {
  //   // ACA ES DONDE GUARDAMOS LA ORDEN EN FIREBASE
  //   // CONDICIONADO A QUE YA ESTE EL PAGO REALIZADO
  //   const orderData = localStorage.getItem("order");
  //   if (paramValue === "approved" && orderData) {
  //     const order: Order = JSON.parse(orderData);
  //     const ordersCollection = collection(db, "orders");
  //     addDoc(ordersCollection, { ...order, date: serverTimestamp() }).then(
  //       (res) => {
  //         setOrderId(res.id);
  //       }
  //     );

  //     order.items.forEach((elemento: Product) => {
  //       updateDoc(doc(db, "products", String(elemento.id)), {
  //         stock: elemento.stock - elemento.quantity,
  //       });
  //     });

  //     localStorage.removeItem("order");
  //     clearCart();
  //   }
  // }, [paramValue, clearCart]);

 


  // const createPreference = async () => {
  //   const newArray = cart.map((product) => {
  //     return {
  //       title: product.title,
  //       unit_price: product.unit_price,
  //       quantity: product.quantity,
  //     };
  //   });
  //   try {
  //     const response = await axios.post(
  //       "https://back-ecommerce-nu.vercel.app/create_preference",
  //       {
  //         items: newArray,
  //         shipment_cost: shipmentCost,
  //       }
  //     );

  //     const { id } = response.data;
  //     return id;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleBuy = async () => {
  //   const order: Order = {
  //     cp: userData.cp,
  //     phone: userData.phone,
  //     items: cart.map((item) => ({
  //       id: Number(item.id), // Convierte el id a número si es necesario
  //       title: item.title,
  //       unit_price: item.unit_price,
  //       quantity: item.quantity,
  //       stock: 0, // Valor predeterminado para stock
  //     })),
  //     total: total + shipmentCost,
  //     email: user?.email || "",
  //   };
  //   localStorage.setItem("order", JSON.stringify(order));
  //   const id = await createPreference();
  //   if (id) {
  //     setPreferenceId(id);
  //   }
  // };

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
              <ShippingMethodCheckout
                
              />
               <CheckoutForm />
      
    
    </Box>
  );
};

export default Checkout;