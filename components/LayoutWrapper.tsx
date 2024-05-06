import React, { ReactNode, useState } from "react";
import { motion, Variants } from "framer-motion";
import LangSelector from "@/components/LangSelector/LangSelector";
import { FaCarSide } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import DetailStaff from "./Common/PopUp";
import { useRouter } from "next/router";
import { Logout } from "./Logout";
import classNames from "classnames";
import { LogoutOutlined } from "@mui/icons-material";
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
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className=" flex">
      <div className="flex-1 flex flex-col h-screen">
        <div className="flex flex-col">
          <header className="h-16 flex w-full p-4 justify-between bg-blue-900 items-center px-3 xl:px-2">
                  <div className="flex gap-5 items-center">
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
                    <div className="mr-5 relative ring-2 ring-white flex w-12 h-12  rounded-full overflow-hidden transition-all duration-500 cursor-pointer">
                        <motion.img
                          variants={leftSideVariant}
                          initial="initial"
                          animate="enter"
                          exit="exit"
                          transition={{ duration: 0.7 }}
                          className="w-full h-full active:scale-125 ring-2 ring-gray-500 object-cover"
                          src={"./SunGlass.jpg"}
                          onClick={() =>setModalIsOpen(true)}
                        />
                    </div>
                  </div>
                  <button
                    onClick={() => Logout(router)}
                    className="flex py-4 h-12 items-center rounded-xl px-2.5 w-fit text-[#545e7b] hover:bg-gray-300 hover:text-[#e1201c] dark:text-gray-400">
                      <div style={{ width: "2.5rem" }}>
                        <LogoutOutlined />
                      </div>
                      <span
                        className={classNames(
                          "text-xs lg:text-lg font-medium rounded-xl pl-2"
                        )}
                      >
                        Thoát
                      </span>
                  </button>
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
