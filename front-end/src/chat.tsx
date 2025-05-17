import { useEffect,useState } from "react";
export function Chat(){
     const [socket,setSocket] = useState<WebSocket | null>(null);
      const [message, setMessage] = useState("");
      useEffect(()=>{
        const socket = new WebSocket('ws://localhost:8080/');
        socket.onopen = ()=>{
          console.log('connected')
          setSocket(socket)
        }
        socket.onmessage = (message) =>{
          setMessage(message.data)
          console.log('Received message', message.data)
        }
      },[])

    return <div style={{
        height:'100vh',
        display:'flex',
        justifyContent:'end',
        gap:'1rem',
        flexDirection:'column'

    }}>

        <div style={{
            display:'flex',
            alignItems:'center',
            width:'80vw',
            justifyContent:'end',
            padding:'1rem',
            backgroundColor:'lightblue',
        }}>fdlkjhkjhsf</div>
        <div style={{
            
            display:'flex',

            height:'15%',
            marginBottom:'4rem',
            alignItems:'end',
            justifyContent:'center',
            gap:'1rem',
            width:'100vw'
        }}>
        <input type="text" placeholder="Enter a text"  style={{
            padding:'10px',
            width:'50%',
            border:'1px solid gray',
            borderRadius:'5px',
            fontSize:'1.2rem'
        }}/>
        <button style={{
            padding:'10px',
            width:'10%',
            border:'1px solid gray',
            borderRadius:'5px',
            fontSize:'1.2rem'
        }}>Submit</button>
        </div>
    </div>
}