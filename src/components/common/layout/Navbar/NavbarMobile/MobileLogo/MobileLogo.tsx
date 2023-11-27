import React from 'react';
import { Link } from 'react-router-dom';

const MobileLogo: React.FC = () => {
  const alt = 'Logo móvil'; 
  const width = '50px'; // Ancho opcional para el logo móvil
  const height = 'auto'; // Altura opcional para el logo móvil
  const logoUrl = "https://firebasestorage.googleapis.com/v0/b/pinguinos-kids.appspot.com/o/LogoMobile%2FInfinty2.PNG?alt=media&token=a7524908-493f-4a63-b6ae-fa776fd66dca";

  return (
    <Link to="/" style={{ color: "whitesmoke", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", margin: "10px 10px 10px 0px", padding: "10px" }}>
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
