import React from 'react';
import { useTheme } from '@mui/material/styles'; // Importa useTheme desde Material-UI

interface MobileLogoProps {
  src: string; // URL de la imagen del logo para móviles
  alt: string; // Texto alternativo para la imagen del logo
  width?: string; // Ancho opcional para el logo móvil
  height?: string; // Altura opcional para el logo móvil
}

const MobileLogo: React.FC<MobileLogoProps> = ({ src, alt, width = 'auto', height = 'auto' }) => {
  const theme = useTheme(); // Obtiene el tema actual

  return (
    <img
      src={src}
      alt={alt}
      style={{
        width,
        height,
        color: theme.palette.text.primary, // Define el color del texto alternativo usando el tema
      }}
    />
  );
};

export default MobileLogo;

