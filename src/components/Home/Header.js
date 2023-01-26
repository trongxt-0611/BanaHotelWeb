import React from "react";
import { useSelector } from "react-redux";
export const Header = () => {
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );
  return (
    <div>
      <div>
        <img src={this.props.user.avatar} alt="user avatar" />
        <p>Welcom: {this.props.user.name}</p>
      </div>
      <div>
        <p>{this.props.hotel.address}</p>
        <p>{this.props.hotel.nameCategory}</p>
        <p>{this.props.hotel.phoneHotel}</p>
        <img src={this.props.hotel.imageHotel} alt="Anh dai dien hotel" />
      </div>
      <div>
        {this.props.listImage.map((image, index) => (
          <img key={index} src={image.image} alt={image.idImageDetail} />
        ))}
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-right-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
        </button>
      </div>
      <div>
        <h2>{this.props.hotel.nameHotel}</h2>
        {this.props.displayStar(this.props.star)}
        <p>{this.props.hotel.description}</p>
      </div>
    </div>
  );
};
