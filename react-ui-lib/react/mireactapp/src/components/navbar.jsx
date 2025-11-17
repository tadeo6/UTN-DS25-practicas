
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  const items = [
    { nombre: "Inicio", ruta: "/" },
    { nombre: "Catálogo", ruta: "/catalogo" },
    { nombre: "Agregar Libro", ruta: "/nuevo" },
  ];

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "center", flexWrap: "wrap" }}>
        {items.map((item, i) => (
          <Box key={i} mx={1}>
            <Button color="inherit" component={Link} to={item.ruta}>
              {item.nombre}
            </Button>
          </Box>
        ))}
      </Toolbar>
    </AppBar>
  );
}
