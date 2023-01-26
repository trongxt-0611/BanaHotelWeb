import "./TableHotel.scss";
import { BiShowAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { BiBed } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";
const TableHotel = (props) => {
  const navigate = useNavigate();
  const {
    hotels,
    handlePreviuos,
    handleNext,
    totalPages,
    setCurrentPage,
    currentPage,
  } = props;
  return (
    <>
      <table className="table table-hover border table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Hotel name</th>
            <th scope="col">Address</th>
            <th scope="col">Phone </th>
            <th scope="col">Category</th>
            <th scope="col">Rating</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels &&
            hotels.length > 0 &&
            hotels.map((item, index) => {
              return (
                <tr key={item["idHotel"]}>
                  <th scope="row">{index + 1}</th>
                  <td>{item["nameHotel"]}</td>
                  <td>{item["address"]}</td>
                  <td>{item["phoneHotel"]}</td>
                  <td>{item["nameCategory"]}</td>
                  <td>{item["star"]}</td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-success action-btn"
                        onClick={() => props.handleClickViewBtn(item)}
                      >
                        <BiShowAlt />
                        <span>Info</span>
                      </button>
                      <button
                        className="btn btn-secondary action-btn"
                        onClick={() => {
                          navigate(`/admins/hotel-reviews/${item.idHotel}`);
                        }}
                      >
                        <FaRegCommentDots />
                        <span>Reviews</span>
                      </button>
                      <button
                        className="btn btn-warning action-btn"
                        onClick={() => {
                          navigate(`/admins/hotel-rooms/${item.idHotel}`);
                        }}
                      >
                        <BiBed />
                        <span>Rooms</span>
                      </button>
                      <button
                        className="btn btn-primary action-btn"
                        onClick={() => props.handleClickUpdateBtn(item)}
                      >
                        <FiEdit />
                        <span>Edit</span>
                      </button>
                      <button
                        className="btn btn-danger action-btn"
                        onClick={() => props.handleClickDeleteBtn(item)}
                      >
                        <BsTrash />
                        <span>Delete</span>
                      </button>
                    </div>
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

export default TableHotel;
