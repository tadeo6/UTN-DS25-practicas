import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function FormularioLibro({ onAgregar, API_URL }) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [precio, setPrecio] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !autor || precio <= 0) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: titulo, author: autor, price: precio, stock: 0 }),
      });

      if (!res.ok) throw new Error("Error al crear libro");
      const data = await res.json();
      onAgregar(data.data);
      navigate("/catalogo");
    } catch (err) {
      console.error(err);
      alert("No se pudo agregar el libro");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField label="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
      <TextField label="Autor" value={autor} onChange={(e) => setAutor(e.target.value)} required />
      <TextField
        label="Precio"
        type="number"
        value={precio}
        onChange={(e) => setPrecio(Number(e.target.value))}
        required
      />
      <Button type="submit" variant="contained">Agregar Libro</Button>
    </Box>
  );
}
