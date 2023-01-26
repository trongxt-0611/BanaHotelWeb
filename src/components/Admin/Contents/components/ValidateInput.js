import _ from "lodash";
import { useEffect, useState } from "react";
import "./ValidateInput.scss";
export const ValidateInput = (props) => {
  const { type, name, min, max, value, onChange, required, setValid } = props;
  // console.log("adsdas>>>>", !_.isUndefined(min));
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    //required text
    if (required && _.isEmpty(value)) {
      setMessage(name + " is required");
      setIsValid(false);
    } else if (
      //required num
      required &&
      isNaN(value) &&
      type === "number"
    ) {
      setMessage(name + " is required and must be number type");
      setIsValid(false);
    } else {
      // min max
      if (!_.isUndefined(max) && value.length > max) {
        setMessage(name + " is too long");
        setIsValid(false);
      } else if (!_.isUndefined(min) && value.length < min) {
        setMessage(name + " is too short");
        setIsValid(false);
      } else setIsValid(true);
    }
  }, [value, name, min, max, required, type]);

  return (
    <div className="input-group has-validation">
      <input
        className={
          isValid ? "form-control is-valid" : "form-control is-invalid"
        }
        type={"text"}
        value={value}
        onChange={onChange}
      />

      {isValid ? (
        ""
      ) : (
        <div style={{ display: "block" }} className="invalid-feedback">
          {message}
        </div>
      )}
    </div>
  );
};
