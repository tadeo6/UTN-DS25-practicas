
import './assets/estilo.css'
import Header from './components/header'
import Navbar from './components/navbar'
import BloqueTemas from './components/bloquetemas'
import Footer from './components/footer'

function App() {
  return (
    <div className="app-container">
      <Header />
      <Navbar />
      <main>
        <BloqueTemas />
      </main>
      <Footer />
    </div>
  )
}

export default App
