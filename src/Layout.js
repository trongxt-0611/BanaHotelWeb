import { Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import HomePage from "./components/Home/HomePage";
import { ToastContainer } from "react-toastify";
import HotelDetail from "./components/HotelDetail/HotelDetail";

import RoomDetail from "./components/RoomDetail/RoomDetail";

import { Admin } from "./components/Admin/Admin";
import { Dashboard } from "./components/Admin/Contents/Dashboard";
import { ManageHotel } from "./components/Admin/Contents/ManageHotel";
import { ManageUser } from "./components/Admin/Contents/Users/ManageUser";
import { ManageRoom } from "./components/Admin/Contents/Rooms/ManageRoom";
import { ManageHotelRooms } from "./components/Admin/Contents/Rooms/ManageHotelRooms";

import UpdatePassword from "./components/User/UpdatePassword";
import UpdateProfile from "./components/User/UpdateProfile";

import ProtectedRoute from "./routes/ProtectedAdminRoute";
import { ManageReview } from "./components/Admin/Contents/Reviews/ManageReview";
import { useSelector } from "react-redux";
import { Error403 } from "./components/Admin/Contents/components/Error403";
import { Error404 } from "./components/Admin/Contents/components/Error404";

export const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="login" exact element={<Login />} />
        <Route path="register" exact element={<Register />} />
        <Route path="/403" exact element={<Error403 />} />
        <Route path="/" exact element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/:email" exact element={<HomePage />} />
          <Route path="hoteldetail/:id" exact element={<HotelDetail />} />
          <Route
            path="hoteldetail/:id/:email"
            exact
            element={<HotelDetail />}
          />

          <Route path="/roomdetail/:id" exact element={<RoomDetail />} />
          <Route path="/roomdetail/:id/:email" exact element={<RoomDetail />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/updatepassword" element={<UpdatePassword />} />
        </Route>

        <Route
          path="/admins"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route index element={<ManageUser />} />
          <Route path="manage-hotels" element={<ManageHotel />} />
          <Route path="manage-rooms" element={<ManageRoom />} />
          <Route path="hotel-rooms/:hotelId" element={<ManageHotelRooms />} />
          <Route
            path="hotel-reviews/:targetId"
            element={<ManageReview target={"Hotel"} />}
          />
          <Route
            path="room-reviews/:targetId"
            element={<ManageReview target={"Room"} />}
          />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};
