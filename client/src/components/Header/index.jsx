import { Link } from 'react-router-dom';
import './index.css';

import Auth from '../../utils/auth';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [meRoute, setMeRoute] = useState('/');

  const { data, loading } = useQuery(GET_ME);

  useEffect(() => {
    if (!loading && data) {
      const isInstructor = data.me.instructor;
      setMeRoute(isInstructor ? '/InstLanding' : '/StudentLanding');
    }
  }, [data, loading]);  
  
  console.log(meRoute);

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
              <Link className="mebtn" to={meRoute}>
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
