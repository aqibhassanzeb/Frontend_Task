import React from 'react';
import { useGetAllTaskQuery } from '../../api';
import { useParams } from 'react-router-dom';

const TaskDetail = () => {
  // Sample task details (replace with actual data)

  //   useGetTaskbyIdQuery
  let params = useParams()
  let payload = {
    _id: params?.id,
  }
  
  const { data, isLoading } = useGetAllTaskQuery(payload);
  let taskDetail = data?.data[0]

  return (
    <div className="container py-4">
      <h1>Task Detail</h1>

      {isLoading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{taskDetail.title}</h2>
            <h5 className="card-subtitle mb-2 text-muted">Description</h5>
            <p className="card-text">{taskDetail.description}</p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Assigned By:</strong> {taskDetail.created_by.name}
              </li>
              <li className="list-group-item">
                <strong>Teacher Email:</strong> {taskDetail.created_by.email}
              </li>
              <li className="list-group-item">
                <strong>Assigned To:</strong> {taskDetail.assign_to.name}
              </li>
              <li className="list-group-item">
                <strong>Student Email:</strong> {taskDetail.assign_to.email}
              </li>
              <li className="list-group-item">
                <strong>Status:</strong> {taskDetail.status}
              </li>
              <li className="list-group-item">
                <strong>Deadline:</strong> {taskDetail.deadline}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
