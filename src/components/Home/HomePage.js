import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import "./Homepage.scss";
import Logo from "../../assets/images/logo.png";

const HomePage = () => {
  const [user, setUser] = useState({});
  const [totalPageHotel, setTotalPageHotel] = useState();
  const [totalPageRoom, setTotalPageRoom] = useState();
  const [listHotel, setListHotel] = useState([]);
  const [listRoom, setListRoom] = useState([]);
  const [star, setStar] = useState([]);
  const [i, setI] = useState(1);
  const [y, setY] = useState(1);
  const [x, setX] = useState(true);

  const [keyword, setKeyWord] = useState("");
  const [idCategory, setIdCategory] = useState(5);

  const [kt, setKt] = useState(false);
  const navigate = useNavigate();

  let { email } = useParams();
  useEffect(() => {
    handleGetUserByEmail(email);
    handleGetTotalPageHotel();
    handleGetTotalPageRoom();
    handleAllHotel(1);
    handleAllRoom(1);
  }, []);
  console.log(email);

  const handleGetUserByEmail = (emailUser) => {
    fetch(
      `http://pandoraolaole-001-site1.btempurl.com/User/getUserByEmail/${emailUser}`
    )
      .then((res) => res.json())
      .then((data) => setUser(data));
  };

  const handleGetTotalPageHotel = () => {
    fetch(`http://pandoraolaole-001-site1.btempurl.com/Hotel/getTotalPageHotel`)
      .then((res) => res.json())
      .then((data) => setTotalPageHotel(data));
  };

  const handleAllHotel = (idPage) => {
    fetch(
      `http://pandoraolaole-001-site1.btempurl.com/Hotel/getAllHotels/page-${idPage}`
    )
      .then((res) => res.json())
      .then((data) => setListHotel(data));
  };

  const handleGetTotalPageRoom = () => {
    fetch(`http://pandoraolaole-001-site1.btempurl.com/Room/getTotalPageRoom`)
      .then((res) => res.json())
      .then((data) => setTotalPageRoom(data));
  };

  const handleAllRoom = (idPage) => {
    fetch(
      `http://pandoraolaole-001-site1.btempurl.com/Room/getAllRooms/page-${idPage}`
    )
      .then((res) => res.json())
      .then((data) => setListRoom(data));
  };

  const displayStar = (star) => {
    return star.map((star) => (
      <svg
        key={star}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-star-fill"
        viewBox="0 0 16 16"
      >
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
      </svg>
    ));
  };

  const starHotel = (nameCategory) => {
    switch (nameCategory) {
      case "5 Star":
        setStar([1, 2, 3, 4, 5]);
        break;
      case "5":
        return [1, 2, 3, 4, 5];
        break;
      case "4 Star":
        setStar([1, 2, 3, 4]);
        break;
      case "4":
        return [1, 2, 3, 4];
        break;
      case "3 Star":
        setStar([1, 2, 3]);
        break;
      case "3":
        return [1, 2, 3];
        break;
      case "2 Star":
        setStar([1, 2]);
        break;
      case "2":
        return [1, 2];
        break;
      case "1 Star":
        setStar([1]);
        break;
      case "1":
        return [1];
        break;
      default:
        break;
    }
  };
  const handleClickPrevPageHotel = () => {
    if (1 <= i) {
      if (1 === i) {
        handleAllHotel(i);
      } else if (1 < i) {
        handleAllHotel(i);
        setI(i - 1);
      }
    } else {
    }
  };

  const handleClickNextPageHotel = () => {
    if (i <= totalPageHotel) {
      if (i < totalPageHotel) {
        handleAllHotel(i);
        setI((i) => i + 1);
      } else if (i === totalPageHotel) {
        handleAllHotel(i);
      }
    } else {
      toast.success("Bạn đã xem hết các hotel");
    }
  };

  const handleClickPrevPageRoom = () => {
    if (1 <= y) {
      if (1 === y) {
        handleAllRoom(y);
      } else if (1 < y) {
        handleAllRoom(y);
        setY(y - 1);
      }
    } else {
    }
  };

  const handleClickNextPageRoom = () => {
    if (y <= totalPageRoom) {
      if (y < totalPageRoom) {
        handleAllRoom(y);
        setY((y) => y + 1);
      } else if (y === totalPageHotel) {
        handleAllRoom(y);
      }
    } else {
      toast.success("Bạn đã xem hết các room");
    }
  };

  const handleGetTotalPageSearchHotel = (keyword, idCategory) => {
    fetch(
      `http://pandoraolaole-001-site1.btempurl.com/Hotel/getTotalPageSearchHotel?keyword=${keyword}&idCategory=${idCategory}`
    )
      .then((res) => res.json())
      .then((data) => setTotalPageHotel(data));
  };

  const handleSearchHotelPaging = (idPage, keyword, idCategory) => {
    fetch(
      `http://pandoraolaole-001-site1.btempurl.com/Hotel/searchHotelPaging/page-${idPage}?keyword=${keyword}&idCategory=${idCategory}`
    )
      .then((res) => res.json())
      .then((data) => setListHotel(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword) {
      setKt(true);
    } else {
      setKt(false);
    }
    handleGetTotalPageSearchHotel(keyword, idCategory);
    handleSearchHotelPaging(1, keyword, idCategory);
    setX(false);
  };

  return (
    <div className="body-homepage">
      <div className="cover">
        {/* {!email ? (
          <Nav className="d-flex">
            <NavLink to="/login" className="btn btn-primary btn-login">
              Log in
            </NavLink>
            <NavLink to="/register" className="btn btn-dark">
              Register
            </NavLink>
          </Nav>
        ):(
          console.log('ok')
        )} */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <p>Ba Na Hill Hotel Web</p>
        </div>
        <div>
          {/* {email && (
              <div className="user">
                <img src={user.avatar} alt="user avatar" />
                <p>Welcom: {user.name}</p>
              </div>
            )} */}
          <div className="wn">
            <p>Ba Na Hill Hotel Web</p>
          </div>
          <div className="search">
            <form onSubmit={handleSubmit}>
              <div className="box">
                <input
                  type="text"
                  className="keyword"
                  name="keyword"
                  placeholder="Search"
                  onChange={(e) => setKeyWord(e.target.value)}
                />
                <button id="sbutton" type="submit">
                  Search
                </button>
              </div>

              <select
                className="ct"
                name="idCategory"
                onChange={(e) => setIdCategory(e.target.value)}
              >
                <optgroup selected="selected" label="Hotel">
                  <option value="5"> 5 Star</option>
                  <option value="4"> 4 Star</option>
                  <option value="3"> 3 Star</option>
                  <option value="2"> 2 Star</option>
                  <option value="1"> 1 Star</option>
                  <option value="0"> Other</option>
                </optgroup>
                <optgroup label="Room"></optgroup>
              </select>
            </form>
          </div>
        </div>
      </div>

      {keyword && kt && (
        <div>
          <h1>Hotel</h1>
          <div className="home-hotel">
            <div class="control prev">
              <button id="prev" onClick={() => handleClickPrevPageHotel()}>
                <FontAwesomeIcon className="" icon={faChevronLeft} />
              </button>
            </div>
            <div class="control next">
              <button id="next" onClick={() => handleClickNextPageHotel()}>
                <FontAwesomeIcon className="" icon={faChevronRight} />
              </button>
            </div>
            {email
              ? listHotel.map((hotel, index) => (
                  <div
                    className="card-hotel"
                    key={index}
                    onClick={() =>
                      navigate(`/hoteldetail/${hotel.idHotel}/${email}`)
                    }
                  >
                    <img src={hotel.imageHotel} />
                    <h3>{hotel.nameHotel}</h3>
                    <h2>{hotel.phoneHotel}</h2>
                    <h2>{hotel.address}</h2>
                    <p id="des">{hotel.description}</p>
                    <p>{hotel.nameCategory}</p>
                    <p id="stars">
                      {displayStar(starHotel(hotel.star.toFixed(0)))}
                    </p>
                  </div>
                ))
              : listHotel.map((hotel, index) => (
                  <div
                    className="card-hotel"
                    key={index}
                    onClick={() => navigate(`/hoteldetail/${hotel.idHotel}`)}
                  >
                    <img src={hotel.imageHotel} />
                    <h3>{hotel.nameHotel}</h3>
                    <h2>{hotel.phoneHotel}</h2>
                    <h2>{hotel.address}</h2>
                    <p id="des">{hotel.description}</p>
                    <p>{hotel.nameCategory}</p>
                    <p id="stars">
                      {displayStar(starHotel(hotel.star.toFixed(0)))}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      )}
      {!keyword && kt && (
        <div>
          <div>
            <h1>Hotel</h1>
            <div className="home-hotel">
              <div class=" control prev">
                <button id="prev" onClick={() => handleClickPrevPageHotel()}>
                  <FontAwesomeIcon className="" icon={faChevronLeft} />
                </button>
              </div>
              <div class="control next">
                <button id="next" onClick={() => handleClickNextPageHotel()}>
                  <FontAwesomeIcon className="" icon={faChevronRight} />
                </button>
              </div>

              {email
                ? listHotel.map((hotel, index) => (
                    <div
                      className="card-hotel"
                      key={index}
                      onClick={() =>
                        navigate(`/hoteldetail/${hotel.idHotel}/${email}`)
                      }
                    >
                      <img src={hotel.imageHotel} />
                      <h3>{hotel.nameHotel}</h3>
                      <h2>{hotel.phoneHotel}</h2>
                      <h2>{hotel.address}</h2>
                      <p id="des">{hotel.description}</p>
                      <p>{hotel.nameCategory}</p>

                      <p id="stars">
                        {displayStar(starHotel(hotel.star.toFixed(0)))}
                      </p>
                    </div>
                  ))
                : listHotel.map((hotel, index) => (
                    <div
                      className="card-hotel"
                      key={index}
                      onClick={() => navigate(`/hoteldetail/${hotel.idHotel}`)}
                    >
                      <img src={hotel.imageHotel} />
                      <h3>{hotel.nameHotel}</h3>
                      <h2>{hotel.phoneHotel}</h2>
                      <h2>{hotel.address}</h2>
                      <p id="des">{hotel.description}</p>
                      <p>{hotel.nameCategory}</p>

                      <p id="stars">
                        {displayStar(starHotel(hotel.star.toFixed(0)))}
                      </p>
                    </div>
                  ))}
            </div>
          </div>
          <div>
            <div className="dih">
              <h1>Room</h1>
            </div>

            <div className="home-hotel">
              <div class=" control prev">
                <button id="prev" onClick={() => handleClickPrevPageRoom()}>
                  <FontAwesomeIcon className="" icon={faChevronLeft} />
                </button>
              </div>
              <div class="control next">
                <button id="next" onClick={() => handleClickNextPageRoom()}>
                  <FontAwesomeIcon className="" icon={faChevronRight} />
                </button>
              </div>
              {email
                ? listRoom.map((room, index) => (
                    <div
                      className="card-hotel"
                      key={index}
                      onClick={() =>
                        navigate(`/roomdetail/${room.idRoom}/${email}`)
                      }
                    >
                      <img src={room.imageRoom} />
                      <h3>{room.nameRoom}</h3>
                      <h2>{room.price}</h2>
                      <h2>{room.nameHotel}</h2>
                      <p id="des">{room.description}</p>
                      <p id="stars">
                        {displayStar(starHotel(room.star.toFixed(0)))}
                      </p>
                    </div>
                  ))
                : listRoom.map((room, index) => (
                    <div
                      className="card-hotel"
                      key={index}
                      onClick={() => navigate(`/roomdetail/${room.idRoom}`)}
                    >
                      <img src={room.imageRoom} />
                      <h3>{room.nameRoom}</h3>
                      <h2>{room.price}</h2>
                      <h2>{room.nameHotel}</h2>
                      <p id="des">{room.description}</p>
                      <p id="stars">
                        {displayStar(starHotel(room.star.toFixed(0)))}
                      </p>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      )}
      {x && (
        <div>
          <div>
            <h1>Hotel</h1>
            <div className="home-hotel">
              <div class=" control prev">
                <button id="prev" onClick={() => handleClickPrevPageHotel()}>
                  <FontAwesomeIcon className="" icon={faChevronLeft} />
                </button>
              </div>
              <div class="control next">
                <button id="next" onClick={() => handleClickNextPageHotel()}>
                  <FontAwesomeIcon className="" icon={faChevronRight} />
                </button>
              </div>

              {email
                ? listHotel.map((hotel, index) => (
                    <div
                      className="card-hotel"
                      key={index}
                      onClick={() =>
                        navigate(`/hoteldetail/${hotel.idHotel}/${email}`)
                      }
                    >
                      <img src={hotel.imageHotel} />
                      <h3>{hotel.nameHotel}</h3>
                      <h2>{hotel.phoneHotel}</h2>
                      <h2>{hotel.address}</h2>
                      <p id="des">{hotel.description}</p>
                      <p>{hotel.nameCategory}</p>
                      <p id="stars">
                        {displayStar(starHotel(hotel.star.toFixed(0)))}
                      </p>
                    </div>
                  ))
                : listHotel.map((hotel, index) => (
                    <div
                      className="card-hotel"
                      key={index}
                      onClick={() => navigate(`/hoteldetail/${hotel.idHotel}`)}
                    >
                      <img src={hotel.imageHotel} />
                      <h3>{hotel.nameHotel}</h3>
                      <h2>{hotel.phoneHotel}</h2>
                      <h2>{hotel.address}</h2>
                      <p id="des">{hotel.description}</p>
                      <p>{hotel.nameCategory}</p>
                      <p id="stars">
                        {displayStar(starHotel(hotel.star.toFixed(0)))}
                      </p>
                    </div>
                  ))}
            </div>
          </div>
          <div>
            <div className="dih">
              <h1>Room</h1>
            </div>
            <div className="home-hotel">
              <div class=" control prev">
                <button id="prev" onClick={() => handleClickPrevPageRoom()}>
                  <FontAwesomeIcon className="" icon={faChevronLeft} />
                </button>
              </div>
              <div class="control next">
                <button id="next" onClick={() => handleClickNextPageRoom()}>
                  <FontAwesomeIcon className="" icon={faChevronRight} />
                </button>
              </div>
              {email
                ? listRoom.map((room, index) => (
                    <div
                      className="card-hotel"
                      key={index}
                      onClick={() =>
                        navigate(`/roomdetail/${room.idRoom}/${email}`)
                      }
                    >
                      <img src={room.imageRoom} />
                      <h3>{room.nameRoom}</h3>
                      <h2>{room.price}</h2>
                      <h2>{room.nameHotel}</h2>
                      <p id="des">{room.description}</p>
                      <p id="stars">
                        {displayStar(starHotel(room.star.toFixed(0)))}
                      </p>
                    </div>
                  ))
                : listRoom.map((room, index) => (
                    <div
                      className="card-hotel"
                      key={index}
                      onClick={() => navigate(`/roomdetail/${room.idRoom}`)}
                    >
                      <img src={room.imageRoom} />
                      <h3>{room.nameRoom}</h3>
                      <h2>{room.price}</h2>
                      <h2>{room.nameHotel}</h2>
                      <p id="des">{room.description}</p>

                      <p id="stars">
                        {displayStar(starHotel(room.star.toFixed(0)))}
                      </p>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
