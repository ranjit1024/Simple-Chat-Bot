"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = __importStar(require("ws"));
const App = (0, express_1.default)();
const Clients = new Map();
;
;
const server = App.listen(8080, () => {
    console.log((new Date()) + "Listing on port number 8080");
});
const wss = new ws_1.WebSocketServer({ server });
wss.on('connection', (socket) => {
    socket.on('error', console.error);
    socket.on('message', (data, isBinery) => {
        const message = JSON.parse(data);
        if (message.type === "register") {
            if (socket.readyState === ws_1.default.OPEN) {
                Clients.set(message.clientId, socket);
                socket.send("you are registered successfully");
            }
        }
        if (message.type === "private") {
            const target = Clients.get(message.clientId);
            if (target && target.readyState === ws_1.default.OPEN) {
                target.send(message.message);
            }
        }
    });
    socket.send("connected to server");
});
