import React, { useEffect, useState } from 'react'
import { useAccessChatMutation, useGetAllTaskQuery } from '../../api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
const StudentTaskList = () => {

  const user = useSelector(state => state.authReducer.activeUser);
  let payload = {
    assign_to: user._id,
  }
  const { data, isLoading } = useGetAllTaskQuery(payload);

  const [chatAcess, response] = useAccessChatMutation()
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState("")


  const handleChatAccess = (studentId, selectedId) => {
    setSelectedId(selectedId)
    let payload = { teacher: user._id, student: studentId }
    chatAcess(payload)
  }
  
  useEffect(() => {
    if (response?.error) {
      toast.error(response?.error?.data?.error);
    } else if (response?.data) {
      navigate(`/chats/${response?.data?.chat._id}`)
    }
  }, [response]);

  return (
    <div className="container">
      <h1 className="text-center mt-5">All Task List</h1>
      <div className='d-flex justify-content-end'>
        <button className='btn btn-success m-2' onClick={() => navigate("/chats/null")}>Messages </button>
      </div>
      <div className="table-responsive mt-4">
        <table className="table table-striped table-hover ">
          <thead>
            <tr>
              <th>S/No</th>
              <th>Title</th>
              <th>Assign by</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? <h3>loading...</h3>
              :
            data?.data.length > 0 ? data?.data.map((list, index) => (
                <tr key={list._id}>
                  <td>{index + 1}</td>
                  <td>{list.title}</td>
                  <td>{list.created_by.name}</td>
                  <td>{list.status}</td>
                  <td className='d-flex'
                  ><button className='btn btn-primary mx-1' onClick={() => navigate(`/tasks/${list._id}`)}>View detail</button>
                    <button className='btn btn-success mx-1' onClick={() => response.isLoading ? null : handleChatAccess(list.assign_to._id, list._id)}>chat</button>
                  </td>
                </tr>
              )) : <p>No Data</p>}
          </tbody>
        </table>
      </div>
    </div>

  );
};
export default StudentTaskList