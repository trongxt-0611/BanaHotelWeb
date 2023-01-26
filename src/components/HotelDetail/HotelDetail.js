import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Heard from "./Header";
import Comment from "./Comment.js";
import Footer from "../Footer/Footer.js";
import { useNavigate, useParams } from "react-router-dom";
import "./HotelDetail.scss";
import Name from "./Name.js";
// import { faRandom } from '@fortawesome/free-solid-svg-icons';
// import Nav from "react-bootstrap/Nav";
// import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
function HotelDetail(get) {
  const [hotel, setHotel] = useState({});
  const [user, setUser] = useState({});
  const [listImage, setListImage] = useState([]);
  const [star, setStar] = useState([]);
  const [pageHotel, setPageHotel] = useState(1);
  const [listReview, setListReview] = useState([]);
  const [prevListReview, setPrevListReview] = useState([]);
  const [pageRoom, setPageRoom] = useState(1);
  const [listRoom, setListRoom] = useState([]);
  const [i, setI] = useState(2);
  const [page, setPage] = useState(5);
  const navigate = useNavigate();

  const account = useSelector((state) => state.userReducer.account);
  let { id, email } = useParams();

  useEffect(() => {
    handleGetHotel(id);
    handleGetListImage(id);
    handleGetUserByEmail(email);
    starHotel(hotel.nameCategory);
    handleGetPageTotalReviewHotel(id, 1);
    handleGetListReviewHotelPaging(id);
    handleGetListRoomsByIdHotelPaging(id, 1);
    handleGetTotalPageListRoomsByIdHotel(id);
  }, []);

  const handleGetHotel = (idHotel) => {
    fetch(
      `http://pandoraolaole-001-site1.btempurl.com/Hotel/getHotelById/${idHotel}`
    )
      .then((res) => res.json())
      .then((data) => setHotel(data));
  };

  const handleGetUserByEmail = (emailUser) => {
    fetch(
      `http://pandoraolaole-001-site1.btempurl.com/User/getUserByEmail/${emailUser}`
    )
      .then((res) => res.json())
      .then((data) => setUser(data));
  };

  const handleGetListImage = (idHotel) => {
    fetch(
      `http://pandoraolaole-001-site1.btempurl.com/ImageDetail/getImageDetailByHotel/${idHotel}/page-1`
    )
      .then((res) => res.json())
      .then((data) => setListImage(data));
  };

  const handleGetTotalPageListRoomsByIdHotel = (idHotel) => {
    fetch(
      `http://pandoraolaole-001-site1.btempurl.com/Hotel/getTotalPageListRoomsByIdHotel/${idHotel}`
    )
      .then((res) => res.json())
      .then((data) => setPageRoom(data));
  };

  const handleGetListRoomsByIdHotelPaging = (idHotel, numberPage) => {
    fetch(
      `http://pandoraolaole-001-site1.btempurl.com/Hotel/getListRoomsByIdHotel/${idHotel}/page-${numberPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setListRoom(data);
      });
  };

  const handleGetListReviewHotelPaging = (idHotel) => {
    fetch(
      `http://pandoraolaole-001-site1.btempurl.com/Review/getPageTotalReviewHotel/${idHotel}`
    )
      .then((res) => res.json())
      .then((data) => setPageHotel(data));
  };

  const handleGetPageTotalReviewHotel = (idHotel, numberPage) => {
    fetch(
      `http://pandoraolaole-001-site1.btempurl.com/Review/getListReviewHotelPaging/${idHotel}/page-${numberPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setListReview(data);
      });
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

  const handleEditReview = (idReview, timeReview) => {
    document.getElementById(idReview).readOnly = false;
    // document.getElementById(index + 5000).style.display = 'none'
    document.getElementById(timeReview).style.display = "inline";
  };

  const handleActReview = (idReview, text, starReview, timeReview) => {
    document.getElementById(idReview).readOnly = true;
    // document.getElementById(index + 5000).style.display = 'none'
    document.getElementById(timeReview).style.display = "none";
    handleAtcRev(idReview, text, starReview, user.idUser, id);
  };

  const handleAtcRev = (R_id, detail, star, userid, hotelid) => {
    fetch(
      `http://pandoraolaole-001-site1.btempurl.com/Review/editReviewHotel/${R_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          detail: detail,
          starReview: star,
          userId: userid,
          hotelId: hotelid,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const Review = (listReview) => {
    return listReview.map((review, index) => (
      <div className="com" key={review.idReview}>
        <div className="commentdetail">
          <img
            id="avt"
            src={
              review.avatar === null
                ? "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=170667a&w=0&k=20&c=m-F9Doa2ecNYEEjeplkFCmZBlc5tm1pl1F7cBCh9ZzM="
                : review.avatar
            }
            alt="anh dai dien user"
          />

          <span id={index + 5000}>
            <p id="username">{review.username} </p>

            <p className="star">
              {displayStar(starHotel(review.starReview.toFixed(0)))}
            </p>
          </span>
          <p>
            {review.timeReview.split("T")[0] +
              " " +
              review.timeReview.split("T")[1].split(".")[0]}
          </p>
          <p id="rate">Đã đánh giá {review.starReview} sao</p>
          {/* <input
                            className='texxx'
                            id={review.idReview}
                            value={review.detail}
                            readOnly={true}
                            onChange ={(event) => {setTextV(event.target.value)
                        }} /> */}
        </div>

        <Textarea
          id={review.idReview}
          value={review.detail}
          timeReview={review.timeReview}
          starReview={review.starReview}
          R_username={review.username}
          U_username={user.username}
          handleEditReview={handleEditReview}
          handleActReview={handleActReview}
        />
      </div>
    ));
  };

  const Room = (listRoom) => {
    return listRoom.map((room, index) =>
      email ? (
        <div
          className="room"
          key={index}
          onClick={() => navigate(`/roomdetail/${room.idRoom}/${email}`)}
        >
          <img src={room.imageRoom} alt="anh dai dien user" />
          <div>
            <p id="roomName">{room.nameRoom}</p>
            <p id="star">{displayStar(starHotel(room.star.toFixed(0)))}</p>

            <p id="price">{room.price}</p>
            <p>{room.description}</p>
          </div>
        </div>
      ) : (
        <div
          className="room"
          key={index}
          onClick={() => navigate(`/roomdetail/${room.idRoom}`)}
        >
          <img src={room.imageRoom} alt="anh dai dien user" />
          <div>
            <p id="roomName">{room.nameRoom}</p>
            <p id="star">{displayStar(starHotel(room.star.toFixed(0)))}</p>

            <p id="price">{room.price}</p>
            <p>{room.description}</p>
          </div>
        </div>
      )
    );
  };

  useEffect(() => {
    starHotel(hotel.nameCategory);
  }, [hotel]);

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

  useEffect(() => {
    setPrevListReview([...prevListReview, ...listReview]);
  }, [listReview]);

  const handleClickShowMoreComment = () => {
    if (i <= pageHotel) {
      handleGetPageTotalReviewHotel(1, i);
      setI(i + 1);
    } else {
      toast.success("Bạn đã xem hết các review");
    }
  };

  const handleClickShowRoomByPage = () => {
    if (pageRoom - page < 0) {
      switch (Math.abs(pageRoom - page)) {
        case 4:
          return [page - 4];
        case 3:
          return [page - 4, page - 3];
        case 2:
          return [page - 4, page - 3, page - 2];
        case 1:
          return [page - 4, page - 3, page - 2, page - 1];
      }
    } else {
      return [page - 4, page - 3, page - 2, page - 1, page - 0];
    }
    console.log(pageRoom);
  };

  const DelComment = () => {
    document.getElementById("rev").value = "";
  };

  // loi bat dong bo
  const handleA = (data) => {
    if (prevListReview.length === 0) {
      console.log(prevListReview.pop());
      console.log(prevListReview.unshift(data));
      setPrevListReview(prevListReview);
    } else {
      console.log(listReview.pop());
      console.log(listReview.unshift(data));
      setPrevListReview(listReview);
    }
  };

  const handlePostComment = (comment, check) => {
    comment && check
      ? fetch(
          `http://pandoraolaole-001-site1.btempurl.com/Review/createReviewHotel`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              detail: comment,
              starReview: parseInt(check),
              userId: user.idUser,
              hotelId: id,
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            handleA(data);
            DelComment("");
          })
      : toast.success("Bạn chưa viết nội dung hoặc chọn sao cho bình luận");
  };

  return (
    <div className="container-fluid">
      {/* {
                email ? (
                        <div className="user">
                            <img src={user.avatar} alt="user avatar" />
                            <p id="nameuser">Welcome: {user.name}</p>
                        </div>
                ) : (
                    <div>

                    </div>
                )
            } */}
      <div className="cover">
        <Heard hotel={hotel} listImage={listImage} />
      </div>
      {/* comment */}
      <div className="name">
        <Name hotel={hotel} star={star} displayStar={displayStar} />
      </div>

      {/* comment */}
      <div className="comment">
        <Comment
          prevListReview={prevListReview}
          Review={Review}
          handleClickShowMoreComment={handleClickShowMoreComment}
        />
      </div>

      {email ? (
        <ContentComment handlePostComment={handlePostComment} />
      ) : (
        <div></div>
      )}
      {/* room */}
      <div className="">
        <h1 id="roomh1">Room</h1>
        <div>
          <div>{Room(listRoom)}</div>
        </div>
        <div className="changePage">
          <button id="btnRight" onClick={() => setPage((page) => page - 5)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-double-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
              <path
                fill-rule="evenodd"
                d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>

          {handleClickShowRoomByPage().map((page) => (
            <button
              key={page}
              onClick={() => handleGetListRoomsByIdHotelPaging(id, page)}
            >
              {page}
            </button>
          ))}

          <button onClick={() => setPage((page) => page + 5)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-double-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
              />
              <path
                fill-rule="evenodd"
                d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
}

function Textarea({
  id,
  value,
  timeReview,
  starReview,
  R_username,
  U_username,
  handleEditReview,
  handleActReview,
}) {
  const [text, setText] = useState(value);
  return (
    <div className="comm">
      <textarea
        className="texxx"
        id={id}
        value={text}
        readOnly={true}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      {R_username === U_username ? (
        <div>
          <button
            className="btnEdit"
            onClick={() => handleEditReview(id, timeReview)}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button
            className="none"
            id={timeReview}
            onClick={() => handleActReview(id, text, starReview, timeReview)}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

function ContentComment({ handlePostComment }) {
  const [comment, setComment] = useState("");
  const [check, setCheck] = useState();
  return (
    <div>
      <div className="listrev">
        <textarea
          id="rev"
          type="text"
          // value={text1}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <div className="rate">
          <input
            type="radio"
            name="check"
            value="5"
            id="5"
            onChange={(e) => setCheck(e.target.value)}
          ></input>

          <label id="star" htmlFor="5"></label>
          <input
            type="radio"
            name="check"
            value="4"
            id="4"
            onChange={(e) => setCheck(e.target.value)}
          ></input>
          <label id="star" htmlFor="4"></label>
          <input
            type="radio"
            name="check"
            value="3"
            id="3"
            onChange={(e) => setCheck(e.target.value)}
          ></input>
          <label id="star" htmlFor="3"></label>
          <input
            type="radio"
            name="check"
            value="2"
            id="2"
            onChange={(e) => setCheck(e.target.value)}
          ></input>
          <label id="star" htmlFor="2"></label>
          <input
            type="radio"
            name="check"
            value="1"
            id="1"
            onChange={(e) => setCheck(e.target.value)}
          ></input>
          <label id="star" htmlFor="1"></label>
        </div>
      </div>
      <button id="loadCmt" onClick={() => handlePostComment(comment, check)}>
        Post Comment
      </button>
    </div>
  );
}
export default HotelDetail;
