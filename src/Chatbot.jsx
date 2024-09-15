import React, { useState, useRef } from "react";
import { IoArrowBack, IoSend } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
    const navigate = useNavigate(); // Correctly call useNavigate, no destructuring

    const [message, setMessage] = useState("");
    const [chats, setChats] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);
    const chatBoxRef = useRef(null);
    const [isChatOpen] = useState(true);

    // Suggestions and Bot Responses
    const suggestionsList = ["hlo", "name or calcium-rich fruit", "all fruit list"];
    const [availableSuggestions, setAvailableSuggestions] = useState([...suggestionsList]);

    const responses = {
        hlo: "hlo, how may I help you?",
        "name or calcium-rich fruit":
            "I am a bot. Calcium-rich fruits include oranges, kiwis, and figs.",
        "all fruit list": "Here is a list: Apples, Bananas, Oranges, Grapes, etc.",
        default: "Sorry, I didn't understand that. Can you please rephrase?",
    };

    const getBotResponse = (userMessage) => {
        const lowerCaseMessage = userMessage.toLowerCase();
        return responses[lowerCaseMessage] || responses["default"];
    };

    const handleSendMessage = (selectedMessage) => {
        const userMessageText = selectedMessage || message;
        if (userMessageText.trim() === "") return;

        const userMessage = {
            text: userMessageText,
            time: new Date().toLocaleTimeString(),
            type: "user",
        };
        setChats([...chats, userMessage]);

        const botResponse = {
            text: getBotResponse(userMessageText),
            time: new Date().toLocaleTimeString(),
            type: "bot",
        };

        // Simulate chatbot response after a delay
        setTimeout(() => {
            setChats((prevChats) => [...prevChats, botResponse]);
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }, 1000);

        setMessage("");
    };

    const handleClearChats = () => {
        setChats([]);
        setAvailableSuggestions([...suggestionsList]);
    };

    const handleSuggestionClick = (suggestion) => {
        setMessage(suggestion);
        setAvailableSuggestions(
            availableSuggestions.filter((s) => s !== suggestion)
        );
        handleSendMessage(suggestion);
    };

    const handleClick = () => {
        navigate("/"); // Correctly call navigate to go back
    };

    return (
        <div className="flex relative items-center justify-center min-h-screen h-[80%]">
            <button
                className="fixed top-7 left-4 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600"
                onClick={handleClick}
            >
                <IoArrowBack />
            </button>

            {isChatOpen && (
                <div className="w-full sm:w-[80%] fixed h-[80%] bg-gray-900 text-white shadow-lg rounded-lg flex flex-col">
                    <div className="flex justify-between items-center bg-purple-800 p-4 rounded-t-lg">
                        <h3 className="text-lg">Chat</h3>
                        <button
                            className="text-sm bg-gray-700 px-3 py-1 rounded"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            Menu
                        </button>
                    </div>
                    {isMenuOpen && (
                        <div className="absolute top-16 right-10 bg-gray-700 text-white p-2 rounded shadow-lg z-10">
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                                onClick={handleClearChats}
                            >
                                Clear All
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                                onClick={() => setIsSettingsOpen(true)}
                            >
                                Settings
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                                onClick={() => setIsReportOpen(true)}
                            >
                                Report
                            </button>
                        </div>
                    )}
                    <div
                        className="flex-1 relative overflow-y-auto p-4 bg-gray-800"
                        ref={chatBoxRef}
                    >
                        {chats.length === 0 ? (
                            <p className="text-gray-400">No messages yet</p>
                        ) : (
                            chats.map((chat, index) => (
                                <div
                                    key={index}
                                    className={`mb-2 p-2 rounded-lg max-w-[80%] ${chat.type === "user"
                                            ? "bg-purple-600 max-w-[80%] text-white self-end ml-[52%]"
                                            : "bg-gray-700 text-white self-start"
                                        }`}
                                >
                                    <p className="mb-1">{chat.text}</p>
                                    <span className="text-xs text-gray-300">{chat.time}</span>
                                </div>
                            ))
                        )}
                        {availableSuggestions.length > 0 && (
                            <div className="flex flex-col float-end bottom-3 right-2 absolute gap-2">
                                {availableSuggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        className=" text-gray-800 font-semibold font-serif opacity-80 bg-white px-4 py-2 rounded-lg hover:bg-gray-600"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex p-4 bg-gray-900 border-t border-gray-700">
                        <input
                            type="text"
                            className="flex-1 p-2 bg-gray-700 text-white rounded-l outline-none"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button
                            className="ml-2 p-2 bg-green-500 text-white rounded-r flex items-center justify-center"
                            onClick={() => handleSendMessage()}
                        >
                            <IoSend />
                        </button>
                    </div>
                </div>
            )}
            {isSettingsOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg mb-4">Settings</h3>
                        <button
                            className="bg-red-500 px-4 py-2 rounded"
                            onClick={() => setIsSettingsOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {isReportOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg mb-4">Report</h3>
                        <button
                            className="bg-red-500 px-4 py-2 rounded"
                            onClick={() => setIsReportOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
