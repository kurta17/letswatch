import React, { useState } from 'react';
import axios from 'axios';

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Sending request to /ask with question:', input);
      const response = await axios.post('http://localhost:5000/ask', { question: input });
      console.log('Received response:', response.data);
      setIsLoading(false);

      const aiMessage = {
        sender: 'ai',
        text: response.data.answer || 'Sorry, an error occurred.',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error occurred:', error);
      setIsLoading(false);
      const errorMessage = {
        sender: 'ai',
        text: 'An error occurred. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div>
      {/* Chatbox Toggle Button */}
      <button
        onClick={toggleChatbox}
        className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600"
      >
        Chatbot
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-96 bg-gray-900 text-white shadow-lg rounded-lg">
          <div className="bg-gray-800 p-3 rounded-t-lg font-bold flex justify-between items-center">
            <span>ChatBot</span>
            <button onClick={toggleChatbox} className="text-white">✖</button>
          </div>
          <div
            className="p-3 max-h-80 overflow-y-auto"
            style={{ backgroundColor: '#2C2C2C' }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`text-sm mb-2 ${
                  message.sender === 'user'
                    ? 'text-right text-green-300'
                    : 'text-left text-gray-200'
                }`}
              >
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div className="text-sm text-gray-400">Thinking...</div>
            )}
          </div>
          <div className="p-3 bg-gray-800">
            <textarea
              rows="2"
              className="w-full border rounded px-2 py-1 bg-gray-700 text-white"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <button
              onClick={handleSendMessage}
              className="w-full mt-2 bg-green-500 text-white py-1 rounded hover:bg-green-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;