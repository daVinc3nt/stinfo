
import MainInfo from "@/components/MyBiography/content/MainInfo"
import React from "react"
import ColorTabs from "@/components/MyBiography/ColorTabs"

const info = () => {
    return (
        <>
             <div className=" p-3 bg-gray-200 text-end text-2xl text-slate-700 ">Thông tin sinh viên</div>
             <div className="bg-white">
                <ColorTabs></ColorTabs>
             </div>
        </>
    )
}

export default info 