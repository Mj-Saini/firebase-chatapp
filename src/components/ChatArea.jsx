import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref, set, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

import {
  BackArrow,
  MikeIcon,
  PlusIcon,
  SearchIcon,
  SendIcon,
  VideoCallIcon,
  VoiceCallIcon,
} from "./common/Icon";
import userProfile from "../assets/images/svg/profile-img.svg";
import { app } from "./firebase";
import MessageClickOptions from "./MessageClickOptions";

const ChatArea = () => {
  const [sendMessage, setSendMessage] = useState("");
  const [showMessage, setShowMessage] = useState([]);
  const [openMessageOptions, setOpenMessageOptions] = useState(null);
  const [messageId, setMessageId] = useState(null);
  const uuid = uuidv4();

  const handleIdGet = (index) => {
    setMessageId(index);
  };

  function writeUserData(message) {
    const db = getDatabase(app);
    if (!messageId) {
      set(ref(db, "users/" + uuid), {
        message: message,
      });
    } else {
      const updates = {};
      updates["/users/" + messageId] = { message };
      update(ref(db), updates);
    }
  }

  const readUserData = () => {
    const db = getDatabase(app);
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allData = Object.keys(data).map((key) => {
          return { id: key, ...data[key] };
        });
        setShowMessage(allData);
      } else {
        setShowMessage([]);
      }
    });
  };

  useEffect(() => {
    readUserData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sendMessage.trim()) {
      if (messageId) {
        writeUserData(sendMessage, messageId);
        setSendMessage("");
        setMessageId(null);
      } else {
        writeUserData(sendMessage);
      }
      setSendMessage("");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header Section */}
      <div className="bg-[#0f485a] flex justify-between items-center sticky top-0 z-10">
        <div className="inline-flex items-center gap-2 sm:bg-[#0b3b4a] rounded-r-full ps-4 py-1 pe-1 relative">
          <span className="sm:inline-block rounded-full h-4 w-4 bg-green-500 absolute end-0 top-0 hidden"></span>
          <span className="cursor-pointer">
            <BackArrow />
          </span>
          <h2 className="font-semibold text-white text-sm sm:text-xl ms-3">
            MiRzA sHaYaR
          </h2>
          <img
            className="w-12 h-12 rounded-full hidden sm:block"
            src={userProfile}
            alt="profile"
          />
        </div>
        <div className="flex gap-1.5 items-center">
          <span className="flex flex-col justify-center items-center  h-12 w-8 sm:w-12 rounded-full gap-1">
            <VideoCallIcon />
          </span>
          <span className="flex flex-col justify-center items-center  h-12 w-8 sm:w-12 rounded-full gap-1">
            <VoiceCallIcon />
          </span>{" "}
          <span className="flex flex-col justify-center items-center  h-12 w-8 sm:w-10 rounded-full gap-1">
            <SearchIcon />
          </span>
          <div className="flex flex-col justify-center items-center  h-12 w-8 sm:w-10 rounded-full gap-1">
            <span className="inline-block h-1 w-1 rounded-full bg-white "></span>
            <span className="inline-block h-1 w-1 rounded-full bg-white "></span>
            <span className="inline-block h-1 w-1 rounded-full bg-white "></span>
          </div>
        </div>
      </div>

      {/* Message List Section */}
      <div className="flex-grow overflow-y-auto flex flex-col bg-[#000000] py-2 px-2">
        <span className="text-white mx-auto inline-block py-1.5 px-3 bg-[#00314D] rounded-3xl mb-4">
          Today
        </span>

        {Array.isArray(showMessage) && showMessage.length > 0 ? (
          showMessage.map((message) => (
            <div key={message.id} className="flex justify-end mb-4 relative">
              {openMessageOptions === message.id && (
                <div className="relative">
                  <div className="absolute z-[2] -left-20">
                    <MessageClickOptions
                      indexId={message.id}
                      showMessage={showMessage}
                      setSendMessage={setSendMessage}
                      handleIdGet={handleIdGet}
                      readUserData={readUserData}
                      setOpenMessageOptions={setOpenMessageOptions}
                    />
                  </div>
                </div>
              )}
              <div
                className={`rounded-lg p-2 relative group overflow-hidden bg-[#0f485a]`}
              >
                <span
                  onClick={() => {
                    setOpenMessageOptions(
                      openMessageOptions === message.id ? null : message.id
                    );
                  }}
                  className="rotate-[-90deg] flex absolute -top-5 duration-300 group-hover:-top-[3px] end-1.5 drop_arrow cursor-pointer"
                >
                  <BackArrow />
                </span>
                <p className="text-white font-medium text-base">
                  {message.message}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No messages yet.</p>
        )}
      </div>

      {/* Input Field Section */}
      <div className="sticky bottom-0 w-full bg-[#0f485a] md:py-1 px-2 z-10">
        <div className="bg-[#0f485a] rounded-full flex items-center py-1 px-1.5">
          <span className="flex flex-col justify-center items-center h-12 w-10 rounded-full gap-1">
            <PlusIcon />
          </span>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex items-center">
              <input
                onChange={(e) => setSendMessage(e.target.value)}
                className="py-1.5 rounded-full px-3 outline-none w-full"
                type="text"
                name="message"
                id="message"
                value={sendMessage}
                placeholder="Type Message..."
              />
              {sendMessage ? (
                <button
                  type="submit"
                  className="flex flex-col justify-center items-center h-12 w-10 rounded-full gap-1"
                >
                  <SendIcon />
                </button>
              ) : (
                <button className="flex flex-col justify-center items-center h-12 w-10 rounded-full gap-1">
                  <MikeIcon />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
