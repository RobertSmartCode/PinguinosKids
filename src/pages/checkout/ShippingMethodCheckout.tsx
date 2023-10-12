import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  Grid,
  Button,
  Box,
  
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; 
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { CartContext } from "../../context/CartContext";

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}



const ShippingMethodCheckout = () => {
 

  const { updateShippingInfo, getSelectedShippingMethod} = useContext(CartContext)!;


  const initialSelectedMethod= getSelectedShippingMethod()
 
  const [methods, setMethods] = useState<ShippingMethod[]>([]);

  const [selectedMethod, setSelectedMethod] = useState<ShippingMethod | null>(initialSelectedMethod);
 
 
 const onSelectMethod= (method: ShippingMethod) => {
  setSelectedMethod(method);
   updateShippingInfo(method, method.price);
 
 };

 


  if(selectedMethod){

    // Esto es para que Typescript da error 
  }
  
  const [showAllOptions, setShowAllOptions] = useState(false);

  useEffect(() => {
    fetchShippingMethods();
  }, []);

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

  const handleMethodClick = (method: ShippingMethod) => {
    const updatedMethods = methods.map((m) => ({
      ...m,
      selected: m.id === method.id,
    }));
    setMethods(updatedMethods);

    setSelectedMethod(method);
    onSelectMethod(method);

    // Actualizar showAllOptions según la selección del usuario
    setShowAllOptions(false); // Establecer en falso para mostrar solo el método seleccionado
  };


  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h6"
            align="center"
            style={{ fontWeight: "bold", color: "black", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              setShowAllOptions(false);
            }}
          >
            Método de Envío
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={0}>
        {methods.map((method) => (
          <Grid item xs={12} sm={6} md={4} key={method.id}>
            {showAllOptions || method.selected ? (
              <Card
                onClick={() => handleMethodClick(method)}
                style={{
                  cursor: "pointer",
                  backgroundColor: method.selected ? "#e0e0e0" : "white",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      checked={method.selected}
                      onChange={() => handleMethodClick(method)}
                      style={{ marginRight: "10px" }}
                    />
                    <Typography
                      variant="body1"
                      component="div"
                      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      {method.name}
                    </Typography>
                  </div>
                  <Typography variant="body1" color="text.secondary" style={{ paddingRight: "35px" }}>
                    ${method.price}
                  </Typography>
                </CardContent>
              </Card>
            ) : null}
          </Grid>
        ))}
  
        {!showAllOptions && (
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", margin: "0", padding: "0" }}>
            <Button
              variant="outlined"
              onClick={() => setShowAllOptions(true)}
              sx={{ border: "none", margin: "0", padding: "0", textTransform: "none" }}
            >
              Más opciones <ExpandMoreIcon />
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
  
  
};

export default ShippingMethodCheckout;