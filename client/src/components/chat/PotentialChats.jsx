import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { useSelector } from "react-redux";

const PotentialChats = () => {
  const userState = useSelector(state => state?.auth?.user)
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
  return (
    <div className="all-users">
      {potentialChats.length > 0 &&
        potentialChats?.map((u, index) => {
          return (
            <div
              className="single-user"
              key={index}
              onClick={() =>
                createChat(userState?._id, u?._id)
              }
            >
              {u?.firstname} {u?.lastname}
              <span className={onlineUsers?.some((user) => user?.userId == u?._id) ? 'user-online' : ''}></span>
            </div>
          );
        })}
    </div>
  );
};

export default PotentialChats;
