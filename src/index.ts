import express from 'express';
import WebSocket, {WebSocketServer} from 'ws';
const App = express();
const Clients = new Map();



interface messageType {
    type:"register" | "private",
    clientId:string,
    message:string
};;
const server = App.listen(8080, ()=>{
    console.log((new Date())+ "Listing on port number 8080")
})

const wss = new WebSocketServer({server});

wss.on('connection', (socket)=>{
    socket.on('error', console.error);
    socket.on('message', (data:any, isBinery)=>{
        const message:messageType  = JSON.parse(data);
        if(message.type === "register"){
            if(socket.readyState === WebSocket.OPEN){
                Clients.set(message.clientId, socket);
                socket.send("you are registered successfully")
            }
            
        }
        
        if(message.type === "private"){
            const target = Clients.get(message.clientId);
            if(target && target.readyState === WebSocket.OPEN){
                target.send(message.message)
            }
        }
    });
    socket.send("connectd to server")
})

