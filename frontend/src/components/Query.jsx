


import { useState } from "react";

const Query = ({ SendMessages, clearMessages }) => {
  const [message, setMessage] = useState('');

    // 3. Bot response (left side)
    SendMessages({
      position: 'left',
      type: 'text',
      title: 'Chatbot',
      text: answer,
      titleColor: 'green',
      avatar: 'https://media.licdn.com/dms/image/C4E0BAQFMKH2vPjYBrQ/company-logo_200_200/0/1668504139212/aiplanet_logo?e=2147483647&v=beta&t=4s_YCgdTK3ms2AOZITKzRkO88X0qHkqJ0iOpyY32r14',
    });

    setMessage('');
  };

  // Trigger send on Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="query container">
      <div className="d-flex flex-column text-center justify-content-center">
        <div className="d-flex align-items-center mt-2 py-2 font-medium bg-light border border-light rounded">
          <input
            type="text"
            className="form-control mx-2 bg-light border border-light"
            placeholder="Send a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            type="button"
            className="mx-3 btn btn-light"
            onClick={handleSearch}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c598480cb24e8f535b017b17e9bafc4ae1f795f41bcf4e04f76433b07f62476d?"
              className="shrink-0 aspect-square w-22"
              alt="Send"
            />
          </button>
        </div>
        <div>
          <button
            className="m-2 btn btn-outline-warning font-monospace float-end"
            style={{ fontSize: "0.8rem" }}
            onClick={clearMessages}
          >
            Clear Messages
          </button>
        </div>
      </div>
    </div>
  );
};

export default Query;
