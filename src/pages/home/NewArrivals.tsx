// NewArrivals.tsx
import React, { useEffect, useState, useContext } from "react";
import { db } from "../../firebase/firebaseConfig";
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Button, IconButton, Box } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CartContext } from "../../context/CartContext";
import { Product, CartItem } from "../../type/type";

const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useContext(CartContext)!;

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const productCollection = collection(db, "products");
        const productQuery = query(productCollection, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(productQuery);

        const newArrivals = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Product));

        setProducts(newArrivals);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  

// Imprime todos los valores de salesCount usando el estado del componente
console.log("SalesCount de todos los productos:", products.map((product) => `${product.title}: ${product.createdAt}`));


  const handleBuyClick = (product: Product) => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
    };

    addToCart(cartItem);
  };

  return (
    <Grid container spacing={2} sx={{ padding: '8px', marginTop: '20px' }}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h4">Nuevos Ingresos</Typography>
      </Grid>

      {products.map((product) => (
        <Grid item xs={6} sm={4} md={4} lg={3} key={product.id}>
          <Card sx={{ border: "1px solid gray", padding: '8px', marginBottom: '8px', display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", backgroundColor: "#fff", color: "#000" }}>
            <img src={product.images[0]} alt={product.title} style={{ width: "100%", marginBottom: '8px', borderBottom: "1px solid #000" }} />
            <CardContent>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                {product.title}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: "1.2rem", color: "#000", marginBottom: '16px' }}>
                Precio: ${product.unit_price}
              </Typography>
              <Box sx={{ display: "flex", gap: '8px', marginTop: '16px', marginLeft: '32px', marginRight: '32px', marginBottom: '0px' }}>
                <Button
                  onClick={() => handleBuyClick(product)} 
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ backgroundColor: "#000", color: "#fff" }}
                >
                  Comprar
                </Button>
                <IconButton
                  component={Link}
                  to={`/itemDetail/${product.id}`}
                  aria-label="Ver"
                  color="secondary"
                  size="small"
                  sx={{ backgroundColor: "#fff", color: "#000", border: "2px solid #000", borderRadius: '50%', padding: '8px' }}
                >
                  <VisibilityIcon sx={{ fontSize: '1rem' }} />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default NewArrivals;
