import React, { ReactNode, useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  NotifyIcon,
  GlobseIcon
} from "../components/Icons"
import Image from "next/image";
import LangSelector from "@/components/LangSelector/LangSelector";
import { FaCarSide } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import DetailStaff from "./Common/PopUp";
interface LayoutProps {
  children: ReactNode;
}
//reactNode is a dataType of react, its can be JSX, 
//component or any fragment

const Wrapper = ({ children }: LayoutProps) => {
  const leftSideVariant: Variants = {
    initial: { x: 20, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  };
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className=" flex">
      <div className="flex-1 flex flex-col h-screen">
        <div className="flex flex-col">
          <header className="h-16 flex w-full p-4 justify-between bg-blue-900 items-center px-3 xl:px-2">
                  <motion.img
                    variants={leftSideVariant}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    transition={{ duration: 0.7 }}
                    className="rounded-xl p-2 hidden place-items-start lg:block bg-white shadow-inner shadow-gray-400 "
                    src={"/bk_name_vi.png"}
                    alt=""
                    width="250"
                    height="250"
                  />
                  <div className="mr-5 relative ring-2 ring-white flex w-10 h-10 rounded-full overflow-hidden transition-all duration-500 cursor-pointer">
                      <motion.img
                        variants={leftSideVariant}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        transition={{ duration: 0.7 }}
                        className="w-full h-full ring-2 ring-gray-500 object-cover"
                        src={"./SunGlass.jpg"}
                        onClick={() =>setModalIsOpen(true)}
                      />
                  </div>
          </header>
        </div>
        {modalIsOpen && <DetailStaff onClose={closeModal}/>}
        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
