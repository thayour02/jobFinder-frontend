import { createSlice } from "@reduxjs/toolkit";
// import { users } from "../utils/data";


const initialState = {
    user: JSON.parse(window?.localStorage.getItem('userInfo')) ?? {}
}
const userSlice = createSlice({
    name:'userInfo',
    initialState,
    reducers:{
        login(state,action){
            state.user = action.payload.user
        },
        logOut(state){
            state.user=null;
            localStorage?.removeItem('userInfo')
        }
    }

})

export default userSlice.reducer;

export function Login(user){
    return(dispatch)=>{
        dispatch(userSlice.actions.login({
            user}))
    }
}

export function LogOut(){
    return(dispatch)=>{
        dispatch(userSlice.actions.logOut())
    }
}