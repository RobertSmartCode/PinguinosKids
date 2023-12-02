import React, { createContext, useState, useEffect, ReactNode } from "react";
import {CartItem } from "../type/type"


interface CartContextData {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  getQuantityById: (id: string) => number | undefined;
  clearCart: () => void;
  deleteById: (id: string) => void;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
  productQuantities: { [key: string]: number };
  updateQuantityById: (id: string, newQuantity: number) => void;
  selectedShippingMethod: ShippingMethod | null;
  shippingCost: number;
  updateShippingInfo: (method: ShippingMethod, cost: number) => void;
  getSelectedShippingMethod: () => ShippingMethod | null;
  getShippingCost: () => number;
  discountInfo: {
    createdAt: Date | null;
    discountPercentage: number | null;
    duration: number | null;
    maxDiscountAmount: number | null;
    minPurchaseAmount: number | null;
    promoCode: string;
    isValid: boolean;
  };
  updateDiscountInfo: (newDiscountInfo: Partial<CartContextData["discountInfo"]>) => void;
  setCustomerInformation: (info: CustomerInfo) => void;
  updateCustomerInformation: (info: Partial<CustomerInfo>) => void; 
  getCustomerInformation: () => CustomerInfo | null; 
}



export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}


interface DiscountInfo {
  createdAt: Date | null;
  discountPercentage: number | null;
  duration: number | null;
  maxDiscountAmount: number | null;
  minPurchaseAmount: number | null;
  promoCode: string;
  isValid: boolean;
}

interface CustomerInfo {
  email: string;
  receiveOffers: boolean;
  country: string;
  identificationDocument: string;
  firstName: string;
  lastName: string;
  phone: string;
  isOtherPerson: boolean;
  otherPersonFirstName?: string;
  otherPersonLastName?: string;
  streetAndNumber: string;
  department?: string;
  neighborhood?: string;
  city: string;
  postalCode: string;
  province: string;
}



export const CartContext = createContext<CartContextData | undefined>(undefined);

interface CartContextComponentProps {
  children: ReactNode;
}

const CartContextComponent: React.FC<CartContextComponentProps> = ({ children }) => {
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [productQuantities, setProductQuantities] = useState<{ [key: string]: number }>({});
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<ShippingMethod | null>(null);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);


const updateShippingInfo = (method: ShippingMethod, cost: number) => {
  setSelectedShippingMethod(method);
  setShippingCost(cost);
};

const getSelectedShippingMethod = () => {
  return selectedShippingMethod;
};

const getShippingCost = () => {
  return shippingCost;
};

const setCustomerInformation = (info: CustomerInfo) => {
  setCustomerInfo(info);
};

const getCustomerInformation = () => {
  return customerInfo;
};


const updateCustomerInformation = (info: Partial<CustomerInfo>) => {
  if (customerInfo) {
    const updatedInfo = { ...customerInfo, ...info };
    setCustomerInformation(updatedInfo);
  }
};


  // Cargar la información del cliente en el almacenamiento local al inicio
  useEffect(() => {
    const savedCustomerInfo = JSON.parse(localStorage.getItem("customerInfo") || "null") as CustomerInfo;
    setCustomerInfo(savedCustomerInfo);
    
  }, []);

   // Actualizar el almacenamiento local cuando cambia la información del cliente

   useEffect(() => {
    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
  }, [customerInfo]);


  // Cargar el carrito y las cantidades desde el almacenamiento local al inicio
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
    const savedQuantities = JSON.parse(localStorage.getItem("productQuantities") || "{}");
    setCart(savedCart);
    setProductQuantities(savedQuantities);
  }, []);

  // Actualizar el almacenamiento local cuando cambia el carrito o las cantidades
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("productQuantities", JSON.stringify(productQuantities));
  }, [cart, productQuantities]);

  const addToCart = (product: CartItem) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si el producto ya está en el carrito, actualizamos su cantidad
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
      );
      setCart(updatedCart);
    } else {
      // Si es un producto nuevo en el carrito, lo agregamos
      setCart([...cart, product]);
    }

    // Actualizamos la cantidad del producto en el estado de cantidades
    setProductQuantities({
      ...productQuantities,
      [product.id]: (productQuantities[product.id] || 0) + product.quantity,
    });
  };

  const getTotalQuantity = () => {
    // Sumar la cantidad de cada producto en el carrito
    const totalQuantity = cart.reduce((acc, product) => acc + product.quantity, 0);
    return totalQuantity;
  };

  const getQuantityById = (id: string) => {
    const product = cart.find((elemento) => elemento.id === id);
    return product?.quantity;
  };

  const clearCart = () => {
    setCart([]);
    setProductQuantities({});
    localStorage.removeItem("cart");
    localStorage.removeItem("productQuantities");
  };



  const updateQuantityById = (id: string, newQuantity: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart);

    setProductQuantities({
      ...productQuantities,
      [id]: newQuantity,
    });
  };

  const deleteById = (id: string) => {
    // Filtra el carrito para eliminar el elemento con el ID dado
    const updatedCart = cart.filter((item) => item.id !== id);
  
    // Actualiza el estado del carrito
    setCart(updatedCart);
  
    // Actualiza el estado de las cantidades de productos
    setProductQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[id];
      return updatedQuantities;
    });
  
    // Actualiza el almacenamiento local para reflejar los cambios en el carrito y las cantidades
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem("productQuantities", JSON.stringify(productQuantities));
  };

  const getTotalPrice = () => {
    const total = cart.reduce((acc, elemento) => acc + elemento.unit_price * elemento.quantity, 0);
    return total;
  };


  const [discountInfo, setDiscountInfo] = useState<DiscountInfo>({
    createdAt: null,
    discountPercentage: null,
    duration: null,
    maxDiscountAmount: null,
    minPurchaseAmount: null,
    promoCode: "",
    isValid: false,
  });
  
  const updateDiscountInfo = (newDiscountInfo: Partial<DiscountInfo>) => {
    setDiscountInfo((prevDiscountInfo) => ({
      ...prevDiscountInfo,
      ...newDiscountInfo,
    }));
  };
  

  const data: CartContextData = {
    cart,
    addToCart,
    getQuantityById,
    clearCart,
    deleteById,
    getTotalPrice,
    getTotalQuantity,
    productQuantities,
    updateQuantityById,
    selectedShippingMethod, // Agregamos selectedShippingMethod
    shippingCost, // Agregamos shippingCost
    updateShippingInfo, // Agregamos updateShippingInfo
    getSelectedShippingMethod, // Agregamos esta función
    getShippingCost, // Agregamos esta función
    discountInfo, // Agregamos la información del descuento
    updateDiscountInfo,
    setCustomerInformation,
    getCustomerInformation,
    updateCustomerInformation
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextComponent;
