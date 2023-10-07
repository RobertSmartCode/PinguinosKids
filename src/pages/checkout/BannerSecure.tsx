import SecurityIcon from "@mui/icons-material/Security";
import { Box, Typography } from "@mui/material";

const customColors = {
  primary: {
    main: " #8CB369",
    contrastText: " #8CB369",
  },
  secondary: {
    main: "#fff",
    contrastText: "#fff",
  },
};

const BannerSecure: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: customColors.primary.main, // Color de fondo
        color: customColors.secondary.main, // Color del texto
       
        
      }}
    >
      <Typography sx={{ margin: 0,  marginLeft: "40px", marginRight: "10px" }}>
        Compra Segura
      </Typography>
      <SecurityIcon
        sx={{
          fontSize: "36px", // Tamaño del icono
          marginRight: "10px", // Espaciado derecho del icono
        }}
      />
      <Typography sx={{ margin: 0 }}>100% Protegida</Typography>
    </Box>
  );
};

export default BannerSecure;
