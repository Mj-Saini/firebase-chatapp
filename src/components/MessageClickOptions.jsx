import React, { useState } from "react";
import { messagesOptions } from "./common/Helper";
import { getDatabase, ref, remove } from "firebase/database";
import { app } from "./firebase";

const MessageClickOptions = ({
  indexId,
  showMessage,
  setSendMessage,
  handleIdGet,
  setOpenMessageOptions,
}) => {
  const [id, setId] = useState("");
  handleIdGet(id);

  // EDIT SELECTED MESSAGES
  const handleUpdate = (e, index) => {
    setId(index);
    e.preventDefault();
    const updateUse = showMessage.find((message) => message.id === index);
    if (updateUse) {
      setSendMessage([updateUse.message]);
    }
  };
  // DELETE CLICKED MESSAGE
  const handleDelete = (e, index) => {
    e.preventDefault();
    const db = getDatabase(app);
    const messageRef = ref(db, `users/${index}`); 
    remove(messageRef).then(() => {
      console.log("Delete message successfully");
      //   readUserData();
    });
  };
  // COPY SELECTED MESSAGES
  const handleCopyMessage = (e, index) => {
    e.preventDefault();
    const messageToCopy = showMessage.find((message) => message.id === index);
    if (messageToCopy) {
      navigator.clipboard
        .writeText(messageToCopy.message)
        .then(() => {
          alert("Copy message to clipboard");
        })
        .catch((error) => {
          console.error("Error copying message:", error);
        });
    }
  };

  return (
    <div className="bg-[#233138] py-2 px-1 rounded-md flex flex-col text-start">
      {messagesOptions.map((options, index) => {
        return (
          <button
            onClick={(e) => {
              setOpenMessageOptions(false);
              if (options.optionName === "edit") {
                handleUpdate(e, indexId);
              } else if (options.optionName === "delete") {
                handleDelete(e, indexId);
              } else if (options.optionName === "copy") {
                handleCopyMessage(e, indexId);
              }
            }}
            key={index}
            className="text-sm text-start font-normal text-white/80 px-2 py-1 capitalize"
          >
            {options.optionName}
          </button>
        );
      })}
    </div>
  );
};

export default MessageClickOptions;
