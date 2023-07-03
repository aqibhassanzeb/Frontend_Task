import React, { useEffect, useState } from 'react'
import "./Login.css"
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api';
import { useDispatch } from 'react-redux';
import { setActiveUser } from '../../redux/reducers/auth';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, response] = useLoginMutation();


  const handleResponse = () => {
    if (response?.data) {
      toast.success(response?.data?.message);
      dispatch(setActiveUser({ ...response?.data.user, token: response?.data.token }));
      if (response?.data?.user?.status === 'student') {
        navigate('/studenttasks');
      } else if (response?.data?.user?.status === 'teacher') {
        navigate('/studentlist');
      }
    } else if (response?.error) {
      setLoading(false);
      toast.error(response?.error?.data?.error);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity()) {
      setLoading(true);
      const data = { email, password }
      loginUser(data);
    }
  };

  useEffect(() => {
    handleResponse();
  }, [response]);


  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Login</h1>
              <form noValidate onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${validated && !email ? 'is-invalid' : ''}`}
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {validated && !email && (
                    <div className="invalid-feedback">Please enter your email address.</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${validated && !password ? 'is-invalid' : ''}`}
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {validated && !password && (
                    <div className="invalid-feedback">Please enter your password.</div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  ) : (
                    'Log In'
                  )}
                </button>
                <div className="text-center mt-3">
                  Don't have an account? <Link to="/regiterprepare">Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login