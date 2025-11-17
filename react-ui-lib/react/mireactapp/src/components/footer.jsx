import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#333",
        color: "#fff",
        textAlign: "center",
        p: 2,
        mt: "auto",
      }}
    >
      <Typography variant="body2">
        © 2025 Librería de libros |{" "}
        <Link href="#" color="#1a73e8" underline="hover">
          Términos y Condiciones
        </Link>
      </Typography>
      <Typography variant="body2">
        Síguenos:{" "}
        <Link href="#" color="#1a73e8" underline="hover">Facebook</Link> |{" "}
        <Link href="#" color="#1a73e8" underline="hover">Twitter</Link> |{" "}
        <Link href="#" color="#1a73e8" underline="hover">Instagram</Link>
      </Typography>
    </Box>
  );
}
