import { createSlice } from "@reduxjs/toolkit";

const feedSlice  = createSlice({
    name:"Feed",
    initialState:null,
    reducers:{
        addFeed : (state,action)=>{
            return action.payload
        },
        removeFeed : ()=>{
            return null
        },
        removeUserFromFeed : (state,action)=>{
            const newList = state.filter((user)=>user._id !== action.payload)
            return newList
        }
    }
})


export const {addFeed, removeFeed, removeUserFromFeed} = feedSlice.actions
export default feedSlice.reducer