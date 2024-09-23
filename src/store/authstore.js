// import {create} from 'zustand';

// import axios from 'axios';

// const API_URL = "http://localhost:2900/api/auth"

// export const useAuth =  create((set)=>({
//     user:null,
//     isAuthenticated: false,
//     error:null,
//     loading:false,
//     isCheckingAuth:true,

//     signup : async(firstName, lastName, email, password)=>{
//         set({loading:true,error:null})
//         try {
//             await axios.post(`${API_URL}/register`, {firstName, lastName, email, password})
//             set({user:Response.user.data, isAuthenticated:true, loading:true})
//         } catch (error) {
//             set({error:error.response.data.message || "Error signing up", loading:false})
//             throw error
//         }
//     }
// }))