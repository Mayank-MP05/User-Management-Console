import React from 'react';
import {
  Button,
  Modal,
  Dialog,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

function ConfirmDelete({ isOpen }) {
  return (
    <div>
      <Button color="danger">Confirm Delete</Button>
      <Modal isOpen={isOpen} centered>
        <ModalHeader>Are you sure ?</ModalHeader>
        <ModalBody>
          Do you really want to delete this User records ? Once deleted It can
          be{' '}
          <span className="fw-bold">
            very very very hard to recover
          </span>
          . It can be only recovered by refreshing the webpage. Thank me later.
        </ModalBody>
        <ModalFooter>
          <Button color="light">Cancel</Button>
          <Button color="danger">Confirm Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ConfirmDelete;
