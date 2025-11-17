import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";

export default function BloqueTemas({ libros = [] }) {
  if (!libros || libros.length === 0) {
    return <p>No hay libros disponibles</p>;
  }

  return (
    <Grid container spacing={3} padding={3}>
      {libros.map((libro) => (
        <Grid item xs={12} sm={6} md={3} key={libro.id}>
          <Card sx={{ transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
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
  );
}
