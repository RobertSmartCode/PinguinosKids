import React, { useContext, useState } from 'react';
import { TextField, Box, Typography, Avatar } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CartContext } from '../../context/CartContext';
interface CouponDiscount {
  promoCode: string; // Cambia el nombre de la propiedad a promoCode
  discountPercentage: number; // Cambia el nombre de la propiedad a discountPercentage

  createdAt: Date; // Agrega la propiedad createdAt
  duration: number; // Agrega la propiedad duration
  maxDiscountAmount: number; // Agrega la propiedad maxDiscountAmount
  minPurchaseAmount: number; // Agrega la propiedad minPurchaseAmount
}

type ValidateCouponFunction = (couponCode: string) => Promise<CouponDiscount | null>;

const CouponValidation: React.FC = () => {

  const { updateDiscountInfo, getTotalPrice, getSelectedShippingMethod, discountInfo  } = useContext(CartContext)! || {};

  const [isCouponValid, setIsCouponValid] = useState(false);
  const [couponInfo, setCouponInfo] = useState<CouponDiscount | null>(null);
  const [showValidationAlert, setShowValidationAlert] = useState(false);


  
  // Función para calcular el subtotal sin envío
  const subtotal = getTotalPrice ? getTotalPrice() : 0;
  
  const selectedShippingMethod= getSelectedShippingMethod()

  
  const shippingCost = selectedShippingMethod ? selectedShippingMethod.price : 0;
  
  // Calcular el total sumando el subtotal y el costo de envío
  const total = subtotal  + shippingCost;

  const validationSchema = Yup.object({
    couponCode: Yup.string().required('El código del cupón es requerido'),
  });

  const formik = useFormik({
    initialValues: {
      couponCode: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const validatedCoupon = await validateCoupon(values.couponCode);

      if (validatedCoupon) {
        setIsCouponValid(true);
        setCouponInfo(validatedCoupon);
      } else {
        setShowValidationAlert(true);

        setTimeout(() => {
          setShowValidationAlert(false);
          formik.resetForm();
        }, 1000); // Ocultar la alerta después de 1 segundo
      }
    },
  });
  const validateCoupon: ValidateCouponFunction = async (couponCodeToValidate) => {
    try {
      const couponsCollection = collection(db, 'promoCodes');
      const querySnapshot = await getDocs(
        query(couponsCollection, where('promoCode', '==', couponCodeToValidate))
      );
  
      if (querySnapshot.size === 1) {
        // Obtiene el documento del cupón encontrado
        const couponDoc = querySnapshot.docs[0];
  
        // Verifica si el documento contiene los campos necesarios
        if (
          couponDoc.data().promoCode &&
          couponDoc.data().discountPercentage !== null &&
          couponDoc.data().createdAt &&
          couponDoc.data().duration !== null &&
          couponDoc.data().maxDiscountAmount !== null &&
          couponDoc.data().minPurchaseAmount !== null
        ) {
          // Extrae los valores específicos del documento
          const promoCode = couponDoc.data().promoCode;
          const discountPercentage = couponDoc.data().discountPercentage;
          const createdAt = couponDoc.data().createdAt.toDate();
          const duration = couponDoc.data().duration;
          const maxDiscountAmount = couponDoc.data().maxDiscountAmount;
          const minPurchaseAmount = couponDoc.data().minPurchaseAmount;
  
          // Verifica si el cupón ha caducado
          const currentDate = new Date();
          const couponExpirationDate = new Date(createdAt);
          couponExpirationDate.setDate(couponExpirationDate.getDate() + duration);
  
          if (currentDate <= couponExpirationDate) {
            // Calcula el descuento
            console.log(total)
            const discountAmount = (discountPercentage / 100) * total;
  
            // Aplica el descuento máximo
            const newTotal =
              discountAmount > maxDiscountAmount ? total - maxDiscountAmount : total - discountAmount;
  
            // Verifica el monto mínimo de compra
            if (newTotal >= minPurchaseAmount) {
              // El cupón es válido, aplica el descuento
              const newDiscountInfo = {
                promoCode,
                discountPercentage,
                createdAt,
                duration,
                maxDiscountAmount,
                minPurchaseAmount,
                isValid: true,
              };
  
              // Llama a updateDiscountInfo para actualizar la información del descuento en el contexto
              updateDiscountInfo(newDiscountInfo);
  
              // Devuelve el objeto compatible con la interfaz CouponDiscount
              return newDiscountInfo;
            } else {
              // El monto mínimo de compra no se cumple
              console.error('El monto mínimo de compra no se cumple.');
              return null;
            }
          } else {
            // El cupón ha caducado
            console.error('El cupón ha caducado.');
            return null;
          }
        } else {
          // Los campos necesarios no están presentes en el documento
          console.error('El documento de cupón no contiene todos los campos necesarios.');
          return null;
        }
      } else {
        // No se encontró un cupón con el código proporcionado
        return null;
      }
    } catch (error) {
      console.error('Error validating coupon:', error);
      return null;
    }
  };

  const discountPercentage = discountInfo ? discountInfo.discountPercentage : 0;

  const newTotal = (subtotal + shippingCost) * (1 - (discountPercentage ?? 0) / 100);
 
  
  return (
    <Box display="flex" flexDirection="column" alignItems="center" margin="0 25px" marginTop="30px" marginBottom="30px">
      <TextField
        label="¿Tienes un cupón de descuento?"
        variant="outlined"
        fullWidth
        name="couponCode"
        value={formik.values.couponCode}
        onChange={formik.handleChange}
        error={formik.touched.couponCode && Boolean(formik.errors.couponCode)}
        helperText={formik.touched.couponCode && formik.errors.couponCode}
        className={formik.errors.couponCode ? 'errorBorder' : ''}
        InputProps={{
          endAdornment: (
            <Avatar
              variant="circular"
              color="primary"
              style={{
                marginLeft: '-42px',
                cursor: 'pointer',
              }}
              onClick={() => formik.handleSubmit()}
            >
              &gt;
            </Avatar>
          ),
        }}
      />

      {showValidationAlert && (
        <Typography variant="body1" style={{ color: 'red', marginTop: '8px' }}>
          El cupón ingresado no es válido.
        </Typography>
      )}

      {isCouponValid && couponInfo && (
       <Box mt={2}>
       <Typography variant="subtitle1">Descuento Aplicado:</Typography>
       <Typography variant="body1" style={{ color: 'black' }}>
         Se aplicó un descuento del {couponInfo.discountPercentage}%.
       </Typography>
       <Typography variant="body1" style={{ color: 'black' }}>
         <span style={{ textDecoration: 'line-through' }}>${total.toFixed(2)}</span> ${newTotal.toFixed(2)}
       </Typography>
     </Box>
     
      
      )}
    </Box>
  );
};

export default CouponValidation;
