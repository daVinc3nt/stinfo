import React from "react";
import MyCourses from "@/components/MyCourses";
const elearning = () => {
    return (
        <div>   
           <div className=" bg-slate-400 border border-gray-200 shadow-sm rounded-sm 
                        w-full min-h-screen mt-12 mb-8 mr-6 ml-8">
                <div className="flex justify-start items-start font-bold">Tổng quan khoa học</div>  
                <MyCourses/>
           </div>
        </div>
    )
}
export default elearning