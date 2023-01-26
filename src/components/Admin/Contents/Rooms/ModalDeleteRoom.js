import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { toast } from "react-toastify";
import {
  deleteDetailImagesByRoomId,
  deleteRoom,
} from "../../../../services/apiServiceAdminRoom";

export const ModalDeleteRoom = (props) => {
  const { show, setShow, dataRoomDelete, fetchRooms, currentPage } = props;

  const handleClose = () => setShow(false);
  const handleDeleteHotel = async () => {
    handleClose();
    try {
      let res = await deleteDetailImagesByRoomId(dataRoomDelete.idRoom);
      let res1 = await deleteRoom(dataRoomDelete.idRoom);
      if (res.status === 200 && res1.status === 200) {
        toast.success(res.data);
      } else {
        toast.error("Delete failed");
      }
      fetchRooms(currentPage);
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
          <Modal.Title>Confirm delete Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete room:{" "}
          <b>
            {dataRoomDelete && dataRoomDelete.nameRoom
              ? dataRoomDelete.nameRoom
              : ""}
          </b>
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
