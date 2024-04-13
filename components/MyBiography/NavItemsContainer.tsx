import Link from "next/link";
import React, { useState } from "react";
import { ContactInfo } from "@/components/MyBiography/content/ContactInfo";
import { MedicalInfo } from "@/components/MyBiography/content/MedicalInfo";


import { FaBars, FaTimes } from "react-icons/fa";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import PersonIcon from '@mui/icons-material/Person';
import CallEndIcon from '@mui/icons-material/CallEnd';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import FamilyInfo from "./content/FamilyInfo";

const NavItemsContainer = () => { 
  const [nav, setNav] = useState(false);
  const [currentPage, setCurrentPage] = useState(<ContactInfo />);
  
  const links = [
    { id: 1, component: <ContactInfo />, headline: "Thông tin cá nhân",    icon : <PersonIcon />, },
    { id: 2, component: <MedicalInfo />,  headline: "Thông tin y tế",       icon : <MedicalInformationIcon />, },
    { id: 3, component: <FamilyInfo />,   headline: "Thông tin liên lạc" ,  icon : <CallEndIcon />,},
    
  ];

  const handleClick = (component) => {
    setCurrentPage(component);
    setNav(false); 
  };

  return (
    <div className="flex flex-col min-h-screen w-full col-span-3 bg-violet-600 border-b ">
      <div className="bg-purple-300 px-4 text-white ">
        <div className="md:flex justify-end items-end h-12 text-sm md:h-14 ">
          <ul className="hidden md:flex">
            {links.map(({ id, headline, icon }) => (
              <li
                key={id}
                className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
                onClick={() => handleClick(links[id - 1].component)} 
              >
                <div className="flex items-center">
                  {icon} 
                  <div>{headline}</div> 
                </div>
              </li>
            ))}
          </ul>
          <div onClick={() => setNav(!nav)} className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden">
            {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
          </div>
        </div>
        {nav && (
          <ul className="md:hidden ">
            {links.map(({ id, headline, icon }) => (
              <li key={id} className="px-4 cursor-pointer capitalize py-6 text-2x1">
                <div onClick={() => handleClick(links[id - 1].component)}>
                  <div className="flex items-center">
                    {icon}
                    <div>{headline}</div> 
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex-none overflow-y-auto ">{currentPage}</div>
    </div>
  );
};

export default NavItemsContainer;


