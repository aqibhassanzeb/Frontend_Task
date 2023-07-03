import React, { useState } from 'react'
import { useGetStudentsQuery } from '../../api';
import Taskassignmodal from '../../components/taskassign/Taskassignmodal';
import { useNavigate } from 'react-router-dom';
const Index = () => {

  const [showModal, setShowModal] = useState(false);
  const [selectId, setSelectId] = useState("")
  const { data, isLoading } = useGetStudentsQuery();
  const students = data && data.data.filter(list => list.status === 'student');
  const navigate = useNavigate()

  const handleSelect = (id) => {
    setSelectId(id)
    setShowModal(true)
  }

  return (
    <div className="container">
      <h1 className="text-center mt-5">All User List</h1>
      <div className='d-flex justify-content-end'>
        <button className='btn btn-primary m-2' onClick={() => navigate("/tasklist")}>Task List</button>
        <button className='btn btn-success m-2' onClick={() => navigate("/chat/null")}>Chat </button>
      </div>
      <div className="table-responsive mt-4">
        <table className="table table-striped table-hover ">
          <thead>
            <tr>
              <th>S/No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? <h3>loading...</h3>
              :
              students.length > 0 && students.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><button className='btn btn-primary' onClick={() => handleSelect(user._id)}>assign task</button></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Taskassignmodal showModal={showModal} setShowModal={setShowModal} selectId={selectId} />
    </div>

  );
};
export default Index