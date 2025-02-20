import React, { useContext, useEffect, useRef, useState } from "react";
import { Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ChatContext } from "../../context/ChatContext";
import { useGetRecepientUser } from "../../hooks/useGetRecepient";
import { DateTime } from "luxon";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const userState = useSelector((state) => state?.auth?.user);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext);

  const { recipientUser } = useGetRecepientUser({
    chat: currentChat,
    user: userState,
  });

  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef(null); // Create a single ref for scrolling

  // Scroll to the last message when messages update
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!recipientUser)
    return <p className="text-center w-100 mt-4 text-white">No conversation selected yet...</p>;

  if (isMessagesLoading) {
    return <p className="text-center w-100">LOADING....</p>;
  }

  return (
    <Stack gap={4} className="chat-box w-100">
      <div className="chat-header">
        <strong>{recipientUser?.firstname} {recipientUser?.lastname}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages.map((message, index) => {
          const isLastMessage = index === messages.length - 1; // Check if it's the last message

          return (
            <Stack
              key={index}
              className={`${
                message?.senderId === userState?._id
                  ? "message self align-self-end  flex-grow-0"
                  : "message align-self-start flex-grow-0"
              }`}
              ref={isLastMessage ? scroll : null} // Attach the ref to the last message only
            >
              <span>{message?.text}</span>
              <span className="message-footer d-block">
                {DateTime.fromISO(message?.createdAt)
                  .setLocale("vi")
                  .toRelative()}
              </span>
            </Stack>
          );
        })}
      </Stack>
      <Stack className="chat-input flex-grow-0 d-flex" gap={3} direction="horizontal">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="Poppins"
          borderColor="rgba(72, 112, 223, 0.2)"
        />

        <button
          className="send-btn"
          onClick={() =>
            sendTextMessage(textMessage, userState, currentChat?._id, setTextMessage)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
          </svg>
        </button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;

// import React, { useContext, useEffect, useRef, useState } from "react";
// import { Stack } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import { ChatContext } from "../../context/ChatContext";
// import { useGetRecepientUser } from "../../hooks/useGetRecepient";
// import { DateTime } from "luxon";
// import InputEmoji from "react-input-emoji";
// const ChatBox = () => {
//   const userState = useSelector((state) => state?.auth?.user);
//   const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext);

//   const { recipientUser } = useGetRecepientUser({
//     chat: currentChat,
//     user: userState,
//   });

//   const [textMessage, setTextMessage] = useState("");
//   const scroll = useRef();

//   useEffect(() => {
//     scroll.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages])

//   if (!recipientUser)
//     return <p className="text-center w-100">No conversation selected yet...</p>;

//   if (isMessagesLoading) {
//     return <p className="text-center w-100">LOADING....</p>;
//   }

//   return (
//     <Stack gap={4} className="chat-box">
//       <div className="chat-header">
//         <strong>{recipientUser?.name}</strong>
//       </div>
//       <Stack gap={3} className="messages">
//         {messages.map((message, index) => (
//           <Stack
//             key={index}
//             className={`${
//               message?.senderId === userState?._id
//                 ? "message self align-self-end flex-grow-0"
//                 : "message align-self-start flex-grow-0"
//             }`}
//             ref={scroll}
//           >
//             <span>{message?.text}</span>
//             <span className="message-footer">
//               {DateTime.fromISO(message?.createdAt)
//                 .setLocale("vi")
//                 .toRelative()}
//                   {/* <span>{moment(n.date).calendart()}</span> */}

//             </span>
//           </Stack>
//         ))}
//       </Stack>
//       <Stack className="chat-input flex-grow-0" gap={3} direction="horizontal">
//         <InputEmoji
//           value={textMessage}
//           onChange={setTextMessage}
//           fontFamily="Poppins"
//           borderColor="rgba(72, 112, 223, 0.2)"
//         />

//         <button className="send-btn" onClick={() => sendTextMessage(textMessage, userState, currentChat?._id, setTextMessage)}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="16"
//             height="16"
//             fill="currentColor"
//             className="bi bi-send-fill"
//             viewBox="0 0 16 16"
//           >
//             <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
//           </svg>
//         </button>
//       </Stack>
//     </Stack>
//   );
// };

// export default ChatBox;
