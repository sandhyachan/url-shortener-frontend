import './App.css';
import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Registration/Registrations';
import { Route, Routes } from 'react-router-dom';
import ActivationPage from './pages/Activation/Activation';
import DashboardPage from './pages/Dashboard/Dashboard';
import { useEffect, useState } from 'react';
import AllUrlsPage from './pages/AllUrls/AllUrls';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if(token){
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [])
  if (isLoggedIn === null) {
    return <div>Loading...</div>; // Or a spinner / loader
  }

  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route path="/" Component={()=><LoginPage setLoggedIn={setLoggedIn}/>} />
          <Route path="/registration" Component={RegisterPage} />
          <Route path="/activation" Component={ActivationPage} />
        </>
      ) : (
        <>
          <Route path="/dashboard" Component={()=><DashboardPage setLoggedIn={setLoggedIn}/>} />
          <Route path="/all-urls" Component={AllUrlsPage} />
          <Route path="*" /> 
        </>
      )}
    </Routes>
  );
}

export default App;
