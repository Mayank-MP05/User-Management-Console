import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Dialog,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

function EditRecord({ isOpen, closeDialog, editUserObj, updateUserCallback }) {
  const [userRecordLocal, setuserRecordLocal] = useState({ ...editUserObj });

  const handleChange = (key) => (event) => {
    const newValue = event.target.value.trim();
    if (newValue == '') return;
    setuserRecordLocal({ ...userRecordLocal, [key]: event.target.value });
  };

  const resetForm = () => setuserRecordLocal({ ...editUserObj });
  const updateData = () => {
    const { name, email, role } = userRecordLocal;
    updateUserCallback(editUserObj.id, {
      id: editUserObj.id,
      name,
      email,
      role,
    });
    closeDialog();
  };

  useEffect(() => {
    setuserRecordLocal({ ...editUserObj });
  }, [isOpen]);

  return (
    <div>
      <Modal isOpen={isOpen} centered>
        <ModalHeader>Edit Record</ModalHeader>
        <ModalBody>
          <div className="mb-2">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Narendra Modi"
              value={userRecordLocal.name}
              onChange={handleChange('name')}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="namo@pmo.com"
              value={userRecordLocal.email}
              onChange={handleChange('email')}
            />
          </div>
          <label htmlFor="role-select-id" className="form-label">
            Role
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="role-select-id"
            value={userRecordLocal.role}
            onChange={handleChange('role')}
          >
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={resetForm}>
            Reset
          </Button>
          <Button color="success" onClick={updateData}>
            Update
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EditRecord;
