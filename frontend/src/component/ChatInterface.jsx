import React, { useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    
    if (newMessage.trim()) {
      // Add user message to chat
      const userMessage = {
        id: Date.now(),
        text: newMessage,
        sender: "user",
      };
      setMessages((prev) => [...prev, userMessage]);
      setNewMessage(""); // Clear input field
      setIsLoading(true); // Show loading indicator
      console.log(newMessage);
      try {
        // Make an Axios POST request to the backend API
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL, {
          message: newMessage,
        });
        console.log(response.data);
        //  sAdd the bot's response to the chat
         const botMessage = {
           id: Date.now() + 1,
           text: response.data.response || "Sorry, I couldn't process that.",
           sender: "bot",
         };
       setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false); // Hide loading indicator
      } 
      
      
      
      catch (error) {
        console.error("Error fetching AI response:", error);
        // Add an error message to the chat
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 2,
            text: "An error occurred while communicating with the server.",
            sender: "bot",
          },
        ]);
      } 
       // finally {
      //   setIsLoading(false); // Hide loading indicator
      // }
    }
  };



  


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100">
    <div className="flex flex-col h-screen max-w-7xl mx-auto p-4 font-sans">
      {/* Chat Header */}
      <div className="bg-gray-800 shadow-md p-4 rounded-t-lg text-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 animate-pulse">
          Chat.ai
        </h1>
      </div>
  
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 rounded-lg shadow-inner ">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-xl p-4 ${
                message.sender === "user"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-700 text-gray-200 shadow-lg"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-xl p-4 bg-gray-700 text-gray-200 shadow-lg">
              Typing...
            </div>
          </div>
        )}
      </div>
  
      {/* Message Input */}
      <form
        onSubmit={handleSend}
        className="bg-gray-800 p-4 shadow-md rounded-b-lg"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 text-gray-900 border rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default ChatInterface;
