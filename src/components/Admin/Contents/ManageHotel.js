import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { ModalCreateHotel } from "./ModalCreateHotel";
import "./ManageHotel.scss";
import TableHotel from "./TableHotel";
import { ModalUpdateHotel } from "./ModalUpdateHotel";
import {
  getAllCategories,
  getSearchHotelPaging,
  getTotalPageSearchHotel,
} from "../../../services/apiServiceAdminHotel";
import { ModalViewHotel } from "./ModalViewHotel";
import { ModalDeleteHotel } from "./ModalDeleteHotel";
import { SearchBar } from "./components/SearchBar";

export const ManageHotel = () => {
  const [showModalAddHotel, setShowModalAddHotel] = useState(false);
  const [showModalUpdateHotel, setShowModalUpdateHotel] = useState(false);
  const [showModalViewHotel, setShowModalViewHotel] = useState(false);
  const [showModalDeleteHotel, setShowModalDeleteHotel] = useState(false);

  const [dataHotelUpdate, setDataHotelUpdate] = useState({});
  const [dataHotelDelete, setDataHotelDelete] = useState("");

  const [hotels, setHotels] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
  const [cateFilter, setCateFilter] = useState("0");
  const [categories, setCategories] = useState([]);

  const handleSearch = (data) => {
    setSearch(data);
    setCurrentPage(1);
  };

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

  const fetchTotalPageHotel = async () => {
    try {
      let res = await getTotalPageSearchHotel(search, cateFilter);
      if (res && res.status === 200) {
        setTotalPages(res.data);
      }
    } catch (error) {}
  };
  const fetchHotels = async (page) => {
    try {
      let res = await getSearchHotelPaging(page, search, cateFilter);
      if (res && res.status === 200) {
        setHotels([...res.data].reverse());
      }
    } catch (error) {}
  };
  const fetchCategories = async () => {
    try {
      let res = await getAllCategories();
      if (res && res.status === 200) {
        setCategories(res.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchHotels(currentPage);
  }, [cateFilter, search, currentPage]);

  useEffect(() => {
    fetchTotalPageHotel();
  }, [cateFilter, search, currentPage]);

  const handleClickUpdateBtn = (hotel) => {
    setShowModalUpdateHotel(true);
    setDataHotelUpdate(hotel);
  };
  const handleClickViewBtn = (hotel) => {
    setDataHotelUpdate(hotel);
    setShowModalViewHotel(true);
  };
  const handleClickDeleteBtn = (hotel) => {
    setShowModalDeleteHotel(true);
    setDataHotelDelete(hotel);
  };

  return (
    <div className="manage-hotel-container">
      <div className="title">
        <h3>Manage Hotel</h3>
      </div>
      <div className="hotel-content">
        <div>
          <button
            className="btn btn-success btn-add-hotel"
            onClick={() => setShowModalAddHotel(true)}
          >
            <FcPlus />
            Add New Hotel
          </button>
        </div>
        <div className="search-bar row mt-4">
          <div className="col-md-3">
            <SearchBar handleSearch={handleSearch} />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              onChange={(event) => setCateFilter(event.target.value)}
              value={cateFilter}
            >
              <option value={"0"}>All categories</option>
              {categories &&
                categories.length > 0 &&
                categories.map((item) => {
                  return (
                    <option value={item["idCategory"]} key={item["idCategory"]}>
                      {item["nameCategory"]}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="table-hotels">
          <TableHotel
            handleClickUpdateBtn={handleClickUpdateBtn}
            handleClickViewBtn={handleClickViewBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
            hotels={hotels}
            handlePreviuos={handlePreviuos}
            handleNext={handleNext}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
        <ModalViewHotel
          show={showModalViewHotel}
          setShow={setShowModalViewHotel}
          dataHotelUpdate={dataHotelUpdate}
          setDataHotelUpdate={setDataHotelUpdate}
        />
        <ModalCreateHotel
          show={showModalAddHotel}
          setShow={setShowModalAddHotel}
          fetchHotels={fetchHotels}
          currentPage={currentPage}
        />
        <ModalUpdateHotel
          show={showModalUpdateHotel}
          setShow={setShowModalUpdateHotel}
          dataHotelUpdate={dataHotelUpdate}
          setDataHotelUpdate={setDataHotelUpdate}
          fetchHotels={fetchHotels}
          currentPage={currentPage}
        />
        <ModalDeleteHotel
          show={showModalDeleteHotel}
          setShow={setShowModalDeleteHotel}
          dataHotelDelete={dataHotelDelete}
          fetchHotels={fetchHotels}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};
