import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import HeaderRoom from "./HeaderRoom";
import Comment from "./Comment";
import { toast } from "react-toastify";
import Footer from "../Footer/Footer";
import "./Room.scss";
import NameRoom from "./NameRoom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

function RoomDetail() {
  const account = useSelector((state) => state.userReducer.account);
  const [room, setRoom] = useState({});
  const [user, setUser] = useState({});
  const [star, setStar] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [listReview, setListReview] = useState([]);
  const [prevListReview, setPrevListReview] = useState([]);
  const [pageRoom, setPageRoom] = useState(1);

  const [i, setI] = useState(2);

  let { id, email } = useParams();

  useEffect(() => {
    handleGetRoomById(id);
    handleGetListImage(1);
    handleGetUserByEmail(email);
    handleGetListReviewRoomlPaging(id);
    handleGetPageTotalReviewRoom(id, 1);
  }, []);

  useEffect(() => {
    starRoom(Math.round(room.star));
  }, [room]);

  const handleGetRoomById = (idRoom) => {
    fetch(
      `http://pandoraolaole-001-site1.btempurl.com/Room/getRoomById/${idRoom}`
    )
      .then((res) => res.json())
      .then((data) => setRoom(data));
  };

  const handleGetUserByEmail = (emailUser) => {
    fetch(
      `http://pandoraolaole-001-site1.btempurl.com/User/getUserByEmail/${emailUser}`
    )
      .then((res) => res.json())
      .then((data) => setUser(data));
  };

  const handleGetListImage = (idRoom) => {
    fetch(
      `http://pandoraolaole-001-site1.btempurl.com/ImageDetail/getImageDetailByRoom/${idRoom}/page-1`
    )
      .then((res) => res.json())
      .then((data) => setListImage(data));
  };

  const handleGetListReviewRoomlPaging = (idRoom) => {
    fetch(
      `http://pandoraolaole-001-site1.btempurl.com/Review/getPageTotalReviewRoom/${idRoom}`
    )
      .then((res) => res.json())
      .then((data) => setPageRoom(data));
  };

  const handleGetPageTotalReviewRoom = (idRoom, numberPage) => {
    fetch(
      `http://pandoraolaole-001-site1.btempurl.com/Review/getListReviewRoomPaging/${idRoom}/page-${numberPage}`
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

  const starRoom = (nameCategory) => {
    switch (nameCategory) {
      case "5 Star":
        setStar([1, 2, 3, 4, 5]);
        break;
      case 5:
        setStar([1, 2, 3, 4, 5]);
        break;
      case "4 Star":
        setStar([1, 2, 3, 4]);
        break;
      case 4:
        setStar([1, 2, 3, 4]);
        break;
      case "3 Star":
        setStar([1, 2, 3]);
        break;
      case 3:
        setStar([1, 2, 3]);
        break;
      case "2 Star":
        setStar([1, 2]);
        break;
      case 2:
        setStar([1, 2]);
        break;
      case "1 Star":
        setStar([1]);
        break;
      case 1:
        setStar([1]);
        break;
      default:
        break;
    }
  };

  const starRoom1 = (nameCategory) => {
    switch (nameCategory) {
      case 5:
        return [1, 2, 3, 4, 5];
        break;
      case 4:
        return [1, 2, 3, 4];
        break;
      case 3:
        return [1, 2, 3];
        break;
      case 2:
        return [1, 2];
        break;
      case 1:
        return [1];
        break;
      default:
        break;
    }
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
      `http://pandoraolaole-001-site1.btempurl.com/Review/editReviewRoom/${R_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          detail: detail,
          starReview: star,
          userId: userid,
          roomId: hotelid,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));

    console.log(R_id, detail, star, userid, hotelid);
  };

  const Review = (listReview) => {
    return listReview.map((review, index) => (
      <div key={review.idReview}>
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
          {/* <Avatar
                                round={true}
                                size="40"
                                src={account.avatar === null
                                    ? "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=170667a&w=0&k=20&c=m-F9Doa2ecNYEEjeplkFCmZBlc5tm1pl1F7cBCh9ZzM="
                                    : account.avatar}
                                    /> */}

          <span id={index + 5000}>
            <p>{review.username} </p>

            <p className="star">{displayStar(starRoom1(review.starReview))}</p>
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

  useEffect(() => {
    setPrevListReview([...prevListReview, ...listReview]);
  }, [listReview]);

  const handleClickShowMoreComment = () => {
    if (i <= pageRoom) {
      handleGetPageTotalReviewRoom(id, i);
      setI(i + 1);
    } else {
      toast.success("Bạn đã xem hết các review");
    }
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
          `http://pandoraolaole-001-site1.btempurl.com/Review/createReviewRoom`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              detail: comment,
              starReview: parseInt(check),
              userId: user.idUser,
              roomId: id,
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
  console.log(star);
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
        <HeaderRoom
          room={room}
          listImage={listImage}
          star={star}
          displayStar={displayStar}
        />
      </div>

      <div className="name">
        <NameRoom room={room} star={star} displayStar={displayStar} />
      </div>
      <div>
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

export default RoomDetail;
