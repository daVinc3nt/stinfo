import React from "react";
import SearchItem from "@/components/MyCourses/SearchItem";
import CoursesItem from "@/components/MyCourses/CoursesItem";
import Index from "@/components/MyCourses/Information/index";
const elearning = () => {
    return (  
        <>   
            <div>
           
            <div><SearchItem/></div>
            <div className="bg-wwhite rounded-md shadow-sm shadow-gray-400 p-10 mx-12 overflow-hidden border-b mb-4">
                <CoursesItem/>
                <div>
                    Mở
                    <button className="rounded-sm rounded-black bg-slate-200 min-w-[12%] h-[10%]">where </button>
                </div>
            </div>
            
            
            </div>
           
        </> 
        
  
    )
}
export default elearning