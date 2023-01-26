import { BiHide, BiShowAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import "./TableReview.scss";
export const TableReviews = (props) => {
  const {
    reviews,
    handlePreviuos,
    handleNext,
    totalPages,
    setCurrentPage,
    currentPage,
    handleClickDeleteBtn,
    handleShowOrHideReview,
    target,
  } = props;

  return (
    <>
      <table className="table table-hover border">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User name</th>
            <th scope="col">Star review</th>
            <th scope="col">Content</th>
            <th scope="col">Created at</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews &&
            reviews.length > 0 &&
            reviews.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item["username"]}</td>
                  <td>{item["starReview"]}</td>
                  <td>{item["detail"]}</td>
                  <td>{item["timeReview"]}</td>
                  <td>
                    {item.isShow ? (
                      <button
                        className="btn btn-warning action-btn"
                        onClick={() =>
                          handleShowOrHideReview(target, item.idReview, false)
                        }
                      >
                        <BiHide />
                        <span>Set hide</span>
                      </button>
                    ) : (
                      <button
                        className="btn btn-success action-btn"
                        onClick={() =>
                          handleShowOrHideReview(target, item.idReview, true)
                        }
                      >
                        <BiShowAlt />
                        <span>Set show</span>
                      </button>
                    )}
                    <button
                      className="btn btn-danger action-btn"
                      onClick={() => {
                        handleClickDeleteBtn(
                          item.roomId ? "Room" : "Hotel",
                          item.idReview,
                          item.roomId ? item.roomId : item.hotelId
                        );
                      }}
                    >
                      <BsTrash />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <p className="page-link" onClick={handlePreviuos}>
              &lt; Previous
            </p>
          </li>
          {[...Array(totalPages).keys()].map((item, index) => {
            return (
              <li className="page-item" key={index}>
                <p
                  className={
                    currentPage === item + 1
                      ? "page-link page-link-selected"
                      : "page-link"
                  }
                  onClick={(event) => {
                    setCurrentPage(+event.target.innerText);
                  }}
                >
                  {item + 1}
                </p>
              </li>
            );
          })}
          <li className="page-item">
            <p className="page-link" onClick={handleNext}>
              Next &gt;
            </p>
          </li>
        </ul>
      </nav>
    </>
  );
};
