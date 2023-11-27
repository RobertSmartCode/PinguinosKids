import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

const MobileLogo: React.FC = () => {
  const alt = 'Logo Desktop';
  const width = '75px'; // Ancho opcional para el logo móvil
  const height = 'auto'; // Altura opcional para el logo móvil
  const logoUrl = "https://firebasestorage.googleapis.com/v0/b/pinguinos-kids.appspot.com/o/LogoMobile%2FInfinity.PNG?alt=media&token=6b2fbe75-6dc3-4608-a421-8ca77149436d";

  return (
    <Box marginLeft="60px" marginRight="0px">
      <Link to="/" style={{ color: "whitesmoke", textDecoration: "none" }}>
        <img
          src={logoUrl}
          alt={alt}
          style={{
            width,
            height,
          }}
        />
      </Link>
    </Box>
  );
};

export default MobileLogo;

