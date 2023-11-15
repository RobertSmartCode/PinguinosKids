import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import {
  getDocs,
  collection,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import firebase from 'firebase/app'; 
import 'firebase/firestore';

interface Order {
  id: string;
  date: firebase.firestore.Timestamp;
  items: Array<{
    id: string;
    title: string;
    quantity: number;
  }>;
  shippingCost: number;
  total: number;
  userData: {
    phone: string;
    identificationDocument: string;
    otherPersonLastName: string;
    isOtherPerson: boolean;
    firstName: string;
    lastName: string;
    // Agrega otros campos según la estructura de userData
  };
}


const UserOrders = () => {
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const { user } = useContext(AuthContext)!;

  useEffect(() => {
    const ordersCollection = collection(db, "orders");
    const ordersFiltered = query(
      ordersCollection,
      where("email", "==", user.email)
    );

    getDocs(ordersFiltered)
      .then((res) => {
        const newArr: Order[] = res.docs.map((order) => ({
          ...(order.data() as DocumentData),
          id: order.id,
        })) as Order[];
        setMyOrders(newArr);
      })
      .catch((error) => console.log(error));
  }, [user.email]);

  console.log(myOrders);

  return (
    <div>
      <h1>Estoy en mis órdenes</h1>
      {myOrders.map((order) => (
        <div key={order.id} style={{ border: "2px solid black", color:"black" }}>
          <p>Fecha de la orden: {order.date.toDate().toLocaleString()}</p>
          <p>Costo de envío: ${order.shippingCost}</p>
          <h4>Detalles de la orden:</h4>
          <ul>
            {order?.items?.map((product, index) => (
              <li key={index}>
                <h2>{product.title}</h2>
                <h3>Cantidad: {product.quantity}</h3>
              </li>
            ))}
          </ul>
          <h4>Total de la orden: ${order.total}</h4>
          <h4>Información del usuario:</h4>
          <p>Nombre: {order.userData.firstName} {order.userData.lastName}</p>
          <p>Teléfono: {order.userData.phone}</p>
          <p>Documento de identificación: {order.userData.identificationDocument}</p>
          {/* Agrega más campos según la estructura de tu objeto userData */}
        </div>
      ))}
    </div>
  );
  
  
};

export default UserOrders;
