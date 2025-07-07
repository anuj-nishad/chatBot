import { useState } from "react";
import axios from "axios";
import {LuLoader} from "react-icons/lu"

function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<ChatProps[]>([]);
  const [resLoading, setResLoading] = useState(false)

  interface ChatProps {
    sender: string,
    text: string
  }

  const sendMessage = async () => {
    setResLoading(true);
    if (!input.trim()) return;
    const userMsg: ChatProps = { sender: "user", text: input };
    setChat((prev) => [...prev, userMsg]);
    setInput("");
    try {
      const res = await axios.post("http://localhost:3000/chat", {
        message: input,
      });

      const botMsg: ChatProps = { sender: "bot", text: res.data.reply.content };
      setResLoading(false);
      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setChat((prev) => [...prev, { sender: "bot", text: "Error getting reply." }]);
    }
  };

  return (
    <div>
      <div className="w-full p-6 pt-12 min-h-screen bg-gradient-to-r from-blue-200 to-cyan-200">
        <div className="mx-auto w-[50%] h-[85vh]">
          <div>
            <h1 className="text-4xl text-blue-800 font-bold mb-4">Chat With Me !</h1>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="h-full rounded space-y-2 my-4 pt-4 pb-10 overflow-y-auto scrollbar-thin">
              {(chat.length <= 0) && 
                <div className="py-8 rounded px-8 overflow-hidden bg-blue-100 text-blue-900 text-right">Start new chat e.g "Hi chatBoy! how are you ?"</div> 
              }
              {chat.map((msg, i) => (
                <div key={i} className={`py-8 rounded px-8 overflow-hidden ${msg.sender === "user" ? "bg-blue-100 text-blue-900 text-right" : "bg-gray-200 text-gray-900 text-left"}`}>            
                  <pre className="whitespace-pre-wrap break-words">{msg.text}</pre>
                </div>
              ))}
              {resLoading && (
                <div className="flex space-x-2 py-8 rounded px-8 overflow-hidden bg-gray-200 text-gray-900 text-left">
                  <LuLoader size={"28px"} className="animate-spin" />
                  <p>Chatbot is typing…</p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-screen border outline-none px-3 py-2 rounded bg-white"
                placeholder="Type your message..."
              />
              <button onClick={sendMessage} className="bg-blue-800 cursor-pointer text-white px-8 py-2 rounded hover:bg-blue-900">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
