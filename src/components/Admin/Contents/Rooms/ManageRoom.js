import { useEffect, useState } from "react";
import "./ManageRoom.scss";
import _ from "lodash";
import { SearchBar } from "../components/SearchBar";
import { TableRoom } from "./TableRoom";
import {
  getSearchRoomPaging,
  getTotalPageSearchRoom,
} from "../../../../services/apiServiceAdminRoom";
import { ModalViewRoom } from "./ModalViewRoom";
import { ModalDeleteRoom } from "./ModalDeleteRoom";

export const ManageRoom = () => {
  const [showModalViewRoom, setShowModalViewRoom] = useState(false);
  const [showModalDeleteRoom, setShowModalDeleteRoom] = useState(false);

  const [dataRoomDelete, setDataRoomDelete] = useState("");
  const [dataRoomUpdate, setDataRoomUpdate] = useState({});

  const [rooms, setRooms] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [showHotelNameField, setShowHotelNameField] = useState(true);

  const fetchTotalPageRoom = async () => {
    try {
      let res = await getTotalPageSearchRoom(search);
      if (res && res.status === 200) {
        setTotalPages(res.data);
      }
    } catch (error) {}
  };
  const fetchRooms = async (page) => {
    try {
      let res = await getSearchRoomPaging(page, search);
      if (res && res.status === 200) {
        setRooms([...res.data].reverse());
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchRooms(currentPage);
  }, [currentPage, search]);

  useEffect(() => {
    fetchTotalPageRoom();
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

  const handleClickViewBtn = (room) => {
    setDataRoomUpdate(room);
    setShowModalViewRoom(true);
  };
  const handleClickDeleteBtn = (Room) => {
    setShowModalDeleteRoom(true);
    setDataRoomDelete(Room);
  };
  return (
    <div className="manage-room-container">
      <div className="title">
        <h3>Manage Room</h3>
      </div>
      <div className="search-bar">
        <div className="col-md-3">
          <SearchBar handleSearch={handleSearch} />
        </div>
      </div>
      <div className="room-content">
        <div className="table-rooms">
          <TableRoom
            rooms={rooms}
            handlePreviuos={handlePreviuos}
            handleNext={handleNext}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            handleClickDeleteBtn={handleClickDeleteBtn}
            handleClickViewBtn={handleClickViewBtn}
            showEdit={false}
            showHotelNameField={showHotelNameField}
          />
          <ModalViewRoom
            show={showModalViewRoom}
            setShow={setShowModalViewRoom}
            dataRoomUpdate={dataRoomUpdate}
            setDataRoomUpdate={setDataRoomUpdate}
          />
          <ModalDeleteRoom
            show={showModalDeleteRoom}
            setShow={setShowModalDeleteRoom}
            dataRoomDelete={dataRoomDelete}
            currentPage={currentPage}
            fetchRooms={fetchRooms}
          />
        </div>
      </div>
    </div>
  );
};
