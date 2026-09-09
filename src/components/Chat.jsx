import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'

const Chat = () => {
    const user = useSelector((store)=>store.user)
    const userId = user?._id
    const {targetId} = useParams()
    const [newMessage , setNewMessage]  = useState('')
    const [messages , setMessages] = useState([])

    const fetchChat = async ()=>{
        try{
            const res = await axios.get(BASE_URL + "/chat/" + targetId , {withCredentials : true})
            const chatMessages = res?.data?.results?.messages.map((msgs)=>{
                    const {senderId, text} = msgs
                    return {
                        senderId : senderId._id,
                        firstName : senderId.firstName,
                        lastName : senderId.lastName,
                        text : text
                    }
            })
            setMessages(chatMessages)

        }
        catch(err){
            console.log("ERROR: " + err.response)
        }
    }
    useEffect(()=>{
        fetchChat()
    },[])
    useEffect(()=>{
        if(!userId)return 
        const socket = createSocketConnection()

        socket.emit("joinchat" , {
            userName:user.firstName,
            userId,
            targetId
        })

        socket.on("messageReceived",({senderId, firstName, lastName, text})=>{
            setMessages((prev)=>[...prev,{senderId, firstName, lastName, text}])
        })

        return ()=>{
            socket.disconnect()
        }

    },[userId])

    const handleSendMsg=()=>{
        const socket = createSocketConnection()
        socket.emit("sendMessage",{
            firstName:user.firstName,
            lastName:user.lastName,
            userId,
            targetId,
            text : newMessage
        })
        setNewMessage("")
    }
  return (
    <div className='border-2 border-gray-500 w-2/3 mx-auto flex flex-col gap-2 my-10 h-[70vh]'>
        <div className='text-xl flex items-center p-4 border-b-2 border-gray-500'>Chat</div>
        <div className='flex-1 overflow-y-auto p-2'>
            {messages.map((msg,index)=>{
                return(
                    <div key={index} className={"chat my-2 " +  (userId === msg.senderId ? "chat-end" : "chat-start")}>
                        
                        {/* <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                            <img
                                alt=""
                                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                            />
                            </div>
                        </div> */}
                        <div className="chat-header"> 
                            {`${msg.firstName} ${msg.lastName}`}
                            <time className="text-xs opacity-50"></time>
                        </div>
                        <div className="chat-bubble">{msg.text}</div>
                        <div className="chat-footer opacity-50"></div>
                        </div>
                )
            })}
        </div>
        <div className='flex p-2 gap-0.5'>
            <input type="text" placeholder="Medium" className="input input-md flex-1"
            value={newMessage}
            onChange={(e)=>setNewMessage(e.target.value)}/>
            <button className="btn btn-secondary" onClick={handleSendMsg}>Send</button>
        </div>
    </div>
  )
}

export default Chat