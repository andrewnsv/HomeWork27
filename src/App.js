import "./App.css";

import WSProvider from "./providers/wsProvider";

import PopUpEmergency from ".//components/PopUpEmergency";
import WsDemo from "./components/WsDemo";

const App = () => (
  <WSProvider>
      <PopUpEmergency />
      <WsDemo />
  </WSProvider>
);

export default App;
