import React, { useState } from 'react';

const Chatbot = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);

  // OBJEK BAHASA UNTUK CHATBOT
  const content = {
    ID: {
      header: "VeriHire AI Chatbot",
      status: "Online",
      welcome: "Halo! Ada yang bisa saya bantu terkait tips menghindari penipuan lowongan kerja?",
      placeholder: "Tanya sesuatu...",
      tips: "Coba tanya: 'Cara lapor penipuan' atau 'Ciri loker palsu'"
    },
    EN: {
      header: "VeriHire AI Chatbot",
      status: "Online",
      welcome: "Hello! How can I help you today with tips on avoiding job scams?",
      placeholder: "Ask something...",
      tips: "Try asking: 'How to report scams' or 'Fake job signs'"
    }
  };

  const t = content[language || 'ID'];

  return (
    <div className="chatbot-wrapper">
      {/* TOMBOL BULAT */}
      <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '💬'}
      </button>

      {/* JENDELA CHAT */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>{t.header}</span>
            <div className="online-indicator">{t.status}</div>
          </div>
          
          <div className="chatbot-messages">
            <div className="message-bot">
              <p>{t.welcome}</p>
              <small style={{display: 'block', marginTop: '10px', color: '#64748B', fontStyle: 'italic'}}>
                {t.tips}
              </small>
            </div>
          </div>

          <div className="chatbot-input">
            <input type="text" placeholder={t.placeholder} />
            <button className="chatbot-send-btn">➤</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;