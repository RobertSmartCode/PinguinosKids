import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  Grid,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../../../firebase/firebaseConfig";

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

interface ShippingMethodsProps {
  onSelectMethod: (method: ShippingMethod) => void;
  initialSelectedMethod: ShippingMethod | null; // Nueva prop
}

const ShippingMethods: React.FC<ShippingMethodsProps> = ({ onSelectMethod, initialSelectedMethod }) => {
  const [methods, setMethods] = useState<ShippingMethod[]>([]);

  useEffect(() => {
    fetchShippingMethods();
  }, []);

  // Lógica para establecer el método de envío inicial si existe
  if (initialSelectedMethod) {
    const initialMethod = methods.find((m) => m.id === initialSelectedMethod.id);
    if (initialMethod) {
      initialMethod.selected = true;
    }
  }

  const fetchShippingMethods = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "shippingMethods"));
      const methodsData: ShippingMethod[] = [];

      querySnapshot.forEach((doc) => {
        const methodData = doc.data();
        if (methodData.name && methodData.price) {
          methodsData.push({
            id: doc.id,
            name: methodData.name,
            price: methodData.price,
            selected: false,
          });
        }
      });

      setMethods(methodsData);
    } catch (error) {
      console.error("Error al obtener los métodos de envío:", error);
    }
  };

  return (
    <Grid container spacing={2} >
      {methods.map((method) => (
        <Grid item xs={12} sm={6} md={4} key={method.id}>
          <Card
            onClick={() => {
              // Marcar el método como seleccionado
              const updatedMethods = methods.map((m) => ({
                ...m,
                selected: m.id === method.id,
              }));
              setMethods(updatedMethods);

              // Llamar a la función onSelectMethod con el método seleccionado
              onSelectMethod(method);
            }}
            style={{
              cursor: "pointer",
              backgroundColor: method.selected ? "#e0e0e0" : "white",
              display: "flex",
              flexDirection: "column",
            }}
          >
          
          <CardContent style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                checked={method.selected}
                onChange={() => {
                    // Marcar el método como seleccionado
                    const updatedMethods = methods.map((m) => ({
                    ...m,
                    selected: m.id === method.id,
                    }));
                    setMethods(updatedMethods);

                    onSelectMethod(method);
                }}
                style={{ marginRight: "10px" }} // Margen a la derecha del Checkbox
                />
                <Typography variant="body1" component="div" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {method.name}
                </Typography>
            </div>
            <Typography variant="body1" color="text.secondary" style={{  paddingRight: '35px'  }}>
                ${method.price}
            </Typography>
            </CardContent>

          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ShippingMethods;
