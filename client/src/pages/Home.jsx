import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const signUp = (event) => {
    event.preventDefault();
    navigate('/Signup');
  }

    return (
      <main>
        <div className="cover-background">
          <div className="cover-filter">
          <div className="cover-container">
              <h1 className="cover">Build.</h1>
              <h1 className="cover">Customize.</h1>
              <h1 className="cover">Reuse.</h1>
              <p className="sub-cover">Less time reiterating</p>
              <p className="sub-cover">More time where it matters.</p>
              <button id="getStarted" onClick={signUp}>Get Started</button>
          </div>
          </div>
            
        </div>
      </main>
    );
  };
  
  export default Home;