
import { useState } from "react";
import { TextField, Grid, Card, CardContent, Typography, CardMedia, Box } from "@mui/material";

export default function Catalogo({ libros = [] }) {
  const [busqueda, setBusqueda] = useState("");

  // Filtrar libros según título o autor
  const resultados = libros.filter((libro) =>
    libro.title.toLowerCase().includes(busqueda.toLowerCase()) ||
    libro.author.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (!libros || libros.length === 0) {
    return <p>No hay libros disponibles</p>;
  }

  return (
    <Box>
      <TextField
        fullWidth
        label="Buscar libro o autor"
        variant="outlined"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Grid container spacing={3}>
        {resultados.map((libro) => (
          <Grid item xs={12} sm={6} md={3} key={libro.id}>
            <Card>
              {libro.img && (
                <CardMedia
                  component="img"
                  height="250"
                  image={libro.img}
                  alt={libro.title}
                />
              )}
              <CardContent>
                <Typography variant="h6">{libro.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Autor: {libro.author}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
