import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getInfor,
  getListReviewPagingAdmin,
  getPageTotalReviewAdmin,
  setShowReivew,
} from "../../../../services/apiServiceAdminReview";
import { TableReviews } from "./TableReviews";
import "./ManageReview.scss";
import { ModalDeleteReview } from "./ModalDeleteReview";
import { FcPrevious } from "react-icons/fc";
export const ManageReview = (props) => {
  const { target } = props;
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { targetId } = useParams();
  const [targetName, setTargetName] = useState("");

  const [showModalDeleteReview, setShowModalDeleteReview] = useState(false);
  const [dataDeleteReview, setDataDeleteReview] = useState("");

  const fetchTotalPageReview = async (target, targetId) => {
    try {
      let res = await getPageTotalReviewAdmin(target, targetId);
      if (res && res.status === 200) {
        setTotalPages(res.data);
      }
    } catch (error) {}
  };
  const fetchReviews = async (target, targetId, page) => {
    try {
      let res = await getListReviewPagingAdmin(target, targetId, page);
      if (res && res.status === 200) {
        setReviews([...res.data].reverse());
      }
    } catch (error) {}
  };
  const getRoom = async (target, targetId) => {
    try {
      let res = await getInfor(target, targetId);
      if (res && res.status === 200) {
        switch (target) {
          case "Hotel":
            setTargetName(res.data.nameHotel);
            break;
          case "Room":
            setTargetName(res.data.nameRoom);
            break;
          default:
            setTargetName("");
            break;
        }
      }
    } catch (error) {}
  };
  const handleShowOrHideReview = async (target, idReview, isShow) => {
    try {
      let res = await setShowReivew(target, idReview, isShow);
      if (res.status && res.status === 200) {
        fetchReviews(target, targetId, currentPage);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchTotalPageReview(target, targetId);
  }, [totalPages]);

  useEffect(() => {
    fetchReviews(target, targetId, currentPage);
  }, [currentPage]);

  useEffect(() => {
    getRoom(target, targetId);
  }, []);

  const handlePreviuos = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickDeleteBtn = (target, reviewId, targetId) => {
    setShowModalDeleteReview(true);
    setDataDeleteReview({ target, reviewId, targetId });
  };
  return (
    <div className="manage-review-container">
      <div className="row-md-1 header mb-3">
        <button className="btn" onClick={() => navigate(-1)}>
          <FcPrevious size={"2em"} />
        </button>
      </div>
      <div className="title">
        <h3>
          {" "}
          All reviews of{" "}
          <b>
            <i>
              {targetName} {target}
            </i>
          </b>
        </h3>
      </div>
      <div className="review-content">
        <div className="table-reviews">
          <TableReviews
            reviews={reviews}
            handlePreviuos={handlePreviuos}
            handleNext={handleNext}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            showEdit={false}
            handleClickDeleteBtn={handleClickDeleteBtn}
            handleShowOrHideReview={handleShowOrHideReview}
            target={target}
          />
          <ModalDeleteReview
            show={showModalDeleteReview}
            setShow={setShowModalDeleteReview}
            currentPage={currentPage}
            dataDeleteReview={dataDeleteReview}
            fetchReviews={fetchReviews}
          />
        </div>
      </div>
    </div>
  );
};
