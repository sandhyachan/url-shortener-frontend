import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Activation.css';

const ActivationPage = () => {
  const [activationCode, setActivationCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    // Validation for activation code
    if (!activationCode) {
      setErrorMessage('Please enter your activation code.')
      return
    }

    try {
      // Send the activation code to backend
      const response = await axios.post('http://localhost:3000/activation', { activationCode })

      if (response.status === 200) {
        // Navigate to login page
        setTimeout(() => navigate('/'), 2000) 
      }
    } catch (error) {
      console.error('Activation error:', error)

      // Display error message from backend
      const message = error.response?.data?.message || 'An error occurred during activation.'
      setErrorMessage(message)
    }
  }

  return (
    <div className="container">
      <div className="registration-container">
        <h2>Activate Your Account</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="activationCode">Activation Code</label>
            <input
              type="text"
              id="activationCode"
              placeholder="Enter your activation code"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
              required
            />
          </div>

          <button type="submit">Activate</button>
        </form>

        <div className="go-to-login">
          <p>Already activated? <a href="/">Login here</a></p>
        </div>
      </div>
    </div>
  )
}

export default ActivationPage
