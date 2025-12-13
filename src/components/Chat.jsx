import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../utils/socket"; // ❗ Correct import
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  const connections = useSelector((store) => store.connections);

  const targetUser = connections.find((user) => user._id === targetUserId);

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      const chatMessage = chat?.data?.messages.map((msg) => {
        console.log(msg);
        const {senderId,text} = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
        };
      });
      setMessages(chatMessage);

    } catch (error) {
      console.log("Error in fetching chat messages: ", error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    // join chat room using same socket
    socket.emit("joinChat", { firstName, userId, targetUserId });

    // listen for messages
    socket.on("MessageReceived", ({ firstName,lastName, text }) => {
      console.log(firstName + " : " + text);
      setMessages((messages) => [...messages, { firstName,lastName, text }]);
    });

    // cleanup listener ONLY
    return () => {
      socket.off("MessageReceived");
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      firstName,
      lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
   <div className="w-full min-h-screen bg-[#0f0f0f] px-4 pt-4 pb-24 flex justify-center items-start">
  <div className="w-full max-w-lg bg-[#1a1a1a] rounded-xl shadow-xl flex flex-col overflow-hidden border border-[#2a2a2a]">
    {/* Chat Header */}
    <div className="p-4 border-b border-[#2e2e2e] bg-[#1f1f1f]">
      <h2 className="text-lg font-semibold text-white">Chat with {targetUser.firstName}</h2>
    </div>

    {/* Chat Messages (Dummy) */}
    <div className="flex-1 p-4 space-y-3 bg-[#141414]">
      {/* Incoming message */}
      <div className="flex justify-start flex-col overflow-y-auto overflow-x-hidden h-[50vh] md:h-64">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              "chat " + (user.firstName === message.firstName ? "chat-end" : "chat-start")
            }
          >
            <div className="chat-header">
              {message.firstName} {message.lastName}
              <time className="text-xs opacity-50">2 hours ago</time>
            </div>
            <div className="chat-bubble">{message.text}</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
        ))}
      </div>
    </div>

    {/* Input Area (Dummy) */}
    <div className="p-3 border-t border-[#2e2e2e] bg-[#1f1f1f] flex gap-2">
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        type="text"
        placeholder="Type a message..."
        className="flex-1 bg-[#2a2a2a] text-white border border-[#3a3a3a] rounded-lg px-3 py-2 text-sm placeholder-gray-400"
      />
      <button
        onClick={sendMessage}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Send
      </button>
    </div>
  </div>
</div>

  );
};

export default Chat;
