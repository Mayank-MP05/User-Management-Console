import React from 'react';
import {
  Button,
  Modal,
  Dialog,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

function ConfirmDelete({
  isOpen,
  closeDialog,
  deleteUserCallback,
  deleteUserObj,
}) {
  const confirmDeleteProceed = () => {
    if (deleteUserObj === 'BULK_DELETE') {
      deleteUserCallback([], true);
      closeDialog();
      return;
    }
    deleteUserCallback(deleteUserObj.id);
    closeDialog();
  };

  return (
    <div>
      <Modal isOpen={isOpen} centered>
        <ModalHeader>Are you sure ?</ModalHeader>
        <ModalBody>
          Do you really want to delete this User records ? Once deleted It can
          be <span className="fw-bold">very very very hard to recover</span>. It
          can be only recovered by refreshing the webpage. Thank me later.
        </ModalBody>
        <ModalFooter>
          <Button color="light" onClick={closeDialog}>
            Cancel
          </Button>
          <Button color="danger" onClick={confirmDeleteProceed}>
            Confirm Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ConfirmDelete;
