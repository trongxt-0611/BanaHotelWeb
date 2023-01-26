import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { toast } from "react-toastify";
import { deleteUser } from "../../../../services/apiServiceAdminUser";

export const ModalDeleteUser = (props) => {
  const { show, setShow, dataUserDelete, fetchUsers, currentPage } = props;

  const handleClose = () => setShow(false);
  const handleDeleteHotel = async () => {
    handleClose();
    try {
      let res = await deleteUser(dataUserDelete.idUser);
      toast.success(res.data);
      fetchUsers(currentPage);
    } catch (error) {
      if (
        error.response &&
        error.response.status &&
        error.response.status === 400
      ) {
        toast.error(error.response.data);
      } else {
        toast.error("some thing went wrong, please try again");
      }
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete user:{" "}
          <b>
            {dataUserDelete && dataUserDelete.username
              ? dataUserDelete.username
              : ""}
          </b>{" "}
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteHotel}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
