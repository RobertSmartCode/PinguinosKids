import React, { createContext, useState, useEffect, ReactNode } from "react";

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  unit_price: number;
  discount: number;
  stock: number;
  sizes: string[];
  colors: string[];
  sku: string;
  keywords: string[];
  salesCount: number;
  featured: boolean;
  images: string[];
  createdAt: string;
  elasticity: string;
  thickness: string;
  breathability: string;
  season: string;
  material: string;
  details: string;
}

interface CartItem extends Product {
  quantity: number;
}

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
}

export const CartContext = createContext<CartContextData | undefined>(undefined);

interface CartContextComponentProps {
  children: ReactNode;
}

const CartContextComponent: React.FC<CartContextComponentProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [productQuantities, setProductQuantities] = useState<{ [key: string]: number }>({});

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
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextComponent;
