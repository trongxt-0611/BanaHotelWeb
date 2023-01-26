import { useEffect, useState } from "react";
import {
  getAllUsers,
  getSearchUserPaging,
  getTotalPageAllUser,
  getTotalPageSearchUser,
} from "../../../../services/apiServiceAdminUser";
import { TableUser } from "./TableUser";
import "./ManageUser.scss";
import { ModalDeleteUser } from "./ModalDeleteUser";
import _ from "lodash";
import { SearchBar } from "../components/SearchBar";

export const ManageUser = () => {
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState("");

  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchTotalPageUser = async () => {
    try {
      let res = 1;
      if (_.isEmpty(search)) {
        res = await getTotalPageAllUser();
      } else {
        res = await getTotalPageSearchUser(search);
      }
      if (res && res.status === 200) {
        setTotalPages(res.data);
      }
    } catch (error) {}
  };
  const fetchUsers = async (page) => {
    try {
      let res = [];
      if (_.isEmpty(search)) {
        res = await getAllUsers(page);
      } else {
        res = await getSearchUserPaging(page, search);
      }
      if (res && res.status === 200) {
        setUsers([...res.data].reverse());
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, search]);

  useEffect(() => {
    fetchTotalPageUser();
  }, [totalPages]);
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
  const handleSearch = (data) => {
    setSearch(data);
    setCurrentPage(1);

  };
  const handleClickDeleteBtn = (user) => {
    setShowModalDeleteUser(true);
    setDataUserDelete(user);
  };
  return (
    <div className="manage-user-container">
      <div className="title">
        <h3>Manage User</h3>
      </div>
      <div className="search-bar">
        <div className="col-md-3">
          <SearchBar handleSearch={handleSearch} />
        </div>
      </div>
      <div className="user-content">
        <div className="table-users">
          <TableUser
            users={users}
            handlePreviuos={handlePreviuos}
            handleNext={handleNext}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
          <ModalDeleteUser
            show={showModalDeleteUser}
            setShow={setShowModalDeleteUser}
            dataUserDelete={dataUserDelete}
            fetchUsers={fetchUsers}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};
