
import MainInfo from "@/components/MyBiography/MainInfo"
import React from "react"
import ColorTabs from "@/components/MyBiography/ColorTabs"

const info = () => {
    return (
        <div>
             <div className=" p-3 justify-center items-end bg-gray-200 text-end text-2xl text-slate-700 ">
                <div className="mx-4">Thông tin sinh viên</div>
             </div>
             <div className="bg-white">
                <ColorTabs></ColorTabs>
             </div>
        </div>
    )
}

export default info 