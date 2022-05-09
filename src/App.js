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
  const [userId, setUserId] =useState(null)
  
  useEffect(() => {
    const token = localStorage.getItem('JWT')
    if (token)
       CheckSession()
  }, [])

  const CheckSession = async () => {
    try {
      const res = await Client.get('/user/session')
      setUser(res.data.username)
      setUserId(res.data.id)
    }
    catch (error) {
      throw error
    }
  }

  return (
    <div className="App">
      <Header user={user}/>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path={`/${userId}/home`} element={<Home user={user}  />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
