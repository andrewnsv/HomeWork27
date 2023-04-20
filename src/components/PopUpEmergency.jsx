import React, { useContext, useEffect } from "react";
import { wsContext } from "../providers/wsProvider";

const PopUpEmergency = () => {
  const wsCtx = useContext(wsContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      wsCtx.setEmergencyMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [wsCtx]);

  const closePopUpHandler = () => {
    wsCtx.setEmergencyMessage(null);
  };

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
