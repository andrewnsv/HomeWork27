import React, { useState, useEffect } from "react";
import io from "socket.io-client";

export const wsContext = React.createContext({
  sendMessage: () => {},
  messages: [],
  status: false,
  emergencyMessage: [],
  setEmergencyMessage: () => {},
});

const WSProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [emergencyMessage, setEmergencyMessage] = useState(null);

  useEffect(() => {
    const newSocket = io("http://127.0.0.1:4000", {
      transports: ["websocket"],
    });
    newSocket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    newSocket.on("emergency", (msg) => {
      setEmergencyMessage(msg);
    });

    newSocket.on("ping", (msg) => {
      console.log('Приел пинг')
    });

    setSocket(newSocket);

    return () => newSocket.close(); 
  }, []);

  const getSocketStatus = () => !!socket?.connected;

  const sendMessage = (msg) => {
    if (!getSocketStatus()) return false;
    socket.emit("message", { message: msg });
    return true;
  };

  const getContextValue = () => ({
    status: getSocketStatus(),
    messages,
    sendMessage,
    emergencyMessage,
    setEmergencyMessage,
  });

  return (
    <wsContext.Provider value={getContextValue()}>
      {children}
    </wsContext.Provider>
  );
};

export default WSProvider;
