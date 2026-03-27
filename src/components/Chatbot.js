import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chatbot-wrapper">
      <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✖' : '💬'}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>VeriHire Chat AI</span>
          </div>
          <div className="chatbot-messages">
            <div className="bot-msg">
              Halo! Ada yang bisa saya bantu terkait tips menghindari penipuan lowongan kerja?
            </div>
          </div>
          <div className="chatbot-input">
            <input type="text" placeholder="Tanya sesuatu..." />
            <button>➤</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;