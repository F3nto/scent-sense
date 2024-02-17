import React, {useState} from "react";
import { useForm } from "react-hook-form";
import myanmarData from "../myanmar.json";

const DeliveryInfo = () => {

    const { states, cities, townships } = myanmarData;

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
        console.log(data);
      };

      const [region, setRegion] = useState("");
      const [city, setCity] = useState("");
      const [township, setTownship] = useState("");
    
      const handleRegionChange = (e) => {
        setRegion(e.target.value);
        setCity(""); // Reset city when region changes
        setTownship(""); // Reset township when region changes
      };
    
      const handleCityChange = (e) => {
        setCity(e.target.value);
        setTownship(""); // Reset township when city changes
      };
    
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
            name="fullName"
            {...register("fullName", { required: true })}
            className={`mt-1 focus:ring-indigo-500 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                errors.fullName ? "border-red-500" : ""
              }`}
            placeholder="John Doe"
          />
           {errors.fullName && (
            <p className="text-sm text-red-500">Full Name is required</p>
          )}
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            {...register("PhNo", { required: true })}
            className={`mt-1 focus:ring-indigo-500 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                errors.PhNo ? "border-red-500" : ""
              }`}
            placeholder="+959123456789"
          />
           {errors.PhNo && (
            <p className="text-sm text-red-500">Phone number is required</p>
          )}
        </div>
        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-700">
            Region
          </label>
          <select
            id="region"
            name="region"
            value={region}
            onChange={handleRegionChange}
            className="mt-1 focus:ring-indigo-500 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">Select Region</option>
            {states.map((state) => (
              <option key={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        {region && (
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <select
              id="city"
              name="city"
              value={city}
              onChange={handleCityChange}
              className="mt-1 focus:ring-indigo-500 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            >
              <option value="">Select City</option>
              {cities[region].map((cityName) => (
                <option>
                  {cityName}
                </option>
              ))}
            </select>
          </div>
        )}
        {city && (
          <div>
            <label htmlFor="township" className="block text-sm font-medium text-gray-700">
              Township
            </label>
            <select
              id="township"
              name="township"
              value={township}
              onChange={(e) => setTownship(e.target.value)}
              className="mt-1 focus:ring-indigo-500 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            >
              <option value="">Select Township</option>
              {/* Populate townships based on the selected city */}
              {townships[city].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
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
            name="address"
            {...register("address", { required: true })}
            rows="3"
            className={`mt-1 focus:ring-indigo-500 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                errors.address ? "border-red-500" : ""
              }`}
            placeholder="123 Main St, Yangon, Myanmar"
          ></textarea>
           {errors.address && (
            <p className="text-sm text-red-500">Address is required</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-comTxt hover:bg-hovcolor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue to Shipping
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryInfo;
