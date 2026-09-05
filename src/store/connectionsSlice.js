import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:"Connections",
    initialState:null,
    reducers:{
        addConnections :(state,action)=>{
            return action.payload
        },
        removeConnection :(state,action)=>{
            const newList = state.filter((connection)=>connection._id !== action.payload)
            return newList
        }
    }
})

export const{addConnections, removeConnection} = connectionSlice.actions
export default connectionSlice.reducer