import  { useContext, useState, useEffect } from 'react';
import {
  Typography,
  IconButton,
  Stack,
  Grid,
  Card,
  CardContent,
  CardActions,
  
} from '@mui/material';
import { CartContext } from '../../../../../../context/CartContext';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const CartItemList = () => {
  const { cart, deleteById, updateQuantityById } = useContext(CartContext)! || {};
  const [productCounters, setProductCounters] = useState<{ [key: string]: number }>({});

  // Función para calcular el subtotal sin envío
  const calculateSubtotal = () => {
    let subtotal = 0;
    cart.forEach((product) => {
      subtotal += product.unit_price * productCounters[product.id];
    });
    return subtotal;
  };

  useEffect(() => {
    // Inicializa los contadores para cada producto en el carrito
    const initialCounters: { [key: string]: number } = {};
    cart.forEach((product) => {
      initialCounters[product.id] = product.quantity;
    });
    setProductCounters(initialCounters);
  }, [cart]);

  const handleCounterChange = (productId: string, value: number) => {
    if (value >= 1) {
      // Actualiza el contador del producto específico
      setProductCounters((prevCounters) => ({
        ...prevCounters,
        [productId]: value,
      }));

      // Llama al método `updateQuantityById` del contexto para actualizar la cantidad en el carrito
      updateQuantityById(productId, value);
    }
  };

  return (
    <Card style={{ marginTop: '-40px' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" style={{ textAlign: 'center'}}>Productos en el Carrito</Typography>
          </Grid>
          {cart?.length ?? 0 > 0 ? (
            <>
              {cart?.map((product) => (
                <Grid item xs={12} key={product.id}>
                  <Card>
                    <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            style={{
                              width: '80%',
                              maxHeight: '100px',
                              objectFit: 'contain',
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            variant="body2"
                            style={{ textAlign: 'center', marginBottom: '30px' }}
                          >
                            {product.title}
                          </Typography>
                          <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                          >
                            <IconButton
                              color="primary"
                              onClick={() => {
                                const newValue = productCounters[product.id] - 1;
                                handleCounterChange(product.id, newValue);
                              }}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography variant="body2">
                              {productCounters[product.id]}
                            </Typography>
                            <IconButton
                              color="primary"
                              onClick={() => {
                                const newValue = productCounters[product.id] + 1;
                                handleCounterChange(product.id, newValue);
                              }}
                            >
                              <AddIcon />
                            </IconButton>
                          </Stack>
                        </Grid>
                        <Grid item xs={4} style={{ textAlign: 'right', }}>
                          <Typography variant="body1" style={{ marginBottom: '30px', paddingRight: '15px'  }}>
                            ${product.unit_price * productCounters[product.id]}
                          </Typography>
                          <CardActions>
                            <IconButton
                              color="secondary"
                              onClick={() => deleteById && deleteById(product.id)}
                              style={{ paddingLeft: '40px'  }}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </CardActions>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Grid
                item
                xs={12}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '20px',
                }}
              >
                <Typography variant="body2" style={{ paddingLeft: '20px' }}>
                  Sub Total (Sin Envío)
                </Typography>
                <Typography variant="body1" style={{ paddingRight: '30px' }}>
                  ${calculateSubtotal()}
                </Typography>
              </Grid>
            </>
          ) : (
            <Typography>El carrito está vacío</Typography>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartItemList;
