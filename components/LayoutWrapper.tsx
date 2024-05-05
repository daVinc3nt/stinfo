import React, { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import MobileMenu from "./NavigationBar/MobileMenu";
import {
  NotifyIcon,
  GlobseIcon
} from "../components/Icons"
import LangSelector from "@/components/LangSelector/LangSelector";
import { FaCarSide } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
interface LayoutProps {
  children: ReactNode;
}
//reactNode is a dataType of react, its can be JSX, 
//component or any fragment

const Wrapper = ({ children }: LayoutProps) => {
  const [toggleCollapseMobile, setToggleCollapseMobile] = useState(false);
  const handleSidebarToggleMobile = () => {
    setToggleCollapseMobile(!toggleCollapseMobile);
  };
  return (
    <div className=" flex">
      <div className="flex-1 flex flex-col h-screen">
        <div className="flex flex-col">
          <header className="h-14 flex justify-end w-full bg-blue-900 items-center px-3 xl:px-2">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="flex flex-row gap-2">
                  <LangSelector />
                  <NotifyIcon />
                </div>
              </div>
            </div>
          </header>
        </div>

        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
