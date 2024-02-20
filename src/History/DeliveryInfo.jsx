import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import myanmarData from "../myanmar.json";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axios from "axios";

const DeliveryInfo = ({ onFormCompletionChange, allTotal }) => {
  const { states, cities } = myanmarData;

  const cart = useSelector((state) => state.cart?.cartArr);
  const user = useSelector((state) => state.user?.userArr[0]);

  const [isLoading, setIsLoading] = useState(false);

  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [phNo, setPhNo] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const myanmarPhoneMask = "+(99) 999-999";

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setCity("");
  };

  const handleCityChange = (event) => {
    const newCity = event.target.value;
    setCity(newCity);
  };

  const handleAddressChange = (event) => {
    const newAddress = event.target.value;
    setAddress(newAddress);
  };

  const submitForm = () => {
    const formErrors = {};
    // Custom validation
    if (!name.trim()) {
      formErrors.name = "Full Name is required";
    }
    if (!region.trim()) {
      formErrors.region = "Region is required";
    }
    if (!city.trim()) {
      formErrors.city = "City is required";
    }
    if (!address.trim()) {
      formErrors.address = "Address is required";
    }

    if (Object.keys(formErrors).length === 0) {
      setErrors({});
    } else {
      setErrors(formErrors);
      onFormCompletionChange(false);
    }
  };

  const mutation = useMutation({
    mutationFn: (cart) => {
      console.log("cart", cart);
      return axios.post(`http://localhost:4000/api/v1/order-list`, {
        userId: user._id,
        items: cart.map((item) => ({
          productId: item._id,
          img: item.img,
          name: item.name,
          quantity: item.qty,
          price: item.price,
          size: item.size,
        })),
        totalPrice: allTotal,
        address: address,
        city: city,
        phone: phNo,
      });
    },
    onSuccess: (data) => {
      if (data && data.data && data.data.success) {
        setTimeout(() => {
          setIsLoading(false);
          onFormCompletionChange(true);
        }, 1800);
      }
    },
  });

  const handleConfirm = () => {
    submitForm();
    setIsLoading(true);
    mutation.mutate(cart);
  };

  const LoadingDots = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
      <>
        <span className="dot-load">.</span>
        <span className="dot-load">.</span>
        <span className="dot-load">.</span>
      </>
    );
  };

  useEffect(() => {
    submitForm();
  }, [name, phNo, region, city, address]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-black shadow-sm mt-10">
      <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
      <form className="space-y-4" onSubmit={submitForm}>
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-1 focus:ring-indigo-500 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <PhoneInput
            country="mm"
            mask={myanmarPhoneMask}
            countryCodeEditable={false}
            value={phNo}
            onChange={(value, data) => {
              if (value.length === 12) {
                setErrors({});
                setPhNo(value);
              } else {
                setErrors({ phNo: "Phone number must be 9 digit" });
              }
            }}
            placeholder="Enter phone number"
            className={`mt-1 focus:ring-indigo-500 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
              errors.phNo ? "border-red-500" : ""
            }`}
          />
          {errors.phNo && <p className="text-sm text-red-500">{errors.phNo}</p>}
        </div>
        <div>
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700"
          >
            Region
          </label>
          <select
            id="region"
            value={region}
            onChange={handleRegionChange}
            className={`mt-1 focus:ring-indigo-500 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
              errors.region ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Region</option>
            {states.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>
          {errors.region && (
            <p className="text-sm text-red-500">{errors.region}</p>
          )}
        </div>
        {region && (
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <select
              id="city"
              value={city}
              onChange={handleCityChange}
              className={`mt-1 focus:ring-indigo-500 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                errors.city ? "border-red-500" : ""
              }`}
            >
              <option value="">Select City</option>
              {cities[region].map((cityName) => (
                <option key={cityName}>{cityName}</option>
              ))}
            </select>
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city}</p>
            )}
          </div>
        )}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={handleAddressChange}
            className={`mt-1 focus:ring-indigo-500 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
              errors.address ? "border-red-500" : ""
            }`}
            rows="3"
            placeholder="123 Main St, Yangon, Myanmar"
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address}</p>
          )}
        </div>
        <button
          type="button"
          className="mt-4 inline-flex items-center px-4 py-2 bg-hovcolor text-comTxt hover:text-white font-bold rounded-md hover:bg-comTxt"
          onClick={handleConfirm}
          disabled={Object.keys(errors).length > 0 || isLoading} // Disable if errors exist
        >
          {isLoading ? (
            <>
              Loading <LoadingDots isLoading={isLoading} />
            </>
          ) : (
            "Confirm Delivery Information"
          )}
        </button>
      </form>
    </div>
  );
};

export default DeliveryInfo;
