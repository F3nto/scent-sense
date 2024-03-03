import React, {useState} from "react";
import { useSelector } from "react-redux";
import {Logout, Person, ArrowForwardIos, PlaylistAddCheckCircle} from "@mui/icons-material"
import {useNavigate} from "react-router-dom"
import LogoutModal from "../Modal/LogoutModal";

const UserInfo = ({closeUserInfo}) => {
  const user = useSelector((state) => state.user?.userArr);
  const [showModal, setShowModal] = useState(false)

  const navigate = useNavigate()

  const goToMyAccount = () => {
    navigate("/my-account")
  }

  const goToOrderHistory = () => {
    navigate("/order-history")
  }

  const goToLogout = () => {
    setShowModal(true)
  }

  return (
    <>
    <div className="absolute z-10 w-60 top-28 right-0 mt-20 mr-6 bg-slate-200 rounded-md">
      <div className="bg-gradient-to-tr pb-5 relative flex px-0 justify-center items-center from-[#e6beae] via-blue-200 to-comTxt">
        <div className="absolute">
          <button className="bg-hovcolor w-10 h-10 rounded-full flex justify-center items-center">
            <text className="text-white text-xl font-fontbody">
              {user[0]?.name.charAt(0).toUpperCase()}
            </text>
          </button>

          
        </div>

        <div className="mt-16">
          <text className="text-sm font-fontbody text-comTxt">
            {user[0]?.email.split("@")[0]}
          </text>
        </div>
      </div>    

      <div className="mb-3 mt-3">
      
    
      <div onClick={() => goToMyAccount()} className="flex justify-between hover:bg-slate-300 cursor-pointer px-2 py-2 rounded-sm items-center mt-1 mx-2"> 
        <div className="flex items-center">
        <Person />
        <text className="font-fontbody pl-2">My Account</text>
        </div>
        <div>
        <ArrowForwardIos style={{width:"18px", height:"18px"}} />
        </div>
      </div>

      <div onClick = {() => goToOrderHistory()} className="flex justify-between hover:bg-slate-300 cursor-pointer px-2 py-2 rounded-sm items-center mt-1 mx-2"> 
        <div className="flex items-center">
        <PlaylistAddCheckCircle />
        <text className="font-fontbody pl-2">Order History</text>
        </div>
        <div>
        <ArrowForwardIos style={{width:"18px", height:"18px"}} />
        </div>
      </div>
      

      <div onClick={() => goToLogout()} className="flex justify-between hover:bg-slate-300 cursor-pointer px-2 py-2 rounded-sm items-center mt-1 mx-2"> 
        <div className="flex items-center">
        <Logout style = {{width:"22px", height:"22px"}} />
        <text className="font-fontbody pl-2">Logout</text>
        </div>
        <div>
        <ArrowForwardIos style={{width:"18px", height:"18px"}} />
        </div>
      </div>

      </div>
      </div>
      {
        showModal && 
        <LogoutModal closeUserInfo = {closeUserInfo} onClose={() => setShowModal(false)} />
      }
      </>
  );
};

export default UserInfo;
