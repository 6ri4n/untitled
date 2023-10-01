import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./popupMessage.css";

const PopupMessage = ({ message, path = undefined }) => {
  const [collapse, setCollapse] = useState(false);

  const navigate = useNavigate();

  const handleCollapse = () => {
    setCollapse(true);
    navigate(path);
  };

  return (
    <>
      {!collapse && (
        <div className="popupContainer box">
          <div className="text">{message}</div>
          <div className="x" onClick={handleCollapse}>
            ❌
          </div>
        </div>
      )}
    </>
  );
};

export default PopupMessage;
