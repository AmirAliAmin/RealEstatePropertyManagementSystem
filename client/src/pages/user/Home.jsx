import React from "react";
import { useNavigate } from "react-router-dom";
import homeImg from "../../assets/home.jpg";
import PropertyList from "./PropertyList";
import PropertySection from "../../components/PropertySection";


export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <div className="flex h-screen text-white bg-black">
        <div className="w-[100%] flex">
          <div className="w-[50%] text-white flex flex-col justify-center">
            <div className="w-[3%] rounded-4xl h-[7%] bg-amber-600 top-[150px] left-[270px] absolute"></div>
            <div
              className="top-[120px] absolute -rotate-90 z-1
                  before:content-[''] before:absolute before:-left-20 before:top-1/2 
                  before:w-20 before:h-[2px] before:bg-white before:-translate-y-1/2"
            >
              H O M E
            </div>
            <div className="w-[2%] rounded-4xl h-[4%] bg-amber-600 top-[145px] left-4 absolute"></div>

            <div className="relative w-[55%] mx-[80px]">
              <h1 className="font-extrabold text-[50px]">
                Discover Most Suitable Property
              </h1>
              <p>
                Find a veriety of properties that suit you very easily forget
                all difficulties in finding a residence for you
              </p>
            </div>
          </div>
          <div className="w-[50%] flex flex-col items-center justify-center">
            <img
              className="mt-25 w-[70%] h-[80%] border-5 text-gray-700 rounded-t-[250px]"
              src={homeImg}
              alt=""
            />
          </div>
        </div>
      </div>
      <PropertySection/>
    </div>
  );
}
