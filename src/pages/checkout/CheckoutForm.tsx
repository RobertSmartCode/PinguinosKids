import { useContext, } from "react";
import {
  Typography,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button
  
} from "@mui/material";

import { CartContext } from '../../context/CartContext';
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';

interface CustomerInfo {
  email: string;
  receiveOffers: boolean;
  country: string;
  identificationDocument: string;
  firstName: string;
  lastName: string;
  phone: string;
  isOtherPerson: boolean;
  otherPersonFirstName: string;
  otherPersonLastName: string;
  streetAndNumber: string;
  department: string;
  neighborhood: string;
  city: string;
  postalCode: string;
  province: string;
}


const CheckoutForm = () => {

    const {getCustomerInformation, setCustomerInformation} = useContext(CartContext)! || {};
    const currentUser = getCustomerInformation();
    const navigate = useNavigate();

    const initialValues: CustomerInfo = {
      email: currentUser?.email || "",
      receiveOffers: currentUser?.receiveOffers || false,
      country: currentUser?.country || "",
      identificationDocument: currentUser?.identificationDocument || "",
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      phone: currentUser?.phone || "",
      isOtherPerson: currentUser?.isOtherPerson || false,
      otherPersonFirstName: currentUser?.otherPersonFirstName || "",
      otherPersonLastName: currentUser?.otherPersonLastName || "",
      streetAndNumber: currentUser?.streetAndNumber || "",
      department: currentUser?.department || "",
      neighborhood: currentUser?.neighborhood || "",
      city: currentUser?.city || "",
      postalCode: currentUser?.postalCode || "",
      province: currentUser?.province || "",
    };
  
      const validationSchema = Yup.object().shape({
        email: Yup.string()
          .email("Correo electrónico inválido")
          .required("Campo requerido"),
        country: Yup.string().required("Campo requerido"),
        identificationDocument: Yup.string().required("Campo requerido"),
        firstName: Yup.string().required("Campo requerido"),
        lastName: Yup.string().required("Campo requerido"),
        phone: Yup.string().required("Campo requerido"),
        streetAndNumber: Yup.string().required("Campo requerido"),
        city: Yup.string().required("Campo requerido"),
        postalCode: Yup.string().required("Campo requerido"),
        province: Yup.string().required("Campo requerido"),
      });

      const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
          // Comprobación para asegurarse de que los valores no sean undefined
          const customerData: CustomerInfo = {
            email: values.email || "",
            receiveOffers: values.receiveOffers || false,
            country: values.country || "",
            identificationDocument: values.identificationDocument || "",
            firstName: values.firstName || "",
            lastName: values.lastName || "",
            phone: values.phone || "",
            isOtherPerson: values.isOtherPerson || false,
            otherPersonFirstName: values.otherPersonFirstName || "",
            otherPersonLastName: values.otherPersonLastName || "",
            streetAndNumber: values.streetAndNumber || "",
            department: values.department || "",
            neighborhood: values.neighborhood || "",
            city: values.city || "",
            postalCode: values.postalCode || "",
            province: values.province || "",
            // Agregar otras propiedades con comprobación similar...
          };
    
          setCustomerInformation(customerData);
    
          navigate("/checkout/next");
        },
      });

  

  
  

  const titleStyle = {
    fontWeight: "bold",
    color: "black", // Color negro
  };

  const labelStyle = {
    
    color: "gray", // Color negro
    fontSize: "12px",
  };

 
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box maxWidth="400px" margin="0 auto" padding="25px">
        <Typography variant="h6" align="left" style={titleStyle}>
          <strong>Datos de Contacto</strong>
        </Typography>
        <TextField
          fullWidth
          label="Correo Electrónico"
          variant="outlined"
          margin="normal"
          required
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.receiveOffers}
              onChange={formik.handleChange}
              name="receiveOffers"
            />
          }
          label={
            <Typography style={labelStyle}>
              Quiero recibir ofertas y novedades por email
            </Typography>
          }
        />
        <Typography variant="h6" align="left" style={titleStyle}>
          <strong>Datos de Facturación</strong>
        </Typography>
        <TextField
          fullWidth
          label="País"
          variant="outlined"
          margin="normal"
          required
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          error={formik.touched.country && !!formik.errors.country}
          helperText={formik.touched.country && formik.errors.country}
        />
        <TextField
          fullWidth
          label="Documento de Identidad"
          variant="outlined"
          margin="normal"
          required
          name="identificationDocument"
          value={formik.values.identificationDocument}
          onChange={formik.handleChange}
          error={formik.touched.identificationDocument && !!formik.errors.identificationDocument}
          helperText={formik.touched.identificationDocument && formik.errors.identificationDocument}
        />
        <TextField
          fullWidth
          label="Nombre"
          variant="outlined"
          margin="normal"
          required
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && !!formik.errors.firstName}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          fullWidth
          label="Apellido"
          variant="outlined"
          margin="normal"
          required
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && !!formik.errors.lastName}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          fullWidth
          label="Teléfono"
          variant="outlined"
          margin="normal"
          required
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && !!formik.errors.phone}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.isOtherPerson}
              onChange={formik.handleChange}
              name="isOtherPerson"
            />
          }
          label={
            <Typography style={labelStyle}>
              Otra persona retirará el pedido
            </Typography>
          }
        />
        {formik.values.isOtherPerson && (
          <>
            <Typography style={titleStyle}>
              Persona que retirará el pedido
            </Typography>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              margin="normal"
              name="otherPersonFirstName"
              value={formik.values.otherPersonFirstName}
              onChange={formik.handleChange}
              error={formik.touched.otherPersonFirstName && !!formik.errors.otherPersonFirstName}
              helperText={formik.touched.otherPersonFirstName && formik.errors.otherPersonFirstName}
            />
            <TextField
              fullWidth
              label="Apellido"
              variant="outlined"
              margin="normal"
              name="otherPersonLastName"
              value={formik.values.otherPersonLastName}
              onChange={formik.handleChange}
              error={formik.touched.otherPersonLastName && !!formik.errors.otherPersonLastName}
              helperText={formik.touched.otherPersonLastName && formik.errors.otherPersonLastName}
            />
          </>
        )}
        <Typography variant="subtitle1" style={titleStyle}>
          <strong>Datos del Domicilio de la Persona que Pagará el Pedido</strong>
        </Typography>
        <TextField
          fullWidth
          label="Calle y Número"
          variant="outlined"
          margin="normal"
          required
          name="streetAndNumber"
          value={formik.values.streetAndNumber}
          onChange={formik.handleChange}
          error={formik.touched.streetAndNumber && !!formik.errors.streetAndNumber}
          helperText={formik.touched.streetAndNumber && formik.errors.streetAndNumber}
        />
        <TextField
          fullWidth
          label="Departamento (Opcional)"
          variant="outlined"
          margin="normal"
          name="department"
          value={formik.values.department}
          onChange={formik.handleChange}
        />
        <TextField
          fullWidth
          label="Barrio (Opcional)"
          variant="outlined"
          margin="normal"
          name="neighborhood"
          value={formik.values.neighborhood}
          onChange={formik.handleChange}
        />
        <TextField
          fullWidth
          label="Ciudad"
          variant="outlined"
          margin="normal"
          required
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && !!formik.errors.city}
          helperText={formik.touched.city && formik.errors.city}
        />
        <TextField
          fullWidth
          label="Código Postal"
          variant="outlined"
          margin="normal"
          required
          name="postalCode"
          value={formik.values.postalCode}
          onChange={formik.handleChange}
          error={formik.touched.postalCode && !!formik.errors.postalCode}
          helperText={formik.touched.postalCode && formik.errors.postalCode}
        />
        <TextField
          fullWidth
          label="Provincia"
          variant="outlined"
          margin="normal"
          required
          name="province"
          value={formik.values.province}
          onChange={formik.handleChange}
          error={formik.touched.province && !!formik.errors.province}
          helperText={formik.touched.province && formik.errors.province}
        />
         <Box display="flex" justifyContent="center" marginTop="20px">
            
         <Button
          variant="contained"
          color="primary"
          type="button" // Cambiar "submit" a "button" para evitar el envío automático
          onClick={() => {
          if (formik.isValid) {
            formik.handleSubmit(); // Ejecuta la validación y el envío manualmente
              }
            }}
          >
          Continuar
         </Button>

        </Box>
      </Box>
    </form>
  );
  
  
};

export default CheckoutForm;
