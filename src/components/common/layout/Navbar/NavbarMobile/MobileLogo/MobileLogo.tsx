import React from 'react';
import { Link } from 'react-router-dom';


const MobileLogo: React.FC = () => {
  const alt = 'Logo móvil' 
  const width = 'auto'; // Ancho opcional para el logo móvil
  const height = 'auto'; // Altura opcional para el logo móvil
  const logoUrl = "https://firebasestorage.googleapis.com/v0/b/pinguinos-kids.appspot.com/o/LogoMobile%2FLogoMobile.png?alt=media&token=eca73682-14ea-4dbd-803d-31be6a85d6ad";

  return (
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
  );
};

export default MobileLogo;


