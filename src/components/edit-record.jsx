import React from 'react';
import {
  Button,
  Modal,
  Dialog,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

function EditRecord({ isOpen }) {
  return (
    <div>
      <Button color="danger">Edit Record</Button>
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
            />
          </div>
          <label for="role-select-id" class="form-label">
            Role
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            id="role-select-id"
          >
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>
        </ModalBody>
        <ModalFooter>
          <Button color="danger">Reset</Button>
          <Button color="success">Update</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EditRecord;
