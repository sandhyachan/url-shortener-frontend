import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Registration.css';
import NavigationBar from '../../components/GuestNavBar';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('') 

    // Basic validation checks
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long')
      return
    }

    try {
      // Send registration data to backend
      const response = await axios.post('http://localhost:3000/registration', {
        firstName,
        lastName,
        email,
        password,
        phoneNumber, 
      })

      // Successful registration
      if (response.status === 201) {
        setTimeout(() => navigate('/activation'), 2000) // Redirect to activation page
      }
    } catch (error) {
      console.error("Registration error:", error)

      // Display the error message from the backend
      const message = error.response?.data?.message || 'An error occurred during registration'
      setErrorMessage(message)
    }
  }

  return (<>
  <NavigationBar/>
    <div className="container">
      <div className="registration-container">
        <h2>Create Your Account</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

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

          <div className="mb-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <button type="submit">Register</button>
        </form>
        <div>
            <p>Already have an account? <Link to="/">Login here</Link></p>
          </div>
      </div>
    </div>
    </>
  )
}

export default RegisterPage
