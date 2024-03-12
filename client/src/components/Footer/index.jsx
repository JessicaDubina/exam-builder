import { useLocation, useNavigate } from 'react-router-dom';
import './index.css'

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="">
      
        
        <h4 className='footer-content'>
          Find us{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          <a href="https://github.com/JessicaDubina/exam-builder" style={{textDecoration: "none", color: "black", fontWeight: "bold"}}>Here</a>
        </h4>
        <div className="btn-container">
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
