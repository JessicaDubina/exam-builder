import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const [isInstructor, setIsInstructor] = useState(false); // State for instructor checkbox

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCheckboxChange = () => {
    setIsInstructor(!isInstructor); // Toggle the value of isInstructor
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: {
          ...formState,
          instructor: isInstructor, // Include instructor value in the variables
        },
      });
     
      Auth.login(data.addUser.token);
      if (data.addUser.user.instructor) {
        navigate('/instructor'); // Redirect to InstLanding if user is instructor
      } else {
        navigate('/student'); // Redirect to StuLanding if user is student
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="login-container">
      <div className="segment">
        <div className="card">
          <h2 className="login-title">Sign Up</h2>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isInstructor"
                    checked={isInstructor}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="isInstructor">
                    Are you an instructor?
                  </label>
                </div>
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
