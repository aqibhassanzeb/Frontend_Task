  import React, { useEffect, useState } from 'react';
  import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useAssignTaskMutation } from '../../api';
import { toast } from 'react-hot-toast';

  const Taskassignmodal = ({showModal,setShowModal,selectId}) => {
    const activeUser = useSelector(state => state.authReducer.activeUser);
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      deadline: '',
    });
    const [validated, setValidated] = useState(false);
    const [assignTask, response,isLoading] = useAssignTaskMutation();

    const handleCloseModal = () => {
      setFormData({
        title: '',
        description: '',
        deadline: '',
      });
      setShowModal(false);
      setValidated(false);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };

    const handleSave = async(e) => {
      e.preventDefault();
    
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.stopPropagation();
        setValidated(true);
      } else {
        const today = new Date().toISOString().split('T')[0];
        if (formData.deadline < today) {
          setValidated(true);
          // Show validation error for the deadline field
          form.querySelector('#deadlineInput').classList.add('is-invalid');
          form.querySelector('#deadlineFeedback').textContent =
            'Please enter a valid deadline (not before today).';
        } else {
         console.log("form data ",formData,"select id ",selectId,activeUser)
          let {title,description,deadline}=formData
         let payload ={title,description,deadline,created_by:activeUser._id,assign_to:selectId}
       assignTask(payload)
        }
      }
    };

    useEffect(() => {
      console.log("response ,",response)
      if (response?.error) {
        toast.error(response?.error?.data?.error);
      } else if (response?.data) {
        toast.success(response?.data?.message);
        handleCloseModal();
      }
    }, [response]);
    return (
      <>

        {/* Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Assign Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSave}>
              <Form.Group controlId="titleInput">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a title.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="descriptionInput">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a description.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="deadlineInput">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className={validated && formData.deadline < new Date().toISOString().split('T')[0] ? 'is-invalid' : ''}
              />
              <Form.Control.Feedback id="deadlineFeedback" type="invalid">
                Please enter a valid deadline.
              </Form.Control.Feedback>
            </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="primary" disabled={isLoading} type="submit">
                 {isLoading ? "loading.." : "Save"}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  };

  export default Taskassignmodal;
