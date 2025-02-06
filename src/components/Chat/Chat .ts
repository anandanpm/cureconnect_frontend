// import { useEffect, useState, useCallback } from "react"
// import { io } from "socket.io-client"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Send, X } from "lucide-react"
// import type { ChatProps, ChatState, Message } from "@/types/chat"
// import "../styles/chat.scss"

// const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "http://localhost:5000"

// export const Chat: React.FC<ChatProps> = ({ userId, receiverId, onClose }) => {
//   const [state, setState] = useState<ChatState>({
//     socket: null,
//     conversation: null,
//     inputMessage: "",
//     isConnected: false,
//   })

//   useEffect(() => {
//     const socketInstance = io(SOCKET_SERVER_URL)

//     socketInstance.on("connect", () => {
//       setState((prev) => ({ ...prev, isConnected: true }))
//       socketInstance.emit("join", userId)
//     })

//     socketInstance.on("newMessage", (message: Message) => {
//       setState((prev) => ({
//         ...prev,
//         conversation: prev.conversation
//           ? { ...prev.conversation, messages: [...prev.conversation.messages, message] }
//           : { _id: "", sender: userId, receiver: receiverId, messages: [message] },
//       }))
//     })

//     socketInstance.on("messageSent", (message: Message) => {
//       setState((prev) => ({
//         ...prev,
//         conversation: prev.conversation
//           ? { ...prev.conversation, messages: [...prev.conversation.messages, message] }
//           : { _id: "", sender: userId, receiver: receiverId, messages: [message] },
//       }))
//     })

//     socketInstance.on("disconnect", () => {
//       setState((prev) => ({ ...prev, isConnected: false }))
//     })

//     setState((prev) => ({ ...prev, socket: socketInstance }))

//     return () => {
//       socketInstance.disconnect()
//     }
//   }, [userId, receiverId])

//   const sendMessage = useCallback(() => {
//     const { socket, inputMessage } = state

//     if (inputMessage.trim() && socket && state.isConnected) {
//       socket.emit("sendMessage", {
//         senderId: userId,
//         receiverId: receiverId,
//         text: inputMessage.trim(),
//       })
//       setState((prev) => ({ ...prev, inputMessage: "" }))
//     }
//   }, [state, userId, receiverId])

//   const handleKeyPress = useCallback(
//     (e: React.KeyboardEvent<HTMLInputElement>) => {
//       if (e.key === "Enter") {
//         sendMessage()
//       }
//     },
//     [sendMessage],
//   )

//   const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     setState((prev) => ({ ...prev, inputMessage: e.target.value }))
//   }, [])

//   return (
//     <div className="chat-container">
//       <div className="chat-header">
//         <div className="chat-header__title">
//           Chat
//           <span
//             className={`connection-status ${
//               state.isConnected ? "connection-status--connected" : "connection-status--disconnected"
//             }`}
//           >
//             {state.isConnected ? "Connected" : "Disconnected"}
//           </span>
//         </div>
//         <Button variant="ghost" size="icon" onClick={onClose}>
//           <X className="h-4 w-4" />
//         </Button>
//       </div>

//       <div className="chat-messages">
//         <ScrollArea className="chat-messages__wrapper">
//           {state.conversation?.messages.map((message) => (
//             <div
//               key={message._id}
//               className={`chat-message ${message.sender === userId ? "chat-message--sent" : "chat-message--received"}`}
//             >
//               <div className="chat-message__bubble">
//                 <p className="chat-message__text">{message.text}</p>
//                 <span className="chat-message__time">{new Date(message.timestamp).toLocaleTimeString()}</span>
//               </div>
//             </div>
//           ))}
//         </ScrollArea>
//       </div>

//       <div className="chat-footer">
//         <div className="chat-footer__input-container">
//           <Input
//             value={state.inputMessage}
//             onChange={handleInputChange}
//             onKeyPress={handleKeyPress}
//             placeholder="Type a message..."
//             disabled={!state.isConnected}
//           />
//           <Button onClick={sendMessage} disabled={!state.isConnected}>
//             <Send className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

