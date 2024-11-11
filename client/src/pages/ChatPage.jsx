import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import ChatBox from "../components/chat/ChatBox";
import { ChatContext } from "../context/ChatContext";
import PotentialChats from "../components/chat/PotentialChats";
import Meta from "../components/Meta";
const ChatPage = () => {
  const userState = useSelector((state) => state?.auth?.user);

  const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext);
  return (
  
  <Container className="" >
       <Meta title='Tin nhắn' />
      <PotentialChats />
      <h2 className="text-dark text-center font-weight-bold"><strong>Nhắn tin với nhân viên bán hàng</strong></h2>

      {userChats?.length < 0 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start d-flex" style={{ background: 'rgb(40, 40, 40)' }}>
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading...</p>}
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={userState} />
                </div>
              );
            })}
          </Stack>
          <ChatBox/>
        </Stack>
      )}
    </Container>
  );
};

export default ChatPage;
