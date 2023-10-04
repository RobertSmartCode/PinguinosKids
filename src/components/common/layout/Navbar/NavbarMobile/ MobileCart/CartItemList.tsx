import { useContext, useState, useEffect } from 'react';
import { Typography, Box, Card, CardActions, IconButton, Stack } from '@mui/material';
import { CartContext } from '../../../../../../context/CartContext';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const CartItemList = () => {
  const { cart, deleteById, updateQuantityById } = useContext(CartContext)! || {};
  const [productCounters, setProductCounters] = useState<{ [key: string]: number }>({});
  

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
    <>
    {cart?.length ?? 0 > 0 ? (
  <>
    <ul>
      {cart?.map((product) => (
        <li key={product.id} style={{ listStyle: 'none' }}>
          <Card>
            <img src={product.images[0]} alt={product.title} style={{ maxWidth: '20%' }} />
            <Box display="flex" alignItems="center" justifyContent="space-between" padding={1}>
              <Typography>{product.title}</Typography>
              <CardActions>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      const newValue = productCounters[product.id] - 1;
                      handleCounterChange(product.id, newValue); 
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body2">{productCounters[product.id]}</Typography>
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
              </CardActions>
              <IconButton
                color="secondary"
                onClick={() => deleteById && deleteById(product.id)}
                >
                <DeleteForeverIcon />
             </IconButton>
            </Box>
          </Card>
        </li>
      ))}
    </ul>
  </>
) : (
  <Typography>El carrito está vacío</Typography>
)}

    </>
  );
};

export default CartItemList;
