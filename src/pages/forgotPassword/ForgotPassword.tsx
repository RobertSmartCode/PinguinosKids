import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../firebase/firebaseConfig";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let res = await forgotPassword(email);
    console.log(res);
    navigate("/login");
  };

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "40px",
          // backgroundColor: theme.palette.secondary.main,
        }}
      >
        <Typography variant="h5" color="primary">
          ¿Olvidaste tu contraseña?
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            rowSpacing={2}
            // alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={10} md={12}>
              <TextField
                type="email"
                variant="outlined"
                label="Email"
                fullWidth
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={10} md={12}>
              <Button type="submit" variant="contained" fullWidth>
                Recuperar
              </Button>
            </Grid>
            <Grid item xs={10} md={12}>
              <Button
                type="button"
                variant="contained"
                fullWidth
                onClick={() => navigate("/login")}
              >
                Regresar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default ForgotPassword;
