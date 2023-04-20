import React, { useContext } from "react";
import { wsContext } from "../providers/wsProvider";

const PopUpEmergency = () => {
  const wsCtx = useContext(wsContext);

  const closePopUpHandler = () => {
    wsCtx.setEmergencyMessage(null);
  };

  setTimeout(closePopUpHandler, 3000);

  return (
    <>
      {wsCtx.emergencyMessage && (
        <>
          <div className="overlay" onClick={closePopUpHandler} />
          <div className="pop-up-emergency">
            <p>{wsCtx.emergencyMessage}</p>
            <div className="btn-wraper">
              <button onClick={closePopUpHandler}>Close</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PopUpEmergency;
