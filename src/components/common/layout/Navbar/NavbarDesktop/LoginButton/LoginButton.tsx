
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';

function LoginButton() {
  // Lógica y diseño del botón de inicio de sesión aquí
  return (
    <IconButton color="inherit" className="login-button" sx={{ marginLeft: 2 }}>
      <PersonIcon sx={{ fontSize: 46 }} />
    </IconButton>
  );
}

export default LoginButton;
