

export default function BloqueTemas() {
  const libros = [
    { titulo: 'Ficción', autor: 'Juan Pérez'},
    { titulo: 'No Ficción', autor: 'Ana Gómez'},
    { titulo: 'Ciencia', autor: 'Carlos Ruiz'},
    { titulo: 'Historia', autor: 'Laura Díaz'},
  ]

  return (
    <main>
      <div className="bloque-tema">
        {libros.map((libro, i) => (
          <div className="libro" key={i}>
            <a href="#">
              <h3>{libro.titulo}</h3>
            </a>
            <img src={libro.img} alt={`Libro ${libro.titulo}`} />
            <p>Autor: {libro.autor}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
