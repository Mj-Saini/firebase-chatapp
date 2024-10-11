import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatArea from "./components/ChatArea";
import GetStarted from "./components/GetStarted";
import EmailLogin from "./components/Auth/EmailLogin";

function App() {
  return (
    <>
      {/*
       */}
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/email-login" element={<EmailLogin />} />
        <Route path="/chat-room" element={<ChatArea />} />
      </Routes>
    </>
  );
}

export default App;
