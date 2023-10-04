import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";
import {
  Button,
  Typography,
  CardContent,
  Card,
  CardActions,
  Box,
  Grid,
  Divider,
  Stack,
  Paper,
} from "@mui/material";
import { CartContext } from "../../../context/CartContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import PaymentMethodsInfo from "./PaymentMethodsInfo"; 
import ShippingMethodsInfo from "./ShippingMethodsInfo"; 
import ProductDetailsInfo from "./ProductDetailsInfo"; 

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

const customColors = {
  primary: {
    main: "#000",
    contrastText: "#000",
  },
  secondary: {
    main: "#FFFFFF",
    contrastText: "#FFFFFF",
  },
};



const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();


  const { getQuantityById, addToCart,getTotalQuantity  } = useContext(CartContext)!;


  const [product, setProduct] = useState<any>(null);
  const [counter, setCounter] = useState<number>(1);


  const [selectedColor, setSelectedColor] = useState<string>(""); 
  const [selectedSize, setSelectedSize] = useState<string>(""); 


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const refCollection = collection(db, "products");
        const refDoc = doc(refCollection, id);
        const docSnapshot = await getDoc(refDoc);

        if (docSnapshot.exists()) {
          const productData = docSnapshot.data();
          setProduct({ ...productData, id: docSnapshot.id });
        } else {
          console.log("El producto no existe");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCounterChange = (value: number) => {
    if (value >= 1 && value <= product?.stock) {
      setCounter(value);
    }
  };


  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(event.target.value);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  const handleAddToCart = () => {
    // Crear un objeto CartItem basado en el producto con la cantidad actual
    const cartItem: CartItem = {
      ...product,
      quantity: counter,
      color: selectedColor, // Agrega el color seleccionado
      size: selectedSize,   // Agrega la talla seleccionada
    };
  
    // Llama a la función addToCart del contexto para agregar el producto al carrito
    addToCart(cartItem);
  
    console.log("Producto agregado al carrito:", cartItem);
  };


  const colorsArray: string[] = product?.colors
    ? product.colors.split(",").map((color: string) => color.trim())
    : [];
  const sizesArray: string[] = product?.sizes
    ? product.sizes.split(",").map((size: string) => size.trim())
    : [];

  // Calcular el precio final después de aplicar el descuento
  const originalPrice = product?.unit_price || 0; // Precio original
  const discountPercentage = product?.discount || 0; // Porcentaje de descuento
  const finalPrice = originalPrice - (originalPrice * (discountPercentage / 100));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 1,
      }}
    >
      <Card
        sx={{
          backgroundColor: customColors.secondary.main,
          color: customColors.primary.contrastText,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                position: "relative",
                padding: "10px",
                borderRadius: "25px",
                overflow: "hidden",
              }}
            >
              <Carousel
                showThumbs={false}
                dynamicHeight={true}
                emulateTouch={true}
              >
                {product?.images.map((image: string, index: number) => (
                  <div key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        backgroundColor: customColors.primary.main,
                        color: customColors.secondary.contrastText,
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="body2">
                        {`${product?.discount}% `}
                        <span style={{ fontSize: "14px" }}>OFF</span>
                      </Typography>
                    </Paper>
                    <img
                      src={image}
                      alt={`Imagen ${index + 1}`}
                      style={{
                        width: "100%",
                        maxHeight: "400px",
                        objectFit: "contain",
                        paddingBottom: "60px",
                      }}
                    />
                  </div>
                ))}
              </Carousel>
              <Divider
                sx={{
                  backgroundColor: customColors.primary.main,
                  position: "absolute",
                  bottom: "1",
                  left: "0",
                  right: "0",
                  width: "100%",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardContent>
              <Typography
               variant="h5" 
               component="div" 
               align="center"
               sx={{
                  color: customColors.primary.main, 
                }}
               >
                {product?.title}
              </Typography>

         <Typography 
           variant="subtitle1"
           color="textSecondary"
           sx={{ display: 'flex', alignItems: 'center' }}
           >
            {/* Mostrar precio original con línea en medio */}
            <Typography
              variant="body2"
              style={{
                textDecoration: "line-through",
                display: "block",
                textAlign: "center",
                marginRight: "16px", // Agregamos un margen a la derecha
                color: customColors.primary.main
                
              }}
              
            >
              ${product?.unit_price}
            </Typography>
            {/* Mostrar precio final después de aplicar el descuento */}
            <Typography
            variant="body1"
            align="center"
            style={{
                color: customColors.primary.main,
                fontSize: "24px" 
              }}
            >
              ${finalPrice}
            </Typography>
            </Typography>

            <PaymentMethodsInfo />


{product && (

<Box sx={{ textAlign: "center", marginTop: 2 }}>
  {Array.isArray(colorsArray) && colorsArray.length > 0 && (
    <div style={{ marginBottom: '16px' }}> {/* Agregamos un margen inferior */}
      <label htmlFor="colorSelect" style={{ fontSize: '18px', fontWeight: 'bold', color: customColors.primary.main, display: 'flex', alignItems: 'start' }}>
        Colores:
      </label>
      <select
        id="colorSelect"
        value={selectedColor}
        onChange={handleColorChange}
        style={{
          padding: '10px',
          border:  `1px solid ${customColors.primary.main}`,
          borderRadius: '4px',
          fontSize: '16px',
          backgroundColor: customColors.secondary.main,
          color: customColors.primary.main,
          width: '100%',
          outline: 'none',
        }}
      >
        {colorsArray.map((color, index) => (
          <option
            style={{ padding: '8px' }}
            key={index}
            value={color}
          >
            {color}
          </option>
        ))}
      </select>
    </div>
  )}

  {Array.isArray(sizesArray) && sizesArray.length > 0 && (
    <div> {/* Agregamos un margen inferior */}
      <label htmlFor="sizeSelect" style={{ fontSize: '18px', fontWeight: 'bold', color: customColors.primary.main, display: 'flex', alignItems: 'start'}}>
        Tallas:
      </label>
      <select
        id="sizeSelect"
        value={selectedSize}
        onChange={handleSizeChange}
        style={{
          padding: '10px',
          border: `1px solid ${customColors.primary.main}`,
          borderRadius: '4px',
          fontSize: '16px',
          backgroundColor: customColors.secondary.main,
          color: customColors.primary.main,
          width: '100%',
          outline: 'none',
        }}
      >
        {sizesArray.map((size, index) => (
          <option
            style={{ padding: '8px' }}
            key={index}
            value={size}
          >
            {size}
          </option>
        ))}
      </select>
    </div>
  )}
</Box>


)}

            </CardContent>

             <CardContent>
               <ProductDetailsInfo />
             </CardContent>


            <CardActions>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <IconButton
                  color="primary"
                  onClick={() => handleCounterChange(counter - 1)}
                  sx={{ color: customColors.primary.main }} // Color del icono
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body2" sx={{ color: customColors.primary.main }}>
                  {counter}
                </Typography>
                <IconButton
                  color="primary"
                  onClick={() => handleCounterChange(counter + 1)}
                  sx={{ color: customColors.primary.main }} // Color del icono
                >
                  <AddIcon />
                </IconButton>
              </Stack>

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                fullWidth
                size="small"
                disableRipple 
                sx={{
                  backgroundColor: customColors.primary.main, // Color de fondo del botón
                  color: customColors.secondary.contrastText, // Color del texto del botón
                  '&:hover, &:focus': {
                    backgroundColor: customColors.secondary.main, // Cambia el color de fondo en hover y focus
                    color: customColors.primary.contrastText, // Cambia el color del texto en hover y focus
                  },
                }}
              >
                Agregar al carrito
              </Button>
</CardActions>


            {typeof id !== 'undefined' && getQuantityById(id.toString()) && (
              <Typography variant="h6">
                Ya tienes {getTotalQuantity()} en el carrito
              </Typography>
            )}
            {typeof id !== 'undefined' && product?.stock === getQuantityById(id.toString()) && (
              <Typography variant="h6">
                Ya tienes el máximo en el carrito
              </Typography>
            )}



          <CardContent>
             <ShippingMethodsInfo />
          </CardContent>

          </Grid>

        </Grid>
      </Card>
    </Box>
  );
};

export default ItemDetail;