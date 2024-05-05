// import React, { useEffect, useState } from 'react';
// import { CourseID, CourseOperation, UpdatingCourseInfo, token } from "@/ambLib/amb";
// import { Course, CustomLink } from '../../content/coursesData';

import { useEffect, useState } from "react";
import MyClass from "../../MyClass/content/MyClass";
import { ClassID, CourseOperation, token } from "@/ambLib/amb";
import { Link, Route } from "lucide-react";





interface CardModeProps {
  CourseID: string;
  CourseName: string;
  Faculty: string;
  CourseType?: string;
  ClassID: string;
}
const Token: token = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiMjQyNDMwMDQiLCJyb2xlIjoiU2luaCB2acOqbiIsImFjdGl2ZSI6MSwiaWF0IjoxNzE0ODcyMzY3LCJleHAiOjE3MTQ5MDgzNjd9.o50Hf3kubpLcfes8dUpYpnFekKIBJP2B7ks1G8vJXNg"
}


const CardMode: React.FC<CardModeProps> = ({ CourseID,CourseName,CourseType,Faculty,ClassID}) => {
  

const handleLinkClick = (link: string) => {
  const url = `./class_info?class_id=${ClassID}`;
  window.open(url, '_blank');
};


    return (
        <div className="bg-gray-200 rounded-md shadow-md hover:scale-105 duration-100 ease-in-out shadow-gray-300 relative overflow-hidden">
            <img src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"  className="w-full" />
            <div className="p-4 text-black">
                <div className="flex justify-between items-center">
                    <div className="font-bold text-lg mb-2">{CourseName}-{CourseID} </div>
                    <div className="font-bold text-lg mb-2 text-blue-400">{CourseType}</div>
                </div>
                  <button>
                    <span className="cursor-pointer text-blue-500 border-b border-blue-500 hover:border-transparent hover:bg-transparent" 
                    onClick={() => handleLinkClick(CourseID)}>
                        {ClassID}-{CourseID} 
                    </span>
                  </button>
                   <div className="flex justify-between items-center bg-teal-100 rounded-md absolute top-2 left-2 p-2 w-2/3">
                   <div className="text-sm">{Faculty}</div>
                   
                   </div>
            </div>
        </div>
    )
}


export default CardMode;









  
 