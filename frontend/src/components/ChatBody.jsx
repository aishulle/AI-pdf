// import { useEffect, useRef, useState } from "react";
// import { MessageList } from "react-chat-elements";
// import Query from "./Query";
// import { sendQuery } from "../services/api";


//  // ChatBody component
// const ChatBody = () => {
//   // State variables
//   const [messages, setMessages] = useState([]);
//   const messageListRef = useRef(null);

//   // Scroll to the bottom of the chat window when a new message is added
//   useEffect(() => {
//     if (messageListRef.current) {
//       messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Function to handle messages
//   const handleMessage = (message) => {
//     setMessages(prevMessages => [...prevMessages, message]);
//   };

//   // Function to send messages
//   const SendMessages = (newMessages) => {
//     handleMessage(newMessages);
//     try {
//       // Send the message to the server
//       const response = sendQuery(newMessages.text);
//       response.then((data) => {
//         // Add the response to the chat window
//         handleMessage({
//           position: 'left',
//           type: 'text',
//           title: 'Chatbot',
//           text: data.response,
//           titleColor: 'green',
//           avatar: '<img src="/AI-Planet-Logo.png" alt="AI Planet Logo" class="logo" />',
//         });
//       });
//     } catch (error) {
//       console.error('There was a problem with the fetch operation:', error);
//       throw error;
//     }
//   }

// // Function to clear messages
//   const clearMessages = () => { setMessages([]) };

//   return (
//     <>
//       <div className="chatBody mx-5 mt-4" ref={messageListRef}>
//         <MessageList
//           className='message-list'
//           lockable={true}
//           toBottomHeight={'100%'}
//           dataSource={messages}
//         />
//       </div>
//       <Query SendMessages={SendMessages} clearMessages={clearMessages} />
//     </>

//   )
// }

// export default ChatBody;


// uploadworkinimport axios from 'axios';

// const ChatBody = () => {
//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
    
//     if (!file || !file.name.toLowerCase().endsWith('.pdf')) {
//       alert("Please select a valid PDF file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const API_URL = import.meta.env.VITE_API_URL;
      
//       const response = await axios.post(
//         `${API_URL}/api/upload`, 
//         formData, 
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       console.log("Upload successful:", response.data);
//       alert("File uploaded successfully!");
//     } catch (error) {
//       console.error("Upload failed:", error.response ? error.response.data : error.message);
//       alert("File upload failed");
//     }
//   };

//   return (
//     <>
//       {/* Other components */}
//       <input 
//         type="file" 
//         accept=".pdf" 
//         onChange={handleFileUpload} 
//       />
//     </>
//   );
// };

// textnocjhgf import { useEffect, useRef, useState } from "react";
// import { MessageList } from "react-chat-elements";
// import Query from "./Query";
// import { sendQuery } from "../services/api";

//  // ChatBody component
// const ChatBody = () => {
//   // State variables
//   const [messages, setMessages] = useState([]);
//   const messageListRef = useRef(null);

//   // Scroll to the bottom of the chat window when a new message is added
//   useEffect(() => {
//     if (messageListRef.current) {
//       messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Function to handle messages
//   const handleMessage = (message) => {
//     setMessages(prevMessages => [...prevMessages, message]);
//   };

//   // Function to send messages
//   const SendMessages = (newMessages) => {
//     handleMessage(newMessages);
//     try {
//       // Send the message to the server
//       const response = sendQuery(newMessages.text);
//       response.then((data) => {
//         // Add the response to the chat window
//         handleMessage({
//           position: 'left',
//           type: 'text',
//           title: 'Chatbot',
          
//           text: data.response,
//           titleColor: 'green',
//           avatar: 'https://media.licdn.com/dms/image/C4E0BAQFMKH2vPjYBrQ/company-logo_200_200/0/1668504139212/aiplanet_logo?e=2147483647&v=beta&t=4s_YCgdTK3ms2AOZITKzRkO88X0qHkqJ0iOpyY32r14',
//         });
//       });
//     } catch (error) {
//       console.error('There was a problem with the fetch operation:', error);
//       throw error;
//     }
//   }

// // Function to clear messages
//   const clearMessages = () => { setMessages([]) };

//   return (
//     <>
//       <div className="chatBody mx-5 mt-4" ref={messageListRef}>
//         <MessageList
//           className='message-list'
//           lockable={true}
//           toBottomHeight={'100%'}
//           dataSource={messages}
//         />
//       </div>
//       <Query SendMessages={SendMessages} clearMessages={clearMessages} />
//     </>

//   )
// }

// export default ChatBody;

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
