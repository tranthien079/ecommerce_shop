import { Stack } from "react-bootstrap";
import avatar from "../../assets/avatar1.png";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findUser } from "../../redux/user/userSlice";
import { useGetRecepientUser } from "../../hooks/useGetRecepient";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useGetLatestMessage } from "../../hooks/useGetLatestMessage";
import { DateTime } from "luxon";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useGetRecepientUser({ chat, user });
  const { onlineUsers, notifications, markThisUserNotificationAsRead } =
    useContext(ChatContext);
  const { latestMessage } = useGetLatestMessage(chat);
  const unreadNotifications = unreadNotificationsFunc(notifications);
  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.senderId == recipientUser?._id
  );
  const isOnline = onlineUsers?.some(
    (user) => user?.userId == recipientUser?._id
  );

  const truncateText = (text) => {
    let shortText = text.substring(0, 20);

    if (text.length > 20) {
      shortText += "...";
    }

    return shortText;
  };
  return (
      <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
      onClick={() => {
        if (thisUserNotifications?.length !== 0) {
          markThisUserNotificationAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      <div className="d-flex">
        <div className="me-2 position-relative">
          <img
            src={recipientUser?.avatar != '' && avatar}
            alt="User Avatar"
            height="35px"
            className="rounded"
          />
        <div className={isOnline ? "position-absolute user-online" : ""}></div>
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.firstname +' ' +recipientUser?.lastname || "Unknown User"}</div>
          <div className="last-message">
            {latestMessage?.text ? (
              <span>{truncateText(latestMessage?.text)}</span>
            ): 'Chưa có tin nhắn'}
          </div>
        </div>
      </div>

      <div className="d-flex flex-column align-items-end">
        <div className="date">
          {DateTime.fromISO(latestMessage?.createdAt)
            .setLocale("vi")
            .toRelative()}
        </div>
        {/* <span>{moment(n.date).calendart()}</span> */}
        <div
          className={
            thisUserNotifications?.length > 0 ? "this-user-notifications" : ""
          }
        >
          {thisUserNotifications?.length > 0
            ? thisUserNotifications?.length
            : ""}
        </div>
      </div>
    </Stack>
  );
};

export default UserChat;
