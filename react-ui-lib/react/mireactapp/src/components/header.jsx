import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <Box
      sx={{
        backgroundImage: "url('/ruta/a/tu/header.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textAlign: "center",
        p: 6,
      }}
    >
      <img src="https://via.placeholder.com/80" alt="Logo" />
      <Typography variant="h3">Librería de libros</Typography>

      {user ? (
        <Button variant="contained" color="secondary" onClick={logout} sx={{ mt: 2 }}>
          Logout
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={() => navigate("/login")} sx={{ mt: 2 }}>
          Login
        </Button>
      )}
    </Box>
  );
}
