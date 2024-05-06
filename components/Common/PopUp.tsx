import React, { useRef, useEffect, useState, ReactNode } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaTrash, FaPen } from "react-icons/fa";
import { User, Pencil } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { RiImageEditLine } from "react-icons/ri";
import { useRouter } from "next/router";
import NotiPopup from "./NotiPopup";
import cookie from "js-cookie"
import { StudentOperation, TeacherOperation, UpdatingPassword, token } from "@/ambLib/amb";
const KeyCanEdit = ["fullname", "email"]

interface Props {
  onClose: () => void;

}
const leftSideVariant: Variants = {
  initial: { x: 20, opacity: 0 },
  enter: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
};
const DetailStaff: React.FC<Props> = ({ onClose }) => {
  const teach = new TeacherOperation()
  const stud = new StudentOperation()
  const [message, setMessage] = useState("");
  const [NotiIsOpen, setNotiIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);


  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
  };
  const [updateData, setupdateData] = useState({
    username: "",
    password: "",
    new_password: ""
  });

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const x = "staff_id"
    const myToken: token = {
      token: cookie.get("token"),
    };
    await stud.updatePassword(updateData)
    await teach.updatePassword(updateData,  myToken)
    location.reload()
    setIsEditing(false);
  };
  const handleUpdateData =(e, key:string, input:string = "string") => {
    if (input == "number")
      setupdateData({...updateData, [key]: parseInt(e.target.value)});
    else 
      setupdateData({...updateData, [key]: e.target.value});
  }
  function openNoti() {
    setNotiIsOpen(true);
  }
  const handleChangePassword = async () => {
    const myToken: token = {
      token: cookie.get("token"),
    };
    try {
      const reponse1= await teach.updatePassword(updateData, myToken);
      const reponse2= await stud.updatePassword(updateData);
      // console.log("reponse", reponse);
      if (reponse1.error === false || reponse2.error === false) {
        setMessage("Đổi mật khẩu thành công");
        openNoti();
      } else {
        setMessage("Đổi mật khẩu thất bại \n");
        openNoti();
      }
    } catch (e) {
      setMessage(e);
      openNoti();
    }
  };
  return (
    <>
      <motion.div
        className={`fixed  top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-[#545e7b]`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={handleAnimationComplete}
        style={{
          backdropFilter: "blur(12px)",
        }}
      >
        <motion.div
          ref={notificationRef}
          className={`relative w-fit bg-white rounded-xl p-4 overflow-y-auto
            ${isShaking ? "animate-shake" : ""}`}
          initial={{ scale: 0 }}
          animate={{ scale: isVisible ? 1 : 0 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative items-center justify-center flex-col flex h-5 w-full">
            <Button
              className="absolute right-0 w-8 h-8 rounded-full mb-2 hover:bg-gray-300"
              onClick={handleClose}
            >
              <IoMdClose className="w-5/6 h-5/6 " />
            </Button>
          </div>
          {NotiIsOpen && <NotiPopup onClose={() =>setNotiIsOpen(false)} message={message} />}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
            <div className="flex flex-col items-center gap-5">
              <div className="flex items-center flex-col w-fit">
                <div className="flex flex-col w-fit  text-xs font-base gap-3">
                  <div>
                      Tài khoản
                  </div>
                  
                  <input
                    type="text"
                    onChange={(e) =>
                      setupdateData({
                        ...updateData,
                        username: e.target.value,
                      })
                    }
                    className="w-full flex place-content-center h-8 border pl-2  hover:bg-gray-100 focus:bg-slate-200 rounded-md py-2 hover:border-gray-500 hover:shadow-md focus:outline-none "
                  />
                  <div>
                    Mật khẩu hiện tại
                  </div>
                  
                  <input
                    type="password"
                    onChange={(e) =>
                      setupdateData({
                        ...updateData,
                        password: e.target.value,
                      })
                    }
                    className="w-full flex place-content-center h-8 border pl-2  hover:bg-gray-100 focus:bg-slate-200 rounded-md py-2 hover:border-gray-500 hover:shadow-md focus:outline-none "
                  />

                  <div>
                    Mật khẩu mới
                  </div>
                  <input
                    type="password"
                    onChange={(e) =>
                      setupdateData({
                        ...updateData,
                        new_password: e.target.value,
                      })
                    }
                    className="w-full flex place-content-center h-8 border pl-2  hover:bg-gray-100  focus:bg-slate-200 rounded-md py-2 hover:border-gray-500 hover:shadow-md focus:outline-none "
                  />
                </div>
                <div className="flex mt-3 w-fit place-content-center">
                  <button
                    onClick={handleChangePassword}
                    className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                  >
                    Xác nhận đổi mật khẩu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default DetailStaff;