import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";
import { Button } from "@mui/material";
import { CartContext } from "../../../context/CartContext";

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const { addToCart, getQuantityById } = useContext(CartContext)!;
  let quantity = getQuantityById(Number(id));
  const [product, setProduct] = useState<any>(null);
  const [counter, setCounter] = useState<number>(quantity || 1);

  useEffect(() => {
    let refCollection = collection(db, "products");
    let refDoc = doc(refCollection, id);
    getDoc(refDoc)
      .then((res) => setProduct({ ...res.data(), id: res.id }))
      .catch((error) => console.log(error));
  }, [id]);

  // SUMAR
  const addOne = () => {
    if (product && counter < product.stock) {
      setCounter(counter + 1);
    } else {
      alert("stock máximo");
    }
  };

  // RESTAR
  const subOne = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    } else {
      alert("no puedes agregar menos de 1 elemento al carrito");
    }
  };

  // AGREGAR AL CARRITO
  const onAdd = () => {
    if (product) {
      let obj = {
        ...product,
        quantity: counter,
      };
      addToCart(obj);
    }
  };

  return (
    <div>
      <h1>Detalle</h1>

      {product && (
        <div>
          <h2>{product.title}</h2>
          <img src={product.image} style={{ width: "200px" }} alt="" />
        </div>
      )}

      {quantity && <h6>Ya tienes {quantity} en el carrito</h6>}
      {product?.stock === quantity && (
        <h6>Ya tienes el máximo en el carrito</h6>
      )}

      <div style={{ display: "flex" }}>
        <Button variant="contained" onClick={addOne}>
          +
        </Button>
        <h4>{counter}</h4>
        <Button variant="contained" onClick={subOne}>
          -
        </Button>
      </div>
      <Button onClick={onAdd}>Agregar al carrito</Button>
    </div>
  );
};

export default ItemDetail;
