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

interface Order {
  id: string;
  items: Array<{
    id: string;
    title: string;
    quantity: number;
  }>;
  total: number;
  // Agrega aquí cualquier otro campo que puedas tener en tus órdenes
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
        <div key={order.id} style={{ border: "2px solid black" }}>
          {order?.items?.map((product) => (
            <div key={product.id}>
              <h2>{product.title}</h2>
              <h3>{product.quantity}</h3>
            </div>
          ))}
          <h4>El total de la orden es {order.total}</h4>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
