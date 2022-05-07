import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import WelcomePage from './pages/WelcomePage'
import { Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Home from './pages/Home'

function App() {

  

  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
