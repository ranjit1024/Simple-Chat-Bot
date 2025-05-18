import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Chat } from "./chat";


function App() {
  
 
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
