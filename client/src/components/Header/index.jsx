import { Link } from 'react-router-dom';
import './index.css'

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="mb-4 py-3 flex-row align-center">
      <div className="header-container">
        <div className="title-bar">
          <h1 id="header-title" className="text-light">Exam Builder</h1>
          <p>Customize and reuse exams without the headache</p>
        </div>
        <div className="profile-info">
          {Auth.loggedIn() ? (
            <>
              <Link className="mebtn" to="/me">
                {/* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username  */}
                {Auth.getUser().authenticatedPerson.username}
              </Link>
              <button className="logbtn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="logbtn" to="/login">
                Login
              </Link>
              <Link className="logbtn" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
