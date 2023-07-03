import React, { useEffect, useState } from 'react'
import { useAccessChatMutation, useGetAllTaskQuery } from '../../api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
const Index = () => {

  const user = useSelector(state => state.authReducer.activeUser);
  let payload = {
    created_by: user._id,
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
      navigate(`/chat/${response?.data?.chat._id}`)
    }
  }, [response]);
  return (
    <div className="container">
      <h1 className="text-center mt-5">All Task List</h1>
      <div className="table-responsive mt-4">
        <table className="table table-striped table-hover ">
          <thead>
            <tr>
              <th>S/No</th>
              <th>Title</th>
              <th>Assign to</th>
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
                  <td>{list.assign_to.name}</td>
                  <td>{list.status}</td>
                  <td className='d-flex'>
                    <button className='btn btn-primary mx-1' onClick={() => navigate(`/task/${list._id}`)}>View detail</button>
                    <button className='btn btn-success mx-1' onClick={() => response.isLoading ? null : handleChatAccess(list.assign_to._id, list._id)}>{selectedId === list._id && response.isLoading ? "loading.." : "Chat"}</button>
                  </td>
                </tr>
              ))
                :

                <h3>No Data found</h3>
            }
          </tbody>
        </table>
      </div>
    </div>

  );
};
export default Index