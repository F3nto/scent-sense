import React from "react";
import { ShoppingCart, Person, Favorite} from "@mui/icons-material";

const Header = () => {
  return (
    <>
      <div className="flex bg-header p-7">
        <span className="font-fontbody pl-5">Welcome to Scent sense.</span>
      </div>
      <div className="flex justify-between items-center mx-12 mt-4">
        <div>
          <img
            className="object-cover w-60"
            src={require("../Assets/images/officiallogo.png")}
            alt=""
          />
        </div>
        <div className="flex items-center relative">
          <input
            className="border-2 border-slate-300 rounded-xl w-96 h-10 px-4"
            type="text"
            placeholder="Search..."
          />
          <button className="absolute right-0 bg-header py-2 px-5 rounded-tr-xl rounded-br-xl">
            <img
              className="w-6 h-6"
              src={require("../Assets/icons/search.png")}
              alt=""
            />
          </button>
        </div>
        <div className="px-3">
        <button>
            <Favorite style={{width:"40px", height:"35px"}} />
            
          </button>
          <button className="px-6">
            <ShoppingCart style={{width:"40px", height:"35px"}} />
            
          </button>
          <button>
          <Person style={{width:"40px", height:"40px"}}  />
          </button>
        </div>
      </div>
    </> 
  );
};

export default Header;
