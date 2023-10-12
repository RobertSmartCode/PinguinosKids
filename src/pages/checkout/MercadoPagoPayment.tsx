import { useState, useContext, useEffect } from "react";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import axios from "axios";
import { CartContext } from '../../context/CartContext';


const MercadoPagoPayment = () => {
  const { cart, getSelectedShippingMethod, getTotalPrice, discountInfo } = useContext(CartContext)! || {};
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const subtotal = getTotalPrice ? getTotalPrice() : 0;
  const selectedShippingMethod = getSelectedShippingMethod();
  const shippingCost = selectedShippingMethod ? selectedShippingMethod.price : 0;
  const discountPercentage = discountInfo?.discountPercentage ?? 0;
  const maxDiscountAmount = discountInfo?.maxDiscountAmount ?? 0;
  const discountAmount = (discountPercentage / 100) * (subtotal + shippingCost);
 
  let total = (subtotal + shippingCost) * (1 - (discountPercentage ?? 0) / 100);

  if (discountAmount < maxDiscountAmount) {
    total = (subtotal + shippingCost) * (1 - discountPercentage / 100);
  } else {
    total = subtotal + shippingCost - maxDiscountAmount;
  }

  console.log(total)
  
 
  useEffect(() => {
    // Inicializa Mercado Pago con tu clave pública y la configuración de localización
    initMercadoPago(import.meta.env.VITE_PUBLICKEY, {
      locale: "es-AR",
    });

    // Luego de la inicialización, llama a createPreference automáticamente
    createPreference();
  }, []);


  const createPreference = async () => {
    const newArray = cart.map((product) => {
      return {
        title: product.title,
        unit_price: product.unit_price,
        quantity: product.quantity,
      };
    });

    try {
      const response = await axios.post("http://localhost:8080/create_preference", {
        items: newArray,
        shipment_cost: shippingCost
      });

      const { id } = response.data;
      setPreferenceId(id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Desactiva la carga cuando se completa
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
    <h2 style={{ color: "black" }}>Mercado Pago</h2>
    {isLoading ? ( // Muestra el icono de carga mientras isLoading es true
                  <h4 style={{ color: "black" }}>Cargando...</h4>
    ) : (
      preferenceId && (
        <Wallet initialization={{ preferenceId, redirectMode: "self" }} />
      )
    )}
  </div>
  );
};

export { MercadoPagoPayment };