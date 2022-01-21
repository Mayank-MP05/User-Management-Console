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
    setuserRecordLocal({});
    closeDialog();
  };

  useEffect(() => {
    setuserRecordLocal({ ...editUserObj });
  }, [isOpen]);

  return (
    <div>
      <Button color="info">Edit Record</Button>
      <Modal isOpen={isOpen} centered>
        <ModalHeader>Edit Record</ModalHeader>
        <ModalBody>
          <div class="mb-2">
            <label for="exampleFormControlInput1" class="form-label">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Narendra Modi"
              value={userRecordLocal.name}
              onChange={handleChange('name')}
            />
          </div>
          <div class="mb-2">
            <label for="exampleFormControlInput2" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput2"
              placeholder="namo@pmo.com"
              value={userRecordLocal.email}
              onChange={handleChange('email')}
            />
          </div>
          <label for="role-select-id" class="form-label">
            Role
          </label>
          <select
            class="form-select"
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
