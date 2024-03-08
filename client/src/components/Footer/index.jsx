import { useLocation, useNavigate } from 'react-router-dom';
import './index.css'

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="container w-100 mt-auto">
      
        
        <h4 className='footer-content text-center mb-5'>
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
        <div classname="btn-container">
          {location.pathname !== '/' && (
            <button
              className="backbtn"
              onClick={() => navigate(-1)}
            >
              &larr; Back
            </button>
          )}
        </div>
        
     
    </footer>
  );
};

export default Footer;
