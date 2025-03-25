
import { useEffect, useRef, useState } from "react";
import { MessageList } from "react-chat-elements";
import Query from "./Query";
import { sendQuery } from "../services/api";

const ChatBody = () => {
  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // Add message to state
  const handleMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // Send message and get bot response
  const SendMessages = async (userInput) => {
    // Show user message on right
    handleMessage({
      position: 'right',
      type: 'text',
      title: 'You',
      text: userInput.text,
      titleColor: 'black',
      avatar: '', // Optional: add user avatar if needed
    });

    try {
      const data = await sendQuery(userInput.text);

      // Show bot reply on left
      handleMessage({
        position: 'left',
        type: 'text',
        title: 'Chatbot',
        text: data.response,
        titleColor: 'green',
        avatar: 'https://media.licdn.com/dms/image/C4E0BAQFMKH2vPjYBrQ/company-logo_200_200/0/1668504139212/aiplanet_logo?e=2147483647&v=beta&t=4s_YCgdTK3ms2AOZITKzRkO88X0qHkqJ0iOpyY32r14',
      });
    } catch (error) {
      console.error('Fetch error:', error);
      handleMessage({
        position: 'left',
        type: 'text',
        title: 'Chatbot',
        text: 'Oops! Something went wrong.',
        titleColor: 'red',
      });
    }
  };

  // Clear all messages
  const clearMessages = () => setMessages([]);

  return (
    <>
      <div className="chatBody mx-5 mt-4" ref={messageListRef}>
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={messages}
        />
      </div>
      <Query SendMessages={SendMessages} clearMessages={clearMessages} />
    </>
  );
};

export default ChatBody;
