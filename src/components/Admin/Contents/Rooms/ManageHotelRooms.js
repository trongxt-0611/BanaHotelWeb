import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHotelById } from "../../../../services/apiServiceAdminHotel";
import {
  getListRoomsByIdHotel,
  getTotalPageListRoomsByIdHotel,
} from "../../../../services/apiServiceAdminRoom";
import { TableRoom } from "./TableRoom";
import "./ManageHotelRooms.scss";
import { FcPlus, FcPrevious } from "react-icons/fc";
import { ModalCreateRoom } from "./ModalCreateRoom";
import { ModalViewRoom } from "./ModalViewRoom";
import { ModalDeleteRoom } from "./ModalDeleteRoom";
import { ModalUpdateRoom } from "./ModalUpdateRoom";

export const ManageHotelRooms = (props) => {
  const { hotelId } = useParams();

  const [showModalAddRoom, setShowModalAddRoom] = useState(false);
  const [showModalUpdateRoom, setShowModalUpdateRoom] = useState(false);
  const [showModalViewRoom, setShowModalViewRoom] = useState(false);
  const [showModalDeleteRoom, setShowModalDeleteRoom] = useState(false);
  const [dataRoomUpdate, setDataRoomUpdate] = useState({});
  const [dataRoomDelete, setDataRoomDelete] = useState("");

  const [hotelName, setHotelName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTotalPageRoom = async () => {
    try {
      let res = await getTotalPageListRoomsByIdHotel(hotelId);
      // console.log(">>>>>>>", res.data);
      if (res && res.status === 200) {
        setTotalPages(res.data);
      }
    } catch (error) {}
  };
  const fetchRooms = async (page) => {
    try {
      let res = await getListRoomsByIdHotel(hotelId, page);
      if (res && res.status === 200) {
        setRooms([...res.data].reverse());
      }
    } catch (error) {}
  };
  const getHotel = async () => {
    try {
      let res = await getHotelById(hotelId);
      if (res && res.status === 200) {
        setHotelName(res.data.nameHotel);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getHotel();
  }, []);

  useEffect(() => {
    fetchRooms(currentPage);
  }, [currentPage]);

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
  const navigate = useNavigate();

  const handleClickViewBtn = (room) => {
    setDataRoomUpdate(room);
    setShowModalViewRoom(true);
  };

  const handleClickUpdateBtn = (room) => {
    setDataRoomUpdate(room);
    setShowModalUpdateRoom(true);
  };
  const handleClickDeleteBtn = (room) => {
    setDataRoomDelete(room);
    setShowModalDeleteRoom(true);
  };

  return (
    <div className="hotel-rooms-container">
      <div className="row-md-1 header mb-3">
        <button className="btn" onClick={() => navigate(-1)}>
          <FcPrevious size={"2em"} />
        </button>
      </div>
      <div className="title">
        <h3>
          All rooms of{" "}
          <b>
            <i>{hotelName}</i>
          </b>{" "}
          hotel
        </h3>
      </div>

      <div className="room-content">
        <div className="row mt-4">
          <div className="col-md-4">
            <button
              className="btn btn-success btn-add-room"
              onClick={() => setShowModalAddRoom(true)}
            >
              <FcPlus />
              Add New Room
            </button>
          </div>
        </div>
        <div className="table-rooms">
          <TableRoom
            rooms={rooms}
            handlePreviuos={handlePreviuos}
            handleNext={handleNext}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            handleClickViewBtn={handleClickViewBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
            handleClickUpdateBtn={handleClickUpdateBtn}
            hotelId={hotelId}
            showEdit={true}
          />
          <ModalCreateRoom
            show={showModalAddRoom}
            setShow={setShowModalAddRoom}
            currentPage={currentPage}
            fetchRooms={fetchRooms}
            hotelId={hotelId}
          />
          <ModalViewRoom
            show={showModalViewRoom}
            setShow={setShowModalViewRoom}
            dataRoomUpdate={dataRoomUpdate}
            setDataRoomUpdate={setDataRoomUpdate}
          />
          <ModalUpdateRoom
            show={showModalUpdateRoom}
            setShow={setShowModalUpdateRoom}
            dataRoomUpdate={dataRoomUpdate}
            setDataRoomUpdate={setDataRoomUpdate}
            fetchRooms={fetchRooms}
            currentPage={currentPage}
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
