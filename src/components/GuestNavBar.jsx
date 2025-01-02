import { Link } from 'react-router-dom';
import './Navbar.css'

const GuestNavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#a0c4ff' }}>
      <div className="container-fluid"> {/* Use container-fluid for full-width */}
        <a className="navbar-brand" href="/">OpalShort</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/registration">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default GuestNavBar