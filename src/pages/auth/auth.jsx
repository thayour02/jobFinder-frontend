import { useContext } from "react";
import { GlobalContext } from "../../context";
import SignUp from "../auth/sign";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import  tayo  from "../../assets/react.svg"
import './style.css'


export default function Auth(){
    const {user} = useSelector((state)=> state.user)
    const {open, setOpen} = useContext(GlobalContext)

    const location = useLocation();

    let from = location?.state?.from?.pathname ?? "/";
  
    if (user?.token) {
      return window.location.replace(from);
    }

    return (
            <div className="w-full -mb-40 items-center flex justify-center relative bg-black bg-opacity-25">
             <div  className="absolute">
             {/* <img src={tayo} alt="" className="w-full"/> */}
             </div>
             <div>
             <SignUp open={open} setOpen={setOpen} />
             </div>
            </div>
    )
}

