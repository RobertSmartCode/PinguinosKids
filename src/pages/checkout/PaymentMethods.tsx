import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  Grid,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import { TransferPayment } from "./TransferPayment";
import { CashPayment } from "./CashPayment";

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  selected: boolean;
}

const PaymentMethods = () => {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [showPaymentSelection, setShowPaymentSelection] = useState(true);


  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "paymentMethods"));
      const methodsData: PaymentMethod[] = [];

      querySnapshot.forEach((doc) => {
        const methodData = doc.data();
        if (methodData.name && methodData.description) {
          methodsData.push({
            id: doc.id,
            name: methodData.name,
            description: methodData.description,
            selected: false,
          });
        }
      });

      setMethods(methodsData);
    } catch (error) {
      console.error("Error al obtener los métodos de pago:", error);
    }
  };

  const onSelect = (method: PaymentMethod) => {
    
    setSelectedMethod(method);
    setShowPaymentSelection(false);

  };

  const onBackToSelection = () => {
    setSelectedMethod(null);
    setShowPaymentSelection(true);
  };

  return (
    <div>
      {showPaymentSelection ? (
        <Grid container spacing={1} sx={{ maxWidth: "100%", marginLeft: "30px", marginRight: "30px", marginTop: "10px", '@media (min-width:600px)': { maxWidth: '450px', margin: "auto", marginTop: "20px" } }}>
          {methods.map((method) => (
            <Grid item xs={10} lg={12}  key={method.id}>
              <Card
                onClick={() => onSelect(method)}
                style={{
                  cursor: "pointer",
                  backgroundColor: method.selected ? "#e0e0e0" : "white",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  style={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      checked={method.selected}
                      onChange={() => onSelect(method)}
                      style={{ marginRight: "10px" }}
                    />
                    <Typography variant="body1" component="div">
                      {method.name}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>
          {selectedMethod && (
           <div>
           {/* Renderiza el componente seleccionado según el nombre del método */}
           {
             selectedMethod.name === "Efectivo" ? <CashPayment /> :
             selectedMethod.name === "Transferencias" && <TransferPayment />
           }
           <button
              onClick={onBackToSelection}
              style={{
                display: "block",
                margin: "20px auto", // Centra verticalmente y agrega márgenes
              }}
            >
              Volver
            </button>
         </div>
         
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
