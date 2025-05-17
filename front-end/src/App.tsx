import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Chat } from "./chat";
import { use, useEffect, useState } from "react";

function App() {
  const [socket,setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<any[]>([]);
  useEffect(()=>{
    const socket = new WebSocket('ws://localhost:8080/');
    socket.onopen = ()=>{
      console.log('connected')
      setSocket(socket)
    }
    socket.onmessage = (message) =>{
      setMessage((m:any) => [...m, message.data])
      console.log('Received message', message.data)
    }
  },[])
  if(!socket){
    return <div>
      "Connecting to socker server..."
    </div>
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Home() {
  const navigate = useNavigate();
  const cliendId = String(Math.random());
  console.log(cliendId);
  return (
    <div className="home">
      <button
        className="button"
        onClick={() => {
          localStorage.setItem("clientId", cliendId);
          navigate("/chat");
        }}
      >
        Register
      </button>
    </div>
  );
}

export default App;
