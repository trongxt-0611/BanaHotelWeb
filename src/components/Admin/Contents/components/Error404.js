import { useNavigate } from "react-router-dom";
import "./Error.scss";
export const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold beri-color">404</h1>
          <p className="fs-3">
            {" "}
            <span className="text-danger beri-color">Opps!</span> Page not
            found.
          </p>
          <p className="lead">The page you’re looking for doesn’t exist.</p>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="btn btn-primary beri-bg-color"
          >
            Go To Home
          </button>
        </div>
      </div>
    </div>
  );
};
