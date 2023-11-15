import React, { useEffect, useState, useContext } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, query, where, getDocs, QueryConstraint, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Button, IconButton, Box } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CartContext } from "../../context/CartContext";
import FilterProduct from "./FilterProducts"; // Importa el componente FilterProduct
import Sort from "./Sort"; // Importa el componente Sort
import { useFilterContext } from "../../context/FilterContext";
import { useSortContext } from "../../context/SortContext";

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

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useContext(CartContext)!; 
  const { filter } = useFilterContext()!;
  const { sort } = useSortContext()!;

  // Ahora puedes acceder a los valores del filtro en tu componente Shop


  useEffect(() => {

    const fetchFilteredProducts = async () => {
      // Referencia a la colección "products"
      const productsCollection = collection(db, 'products');
  
      // Construir la consulta base sin condiciones
      let filteredQuery = query(productsCollection);
  
      // Construir un array para almacenar las condiciones de filtro
      const filterConditions: QueryConstraint[] = [];
  
      // Filtrar por colores
      if (filter.colors) {
        const selectedColors = Object.keys(filter.colors).filter(color => filter.colors[color]);
        console.log(selectedColors);
        if (selectedColors.length > 0) {
          // Agregar condición de colores al array usando "in"
          filterConditions.push(where("colors", "in", selectedColors));
        }
      }
  
      // Filtrar por tamaños
      if (filter.sizes) {
        const selectedSizes = Object.keys(filter.sizes).filter(size => filter.sizes[size]);
        console.log(selectedSizes);
        if (selectedSizes.length > 0) {
          // Agregar condiciones de tamaños al array
            filterConditions.push(where("sizes", "in", selectedSizes));
        }
      }
  
      try {
        // Aplicar todas las condiciones de filtro a la consulta
        if (filterConditions.length > 0) {
          filteredQuery = query(filteredQuery, ...filterConditions);
        }
  
        // Ejecutar la consulta con todas las condiciones aplicadas y obtener el QuerySnapshot
        const querySnapshot = await getDocs(filteredQuery);
  
        // Mapear los documentos a objetos Product
        const productsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        } as Product));
  
        // Almacenar los resultados en el estado
        console.log(productsData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error al obtener productos filtrados:', error);
      }
    };
  
    // Llamar a la función para cargar los productos cuando el filtro cambie
    fetchFilteredProducts();
  }, [filter]);  // Asegúrate de incluir 'filter' como dependencia
  
  

  useEffect(() => {
    const fetchSortedProducts = async () => {
      const productsCollection = collection(db, 'products');
      let sortedQuery = query(productsCollection);

      // Aplica la clasificación según la opción seleccionada
      if (sort.sortBy === "lowToHigh") {
        sortedQuery = query(sortedQuery, orderBy("unit_price", "asc"));
      } else if (sort.sortBy === "highToLow") {
        sortedQuery = query(sortedQuery, orderBy("unit_price", "desc"));
      } else if (sort.sortBy === "newToOld") {
        sortedQuery = query(sortedQuery, orderBy("createdAt", "desc"));
      } else if (sort.sortBy === "oldToNew") {
        sortedQuery = query(sortedQuery, orderBy("createdAt", "asc"));
      } else if (sort.sortBy === "aToZ") {
        sortedQuery = query(sortedQuery, orderBy("title", "asc"));
      } else if (sort.sortBy === "zToA") {
        sortedQuery = query(sortedQuery, orderBy("title", "desc"));
      }
      // Agrega más condiciones según las opciones de clasificación

      try {
        const querySnapshot = await getDocs(sortedQuery);
        const productsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        } as Product));

        setProducts(productsData);
      } catch (error) {
        console.error('Error al obtener productos clasificados:', error);
      }
    };

    fetchSortedProducts();
  }, [sort]); // Asegúrate de incluir 'sort' como dependencia


  // Colores personalizados
  const customColors = {
    primary: {
      main: '#000',
      contrastText: '#000',
    },
    secondary: {
      main: '#fff',
      contrastText: '#fff',
    },
  };

  // Estilos con enfoque sx
  const containerStyles = {
    padding: '8px',
  };

  const productStyles = {
    border: "1px solid gray",
    padding: '8px',
    marginBottom: '8px',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: customColors.secondary.main,
    color: customColors.primary.main,
  };

  const productImageStyles = {
    width: "100%", 
    marginBottom: '8px',
    borderBottom: "1px solid #000",
  };
  

  const productTitleStyles = {
    fontSize: "1rem",
    fontWeight: "bold",
  };

  const productPriceStyles = {
    fontSize: "1.2rem",
    color: customColors.primary.main,
    marginBottom: '16px',
  };

  const productDetailStyles = {
    backgroundColor: customColors.secondary.main,
    color: customColors.primary.main,
    border: `2px solid ${customColors.primary.main}`,
    borderRadius: '50%',
    padding: '8px',
  };

  const iconStyles = {
    fontSize: '1rem',
  };

  const productCartStyles = {
    backgroundColor:customColors.primary.main,
    color:customColors.secondary.main,
  };

  const buttonContainerStyles = {
    display: "flex",
    gap: '8px',
    marginTop: '16px',
    marginLeft: '32px',
    marginRight: '32px',
    marginBottom: '0px',
  };

  const handleBuyClick = (product: Product) => {
    // Crear un objeto CartItem basado en el producto con una cantidad inicial de 1
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
    };
  
    // Llama a la función addToCart del contexto para agregar el producto al carrito
    addToCart(cartItem);
   
  };
  
  return (
    <div>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6} >
          {/* Componente de filtros */}
          <FilterProduct/>
        </Grid>
        <Grid item xs={6}>
          {/* Componente de opciones de clasificación */}
          <Sort />
        </Grid>
      </Grid>
   
    <Grid container spacing={1} sx={containerStyles}>
      {products.map((product) => (
        <Grid item xs={6} sm={6} md={6} lg={6} key={product.id}>
          <Card sx={productStyles}>
          <img src={product.images[0]} alt={product.title} style={productImageStyles} />
            <CardContent>
              <Typography variant="subtitle1" gutterBottom sx={productTitleStyles}>
                {product.title}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" sx={productPriceStyles}>
                Precio: ${product.unit_price}
              </Typography>
              <Box sx={buttonContainerStyles}>
                <Button
                   onClick={() => handleBuyClick(product)} 
                   variant="contained"
                   color="primary"
                   size="small"
                   sx={productCartStyles}
                >
                  Comprar
                </Button>
                <IconButton
                  component={Link}
                  to={`/itemDetail/${product.id}`}
                  aria-label="Ver"
                  color="secondary"
                  size="small"
                  sx={productDetailStyles}
                >
                  <VisibilityIcon sx={iconStyles} />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>
  );
};

export default Shop;
