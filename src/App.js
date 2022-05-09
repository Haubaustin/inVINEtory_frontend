import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import WelcomePage from './pages/WelcomePage'
import { Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Home from './pages/Home'
import { useEffect, useState } from 'react'
import Client from './services/api';

function App() {
  const [user, setUser] = useState(null)
  const [auth, setAuth] = useState(false)
  
  useEffect(() => {
    const token = localStorage.getItem('JWT')
    if (token)
       CheckSession()
  }, [])

  const CheckSession = async () => {
    try {
      const res = await Client.get('/user/session')
      console.log(res.data)
      setUser(res.data.username)
      if (user) {
        setAuth(true)}
    }
    catch (error) {
      throw error
    }
  }

  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home user={user} auth={auth} />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
