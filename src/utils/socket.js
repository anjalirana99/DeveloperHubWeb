import {io} from "socket.io-client"
import { BASE_URL } from "./constants"

export const createSocketConnection=()=>{
    if(location.hostname === "localhost")
        return io(BASE_URL)
    else 
        return io("/", {path:"/api/socket.io"})   // otherwould have replaced as developer/socket.io/api but should be like developerhub/api/socket.io 
}