import './App.css'
import LoginPage from './pages/Login/Login'
import RegisterPage from './pages/Registration/Registrations'
import { Route, Routes } from 'react-router-dom'
import UrlShortenerPage from './pages/UrlShortener/UrlShortener'
import ActivationPage from './pages/Activation/Activation'
import DashboardPage from './pages/Dashboard/Dashboard'


function App() {

  return (
    <>
    <Routes>
      <Route Component={UrlShortenerPage} path='/shorten'/>
      <Route Component={LoginPage} path='/'/>
      <Route Component={RegisterPage} path='/registration'/>
      <Route Component={ActivationPage} path='/activation'/>
      <Route Component={DashboardPage} path='/dashboard'/>
    </Routes>
    </>
  )
}

export default App
