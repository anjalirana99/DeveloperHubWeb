import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"Request",
    initialState:null,
    reducers:{
        addRequests:(state,action)=>{
            return action.payload
        },
        removeRequest :(state,action)=>{
            const newList = state.filter((request)=>request._id !== action.payload)
            return newList
        }
    }
})

export const {addRequests, removeRequest} = requestSlice.actions
export default requestSlice.reducer