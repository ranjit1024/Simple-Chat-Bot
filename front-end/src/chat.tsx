import { useEffect, useRef, useState, type ReactNode } from "react";
export function Chat() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<any[]>([]);
  const [query, setQuery] = useState<any[]>([]);
 
  const data:any = useRef(null);
  const [sentData, setSentdata] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/");
    socket.onopen = () => {
      console.log("connected");
      setSocket(socket);
    };
    socket.onmessage = (message) => {
      setMessage(message.data);
      console.log("Received message", message.data);
    };
  }, []);
    const payload = {
        type: 'register',
        clientId: JSON.stringify(localStorage.getItem('clientId')),
        message: 'fsdfads',
      };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "end",
        gap: "1rem",
        flexDirection: "column",
      }}
    >
    
    {
        query.map((data,index) => {
            return  <div
            key={index}
        style={{
          display: "flex",
            maxWidth:'70vw',
          alignContent:'end',
          justifyContent:'end'
        }}
      >
        <p
          style={{
            padding: "0.3rem 1rem",
            borderRadius: "0.8rem",
            fontSize: "1.3rem",
            backgroundColor: "lightblue",
          }}
        >
          {data}
        </p>
      </div>
        })
    } 

    
       <div
        style={{
          display: "flex",

          marginLeft: "15rem",
          marginBottom:'1rem'
        }}
      >
        <p
          style={{
            padding: "0.3rem 1rem",
            borderRadius: "0.8rem",
            fontSize: "1.3rem",
            backgroundColor: "lightgreen",
          }}
        >
          {message}
        </p>
      </div> 

      <div
        style={{
          display: "flex",

          height: "5%",
          marginBottom: "4rem",
          alignItems: "end",
          justifyContent: "center",
          gap: "1rem",
          width: "100vw",
        }}
      >
        <input
            ref={data}
          type="text"
          placeholder="Enter a text"
          style={{
            padding: "10px",
            width: "50%",
            border: "1px solid gray",
            borderRadius: "5px",
            fontSize: "1.2rem",
          }}
        />
        <button
          style={{
            padding: "10px",
            width: "10%",
            border: "1px solid gray",
            borderRadius: "5px",
            fontSize: "1.2rem",
          }}
          onClick={()=>{
            setQuery(prevData => [...prevData, data.current.value]);
            const message = socket?.send(JSON.stringify(payload)); 
            setMessage(prevData => [...prevData, message]);
            console.log(message)
            
          }}
        >
          Sent
        </button>
    
      </div> 
    </div>
  );
}

function UserData(){
    return  <div>
        fsdf</div>
}