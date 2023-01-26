import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { toast } from "react-toastify";
import { deleteReview } from "../../../../services/apiServiceAdminReview";

export const ModalDeleteReview = (props) => {
  const { show, setShow, dataDeleteReview, fetchReviews, currentPage } = props;
  const handleClose = () => setShow(false);
  const handleDeleteReview = async () => {
    handleClose();
    try {
      let res = await deleteReview(dataDeleteReview.reviewId);
      if (res.status === 200) {
        toast.success(res.data);
        fetchReviews(
          dataDeleteReview.target,
          dataDeleteReview.targetId,
          currentPage
        );
      } else {
        toast.error("Delete failed");
      }
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
          <Modal.Title>Confirm delete {dataDeleteReview.target}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteReview}>
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
