import { useContext, useState } from "react";
import { wsContext } from "../providers/wsProvider";

const WsDemo = () => {
  const [inputValue, setInputValue] = useState("");

  const wsCtx = useContext(wsContext);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const sendMessageHandler = () => {
    wsCtx.sendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className="chat">
      <div className="chat-window">
        {wsCtx.messages.map((msg, index) => (
          <p key={`msg-${index}`}>{msg.message}</p>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Введите сообщение" value={inputValue} onChange={handleInputChange} />
        <button onClick={sendMessageHandler}>Send</button>
      </div>
    </div>
  );
};

export default WsDemo;
