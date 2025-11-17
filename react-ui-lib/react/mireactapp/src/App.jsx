import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import BloqueTemas from "./components/BloqueTemas";
import Footer from "./components/Footer";
import Catalogo from "./pages/Catalogo";
import FormularioLibro from "./pages/FormularioLibro";
import LoginPage from "./pages/Login";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function AppRoutes({ libros, setLibros, API_URL }) {
  return (
    <Routes>
      <Route path="/" element={<BloqueTemas libros={libros} />} />
      <Route path="/catalogo" element={<Catalogo libros={libros} />} />
      <Route
        path="/nuevo"
        element={
          <PrivateRoute requiredRole="ADMIN">
            <FormularioLibro
              onAgregar={(nuevo) => setLibros([...libros, nuevo])}
              API_URL={API_URL}
            />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<div>No tienes permisos para ver esta página</div>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function MainApp() {
  const { user, token, loading } = useAuth();
  const [libros, setLibros] = useState([]);
  const API_URL = "http://localhost:3000/api/books";

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const res = await fetch(API_URL, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("Error al cargar libros");
        const data = await res.json();
        setLibros(data.data || []);
      } catch (err) {
        console.error(err);
        setLibros([]);
      }
    };
    fetchLibros();
  }, [token]);

  if (loading) return <p>Cargando usuario...</p>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100vw" }}>
      <Header />
      <Navbar />
      <Box component="main" sx={{ flex: 1, p: 3 }}>
        <AppRoutes libros={libros} setLibros={setLibros} API_URL={API_URL} />
      </Box>
      <Footer />
    </Box>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </Router>
  );
}
