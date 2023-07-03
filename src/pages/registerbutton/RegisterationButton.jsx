import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterationButton = () => {

  const navigate = useNavigate()
  return (
    <div className="container">
      <h1 className="text-center mt-5">Registration</h1>
      <div className="d-flex justify-content-center align-items-center " style={{ height: "50vh" }}>
        <div className="buttons d-flex flex-column ">
          <button className="btn btn-primary teacher-button mb-4" onClick={() => navigate('/register/teacher')}>
            Register as Teacher
          </button>
          <button className="btn btn-primary student-button" onClick={() => navigate('/register/student')}>
            Register as Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterationButton;
