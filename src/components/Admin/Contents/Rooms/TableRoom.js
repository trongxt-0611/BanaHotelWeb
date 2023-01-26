import "./TableRoom.scss";
import { BiShowAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";
export const TableRoom = (props) => {
  const navigate = useNavigate();
  const {
    rooms,
    handlePreviuos,
    handleNext,
    totalPages,
    setCurrentPage,
    currentPage,
    hotelId,
    showEdit,
    showHotelNameField,
  } = props;
  return (
    <>
      <table className="table table-hover border">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Room name</th>
            <th scope="col">Price</th>
            <th scope="col">User Rating</th>
            {showHotelNameField ? <th scope="col">Hotel Name</th> : ""}

            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms &&
            rooms.length > 0 &&
            rooms.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item["nameRoom"]}</td>
                  <td>{item["price"]}</td>
                  <td>{item["star"]}</td>
                  {showHotelNameField ? <td>{item["nameHotel"]}</td> : ""}
                  <td>
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
                        navigate(`/admins/room-reviews/${item.idRoom}`);
                      }}
                    >
                      <FaRegCommentDots />
                      <span>Reviews</span>
                    </button>
                    {showEdit ? (
                      <button
                        className="btn btn-primary mx-2 action-btn"
                        onClick={() =>
                          props.handleClickUpdateBtn({ ...item, hotelId })
                        }
                      >
                        <FiEdit />
                        <span>Edit</span>
                      </button>
                    ) : (
                      ""
                    )}
                    <button
                      className="btn btn-danger action-btn"
                      onClick={() => props.handleClickDeleteBtn(item)}
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
