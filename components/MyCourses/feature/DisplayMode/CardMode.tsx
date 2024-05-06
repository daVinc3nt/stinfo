// import React, { useEffect, useState } from 'react';
// import { CourseID, CourseOperation, UpdatingCourseInfo, token } from "@/ambLib/amb";
// import { Course, CustomLink } from '../../content/coursesData';

import { useEffect, useState } from "react";
import MyClass from "../../MyClass/content/MyClass";
import { ClassID, CourseOperation, token } from "@/ambLib/amb";
import { Link, Route } from "lucide-react";





interface CardModeProps {
  CourseID: string;
  // CourseName: string;
  // Faculty: string;
  // CourseType?: string;
  // ClassID: string;

}
const Token: token = {
  token:  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiMjQyNDMwMDQiLCJyb2xlIjoiU2luaCB2acOqbiIsImFjdGl2ZSI6MSwiaWF0IjoxNzE0OTY2MDIwLCJleHAiOjE3MTUwMDIwMjB9.sX-xyPVY4JT-QFA2ePVGTuCciKMHzHDtd80vCF2tBrU"
}


const CardMode: React.FC<CardModeProps> = ({ CourseID}) => {

const [classID, setClassID] = useState<any>([]);
const fetchClassID = async (courseID: string) => {  
  try {
      const getClassIDAPI = new CourseOperation();
      const response12 = await getClassIDAPI.findClasses({ course_id: courseID }, Token);
      console.log(response12.data)
      setClassID(response12.data[0]);
  } catch (error) {
      console.error("Error fetching class data:", error);
  }
};
useEffect(() => {
  fetchClassID(CourseID);  
}, []);

const handleLinkClick = (ClassID_input:string) => {
  const url = `./class_info?class_id=${ClassID_input}`;
  window.open(url, '_blank');
};


    return (
      <div>
        {classID && (
          <div className="bg-gray-200 rounded-md shadow-md hover:scale-105 duration-100 ease-in-out shadow-gray-300 relative overflow-hidden">
          <img src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"  className="w-full" />
          <div className="p-4 text-black">
              <div className="flex justify-between items-center">
                  <div className="font-bold text-lg mb-2">{classID.course_name}-{classID.course_id} </div>
                  <div className="font-bold text-lg mb-2 text-blue-400">{classID.course_type}</div>
              </div>
                <button>
                  <span className="cursor-pointer text-blue-500 border-b border-blue-500 hover:border-transparent hover:bg-transparent" 
                  onClick={() => handleLinkClick(classID.class_id)}>
                      {classID.course_id}-----{classID.class_id} 
                  </span>
                </button>
                 <div className="flex justify-between items-center bg-teal-100 rounded-md absolute top-2 left-2 p-2 w-2/3">
                 <div className="text-sm">{classID.faculty}</div>
                 
                 </div>
          </div>
      </div>
        )}
      </div>
    )
}


export default CardMode;









  
 
