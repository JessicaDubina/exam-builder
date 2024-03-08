import { useLocation, useNavigate } from 'react-router-dom';
import './index.css'

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="container w-100 mt-auto">
      <div className="text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="backbtn"
            onClick={() => navigate(-1)}
          >
            &larr; Back
          </button>
        )}
        <h4>
          Find us{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          HERE
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
