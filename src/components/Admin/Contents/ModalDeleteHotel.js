import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  deleteDetailImagesByHotelId,
  deleteHotel,
} from "../../../services/apiServiceAdminHotel";
import { toast } from "react-toastify";

export const ModalDeleteHotel = (props) => {
  const { show, setShow, dataHotelDelete, fetchHotels, currentPage } = props;

  const handleClose = () => setShow(false);
  const handleDeleteHotel = async () => {
    handleClose();
    try {
      let res = await deleteDetailImagesByHotelId(dataHotelDelete.idHotel);
      let res1 = await deleteHotel(dataHotelDelete.idHotel);
      if (res.status === 200 && res1.status === 200) {
        toast.success(res.data);
      } else {
        toast.error("Delete failed");
      }
      fetchHotels(currentPage);
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
          Are you sure to delete hotel:{" "}
          <b>
            {dataHotelDelete && dataHotelDelete.nameHotel
              ? dataHotelDelete.nameHotel
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
