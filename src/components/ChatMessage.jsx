import React, { useContext } from 'react';
import './ChatMessage.css';
import Utility from '../Utility';
import { AppContext } from '../State';

function ChatMessage({ chat }) {
  const { state } = useContext(AppContext);

  let chat_time = Utility.getTime(chat.time);

  let messageStyles = {};

  if (state.user.user_id === chat.sent_by) {
    messageStyles.backgroundColor = '#DCF8C6';
    messageStyles.float = 'right';
  }

  return (
    <div style={{ clear: 'both' }}>
      <div className="chat-message-box" style={messageStyles}>
        {chat.message}
        <div className="message-time">{chat_time}</div>
      </div>
    </div>
  );
}

export default ChatMessage;
