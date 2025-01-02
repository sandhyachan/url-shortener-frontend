import PropTypes from 'prop-types';
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

const UserNavBar = ({setLoggedIn}) => {
    const navigate = useNavigate()

    function handleLogout(){
        console.log("Logging out...");
        localStorage.removeItem('authToken')
        setLoggedIn(false)
        navigate('/')
    }
    function handleProfile(){
        navigate('/dashboard')
    }
    
  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={{ backgroundColor: '#a0c4ff' }}>
      <div className="container-fluid"> {/* Use container-fluid for full-width */}
        <a className="navbar-brand">OpalShort</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="btn btn-light p-1" onClick={handleLogout}>Logout</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-warning p-1" onClick={handleProfile}>Profile</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default UserNavBar

UserNavBar.propTypes ={
  setLoggedIn: PropTypes.func.isRequired
}

