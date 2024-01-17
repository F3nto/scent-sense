  import React, { useState, useEffect, useMemo } from "react";
  import { useNavigate } from "react-router-dom";
  import { ShoppingCart, Person, Favorite } from "@mui/icons-material";
  import Drawer from "./Drawer/Drawer";
  import SignUpAndLogin from "../Auth/SignUpAndLogin";
  import FavoriteModal from "../Modal/FavoriteModal";
  import { useDispatch, useSelector } from "react-redux";
  import { addToSearch } from "../Redux/features/SearchSlide";
  import axios from "axios";

  const Header = () => {
    const [isClickMenu, setIsClickMenu] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isFavModalOpen, setIsFavModalOpen] = useState(false);
    const [searchTxt, setSearchTxt] = useState("");
    const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
    

    const wishListQty = useSelector((state) => state.wishList?.wishListArr);
    const cartQty = useSelector((state) => state.cart?.cartArr);
    const searchData = useSelector((state) => state.search.searchArr);

    const dispatch = useDispatch();

    const openAuthModal = () => {
      setIsAuthModalOpen(true);
    };

    const openFavModal = () => {
      setIsFavModalOpen(true);
    };

    const handleClickMenu = () => {
      setIsClickMenu((prev) => !prev);
    };

    const closeDrawer = () => {
      setIsClickMenu(false);
    };

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 768) {
          setIsClickMenu(false);
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const navigate = useNavigate();
    const shoppingCartHandler = () => {
      const url = `/shopping-cart`;

      navigate(url);
    };

    const allSearchData = useMemo(() => [...searchData], [searchData]);
    console.log("all search data", allSearchData);

    useEffect(() => {
      const url = "http://localhost:4000/api/v1/all-products";

      axios
        .get(url)
        .then((res) => {
          const uniqueProducts = Array.from(
            new Set(res.data.map((product) => product._id))
          ).map((id) => res.data.find((product) => product._id === id));

          dispatch(addToSearch(uniqueProducts));
        })
        .catch((err) => {
          console.err(err);
        });
    }, [dispatch]);

    const searchSuggest = useMemo(() => {
      const trimmedSearchTxt = searchTxt.trim().toLowerCase();

      if (trimmedSearchTxt === "") {
        return [];
      } else {
        const uniqueSuggestions = new Set();
        const startsWithSearch = [];
        const containSearch = [];

        allSearchData.forEach((item) => {
          const itemName = item.name.toLowerCase();

          if (
            itemName.startsWith(trimmedSearchTxt) &&
            !uniqueSuggestions.has(itemName)
          ) {
            startsWithSearch.push(item);
            uniqueSuggestions.add(itemName);
          } else if (
            itemName.includes(trimmedSearchTxt) &&
            !uniqueSuggestions.has(itemName)
          ) {
            containSearch.push(item);
            uniqueSuggestions.add(itemName);
          }
        });

        return [...startsWithSearch, ...containSearch];
      }
    }, [searchTxt, allSearchData]);

    const handleAutoComplete = (event) => {
      setSearchTxt(event.target.value);
      setSelectedSuggestion(-1);
     
    };

    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();

        setSelectedSuggestion((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedSuggestion((prev) =>
          prev < searchSuggest.length - 1 ? prev + 1 : prev
        );
      } else if (event.key === "Enter") {
        event.preventDefault();

        if (selectedSuggestion !== -1) {
          console.log("Navigate to:", searchSuggest[selectedSuggestion]);
        } else {
          console.log("Perform search:", searchTxt);
        }
      }
    };

    return (
      <>
        <div className="flex bg-header p-7 ">
          <span className="font-fontbody pl-5">Welcome to Scent-sense</span>
        </div>
        <div className="flex justify-between items-center mx-4 md:mx-12 mt-4 relative">
          <div>
            <img
              className="object-cover w-48 md:sm:w-60"
              src={require("../Assets/images/officiallogo.png")}
              alt=""
            />
          </div>
          <div className="items-center relative hidden md:sm:flex">
            <input
              className="border-2 border-slate-300 relative rounded-xl h-10 px-4 w-96 outline-none"
              placeholder="Search..."
              value={searchTxt}
              onChange={(event) => handleAutoComplete(event)}
              onKeyDown={handleKeyDown}
            
             
            />
            {searchSuggest.length > 0 && (
              <div className="absolute top-8 z-50 mt-2 w-80 bg-slate-300 border border-gray-300 rounded-br-md rounded-bl-md shadow-lg">
                {searchSuggest.map((suggestion, index) => (
                  <button
                    key={suggestion._id}
                    className={`block w-full px-4 py-2 text-left hover:text-white ${
                      index === selectedSuggestion ? "bg-hovcolor text-white" : ""
                    }`}
                    onMouseEnter={() => setSelectedSuggestion(index)}
                    onClick={() => console.log("Selected:", suggestion)}
                  >
                    {suggestion.name}
                  </button>
                ))}
              </div>
            )}
            <button className="absolute right-0 bg-header py-2 px-5 rounded-tr-xl rounded-br-xl">
              <img
                className="w-6 h-6"
                src={require("../Assets/icons/search.png")}
                alt=""
              />
            </button>
          </div>
          <div className="px-3 hidden md:sm:flex">
            <button
              onClick={() => openFavModal()}
              className="relative text-slate-600"
            >
              <Favorite style={{ width: "40px", height: "35px" }} />
              {wishListQty.length > 0 ? (
                <div className="absolute -top-3 -right-3 shadow-slate-500 shadow-sm w-7 h-7 flex items-center justify-center rounded-full bg-hovcolor">
                  <text className="text-white font-fontbody text-sm">
                    {wishListQty.length}
                  </text>
                </div>
              ) : (
                ""
              )}
            </button>
            <button
              onClick={() => shoppingCartHandler()}
              className="px-6 relative text-slate-600"
            >
              <ShoppingCart style={{ width: "40px", height: "35px" }} />
              {cartQty.length > 0 ? (
                <div className="absolute -top-3 right-3 shadow-slate-500 shadow-sm w-7 h-7 flex items-center justify-center rounded-full bg-hovcolor">
                  <text className="text-white font-fontbody text-sm">
                    {cartQty.length}
                  </text>
                </div>
              ) : (
                ""
              )}
            </button>
            <button onClick={() => openAuthModal()} className="text-slate-600">
              <Person style={{ width: "40px", height: "40px" }} />
            </button>
          </div>
          <div className="flex md:ml-32 sm:ml-20 md:sm:hidden">
            <div className="w-12 h-12 rounded-full bg-white hover:bg-header flex justify-center items-center shadow-lg hover:shadow-lg shadow-header">
              <img
                className="w-6 h-6"
                src={require("../Assets/icons/search.png")}
                alt=""
              />
            </div>
          </div>
          <div className="flex md:sm:hidden mr-5">
            <div
              className={`
            ${
              isClickMenu
                ? "bg-header flex justify-center items-center w-12 h-12 rounded-full"
                : "w-12 h-12 rounded-full bg-white hover:bg-header flex justify-center items-center shadow-lg hover:shadow-lg shadow-header"
            }`}
            >
              <button
                onClick={() => handleClickMenu()}
                className="humbuger-menu flex flex-col items-end p-4 focus:outline-none"
              >
                <div
                  className={`h-1 w-7 my-0.5 rounded-md bg-slate-700 transition-transform duration-500 ease-in-out
              ${isClickMenu ? "transform rotate-45 translate-y-2" : ""}`}
                ></div>

                <div
                  className={`h-1 w-7 my-0.5 rounded-md bg-slate-700 transition-opacity duration-700 ease-in-out
              ${isClickMenu ? "opacity-0" : "opacity-100"}`}
                ></div>

                <div
                  className={`h-1 w-7 my-0.5 rounded-md bg-slate-700 transition-transform duration-500 ease-in-out
              ${isClickMenu ? "transform -rotate-45 -translate-y-2" : ""}`}
                ></div>
              </button>
            </div>
          </div>
          {isClickMenu ? <Drawer onClose={() => closeDrawer()} /> : null}
          {isAuthModalOpen ? (
            <div>
              <SignUpAndLogin onClose={() => setIsAuthModalOpen(false)} />
            </div>
          ) : null}
        </div>
        {isFavModalOpen ? (
          <FavoriteModal onClose={() => setIsFavModalOpen(false)} />
        ) : null}
      </>
    );
  };

  export default Header;
