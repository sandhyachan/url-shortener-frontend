import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password })
      localStorage.setItem('authToken', response.data.token) // Save token
      navigate('/dashboard') // Redirect to the dashboard
    } catch (error) {
      console.error('Login failed', error)
      alert('Invalid credentials. Please try again!')
    }
  }
  
  return (
    <div className="container-fluid">
      <div className="container"> 
        <div className="login-container">
          <h2>Welcome to OpalShort</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Login</button>
          </form>

          <div className="forgot-password">
            <p>
              <a href="/forgot-password">Forgot password?</a>
            </p>
          </div>

          <div>
            <p>Don&#39;t have an account? <Link to="/registration">Register here</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
