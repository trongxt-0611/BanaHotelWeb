import { useNavigate } from "react-router-dom";
import "./Error.scss";
export const Error403 = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold red-color">403</h1>
          <p className="fs-3">
            {" "}
            <span className="text-danger beri-color">Opps!</span> Access
            Denied...
          </p>
          <p className="lead">You don't have permission to access this page.</p>
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
