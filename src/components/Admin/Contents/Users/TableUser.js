import { BiShowAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import "./TableUser.scss";
import Avatar from "react-avatar";
import _ from "lodash";
export const TableUser = (props) => {
  const {
    users,
    handlePreviuos,
    handleNext,
    totalPages,
    setCurrentPage,
    currentPage,
  } = props;
  return (
    <>
      <table className="table table-hover border">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Address</th>
            <th scope="col">Avatar</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item["name"]}</td>
                  <td>{item["email"]}</td>
                  <td>{item["username"]}</td>
                  <td>{item["phone"]}</td>
                  <td>{item["address"]}</td>
                  <td>
                    <Avatar
                      size="40"
                      round={true}
                      src={
                        !_.isEmpty(item["avatar"])
                          ? item["avatar"]
                          : "https://st4.depositphotos.com/14903220/22197/v/600/depositphotos_221970610-stock-illustration-abstract-sign-avatar-icon-profile.jpg"
                      }
                    ></Avatar>
                  </td>
                  <td>
                    {/* <button
                      className="btn btn-success action-btn"
                      onClick={() => props.handleClickViewBtn(item)}
                    >
                      <BiShowAlt />
                      <span>View</span>
                    </button> */}
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
