import React, { useEffect, useState } from 'react'
import "./Login.css"
import { toast } from 'react-hot-toast';
import { useGoogleLoginMutation, useRegisterMutation } from '../../api';
import { useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { setActiveUser } from '../../redux/reducers/auth';
import { useDispatch } from 'react-redux';
import { client_id } from '../../config';

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [registerUser, response] = useRegisterMutation()
  const [googleLogin, resp] = useGoogleLoginMutation()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const pathname = location.pathname.split('/').pop();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity()) {
      setLoading(true);
      let payload = { name, email, password, status: pathname }
      registerUser(payload);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleResponse = () => {
    if (response?.data) {
      toast.success(response?.data?.message);
      navigate('/login');
    } else if (response?.error) {
      setLoading(false);
      toast.error(response?.error?.data?.error);
    }
  };

  const googlehandleResponse = () => {
    if (resp?.data) {
      toast.success(resp?.data?.message);
      dispatch(setActiveUser({ ...resp?.data.user, token: resp?.data.token }));
      if (resp?.data?.user?.status === 'student') {
        navigate('/studenttasks');
      } else if (resp?.data?.user?.status === 'teacher') {
        navigate('/studentlist');
      }
    } else if (resp?.error) {
      setLoading(false);
      console.log("resposne error ", resp.error)
      toast.error(resp?.error?.data?.error);
    }
  };

  useEffect(() => {
    googlehandleResponse();
  }, [resp]);

  useEffect(() => {
    handleResponse();
  }, [response]);

  const ressuccessGoogle = (res) => {
    let userData = { ...res?.profileObj, status: pathname, email_verified: true }
    googleLogin(userData)

  }

  const reserrorGoogle = (res) => {
    toast.error("something went wrong !")
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">{`${capitalizeFirstLetter(pathname)} Register`}</h1>
              <form noValidate onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${validated && !name ? 'is-invalid' : ''}`}
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  {validated && !name && (
                    <div className="invalid-feedback">Please enter your name.</div>
                  )}
                </div>

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
                    'Register'
                  )}
                </button>
              </form>
            </div>
            <hr />
            <div className='d-flex justify-content-center'>
              <GoogleLogin
                className='google-button'
                clientId={client_id}
                buttonText="Sigup with Google"
                onSuccess={ressuccessGoogle}
                onFailure={reserrorGoogle}
                cookiePolicy={'single_host_origin'}
                scope="profile"

              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register