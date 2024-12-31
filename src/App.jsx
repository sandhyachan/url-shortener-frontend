import './App.css'
import LoginPage from './pages/Login/Login'
import RegisterPage from './pages/Registration/Registrations'
import { Route, Routes } from 'react-router-dom'
import UrlShortenerPage from './pages/UrlShortener/UrlShortener'


function App() {

  return (
    <>
    <Routes>
      <Route Component={UrlShortenerPage} path='/shorten'/>
      <Route Component={LoginPage} path='/'/>
      <Route Component={RegisterPage} path='/registration'/>
    </Routes>
    </>
  )
}

export default App
