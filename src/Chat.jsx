import React from "react";
import { RiMessageLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
function Chat() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e === "click") navigate("/Chatbot");
  };
  return (
    <>
      <div className="absolute w-[27%] h-[73%] top-[16%] left-[50px] border border-black flex flex-col justify-center items-start p-4 rounded-[5%] ml-[30%]">
        <RiMessageLine className="text-[30px] text-violet-500" />
        <h1 className="text-[40px]">Hello</h1>
        <h2 className="text-[40px] font-bold text-violet-500 font-Dosis">
          Chat
        </h2>
        <p>This last chat app you'll ever need.</p>
        <button
          onClick={() => handleClick("click")}
          className="mt-4 border border-white text-gray-600 rounded-lg px-6 py-1 font-bold hover:bg-gray-800 transition duration-300"
        >
          Click
        </button>
      </div>
    </>
  );
}

export default Chat;