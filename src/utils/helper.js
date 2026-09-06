import { useDispatch } from "react-redux"
import { removeUser } from "../store/userSlice"
import { removeFeed } from "../store/feedSlice"
import { removeRequests } from "../store/requestSlice"
import { removeConnections } from "../store/connectionsSlice"

export const clearStore = (dispatch)=>{
    dispatch(removeUser())
    dispatch(removeFeed())
    dispatch(removeRequests())
    dispatch(removeConnections())
}