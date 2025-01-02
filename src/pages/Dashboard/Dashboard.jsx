import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import UserNavBar from '../../components/UserNavBar';
import PropTypes from 'prop-types';

const DashboardPage = ({setLoggedIn}) => {
  const [urlsCreatedToday, setUrlsCreatedToday] = useState(0);
  const [urlsCreatedThisMonth, setUrlsCreatedThisMonth] = useState(0);
  const [shortUrl, setShortUrl] = useState('');
  const [longUrl, setLongUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingStats, setLoadingStats] = useState(true); // For loading state
  const [loadingShortUrl, setLoadingShortUrl] = useState(false); // For creating short URL loading
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      // If no token is found, redirect to login page
      navigate('/');
    } else {
    // Fetch statistics for the dashboard
    axios.get('http://localhost:3000/dashboard/statistics', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUrlsCreatedToday(response.data.urlsCreatedToday);
        setUrlsCreatedThisMonth(response.data.urlsCreatedThisMonth);
        setLoadingStats(false);
      })
      .catch(error => {
        console.error('Error fetching statistics:', error);
        setLoadingStats(false);
        setErrorMessage('Failed to load statistics.');

        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          navigate('/');
        }
      });
    }
  }, [navigate]);

  const handleCreateShortUrl = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoadingShortUrl(true); // Set loading when submitting the form

    if (!longUrl) {
        setErrorMessage('Please enter a valid long URL.');
        setLoadingShortUrl(false);
        return;
    }

    const token = localStorage.getItem('authToken'); // Get the token from localStorage

    // Check if token is missing or invalid
    if (!token) {
        setErrorMessage('You must be logged in to create a short URL.');
        navigate('/'); // Redirect to login page if no token
        setLoadingShortUrl(false);
        return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/shorten-url', 
        { longUrl },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    );
    
    if (response.status === 200) {
      // Check if the response contains a short URL (this means it already existed)
      setShortUrl(response.data.shortUrl); // Add token to the short URL
      setLongUrl(''); // Clear the input field
    } else {
      setErrorMessage('Something went wrong while creating the short URL.');
  }
    } catch (error) {
        console.error('Error creating short URL:', error);
        if (error.response && error.response.status === 401) {
            setErrorMessage('Session expired or invalid token. Please log in again.');
            navigate('/'); // Redirect to login if token is invalid/expired
        } else {
            setErrorMessage('Failed to create the short URL.');
        }
    }

    setLoadingShortUrl(false); // Stop loading when request is done
}; 


  const handleViewAllUrls = () => {
    navigate('/all-urls');
  };

  return (<>
  <UserNavBar setLoggedIn={setLoggedIn}/>
    <div className="container">
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {loadingStats ? (
          <div className="loading">Loading statistics...</div>
        ) : (
          <div className="statistics">
            <div className="stat-item">
              <h3><i className="fas fa-calendar-day"></i> Total URLs Created Today</h3>
              <p>{urlsCreatedToday}</p>
            </div>
            <div className="stat-item">
              <h3><i className="fas fa-calendar-week"></i> Total URLs Created This Month</h3>
              <p>{urlsCreatedThisMonth}</p>
            </div>
          </div>
        )}

        <div className="url-actions">
          <div className="create-url">
            <h3>Create a Short URL</h3>
            <form onSubmit={handleCreateShortUrl}>
              <input
                type="url"
                id="longUrl"
                placeholder="Enter your long URL"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                required
              />
              <button type="submit" disabled={loadingShortUrl}>
                {loadingShortUrl ? 'Creating...' : 'Create Short URL'}
              </button>
            </form>

            {shortUrl && (
              <div className="short-url">
                <p>Short URL: 
                  <a href={`http://localhost:3000/${shortUrl}?token=${localStorage.getItem('authToken')}`} className='text-primary' target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
              </div>
            )}
          </div>

          <div className="view-all-urls">
            <button onClick={handleViewAllUrls}>View All URLs</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DashboardPage;

DashboardPage.propTypes ={
  setLoggedIn: PropTypes.func.isRequired
}