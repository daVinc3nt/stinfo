import React, { useEffect, useState } from 'react';
import { CourseOperation, token } from '@/ambLib/amb';

interface ListModeProps {
  CourseID: string;
}
const Token: token = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiMjQyNDMwMDQiLCJyb2xlIjoiU2luaCB2acOqbiIsImFjdGl2ZSI6MSwiaWF0IjoxNzE0OTM0MzgwLCJleHAiOjE3MTQ5NzAzODB9.7q6MNxpqPqdOjdfo8Sm7ih44Yn--375U-Ws_PNn1gsg"
}


const ListMode: React.FC<ListModeProps> = ({ CourseID}) => {

const [classID, setClassID] = useState<any>([]);
const fetchClassID = async (courseID: string) => {  
  try {
      const getClassIDAPI = new CourseOperation();
      const response12 = await getClassIDAPI.findClasses({ course_id: courseID }, {token: null});
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
        <div className=" mx-20 w-[75%]  bg-gray-200 rounded-md shadow-md hover:scale-105 duration-100 ease-in-out shadow-gray-300 relative overflow-hidden">
              <div className="grid grid-cols-4">
                <img src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"  className="w-full h-full col-span-1 " />
                <div className='col-span-3'>
                  <div className="font-bold text-lg mb-2 px-20 mx-15 py-2">{classID.course_name}</div>
                  
                  <div className=''>
                  <div className='text-lg mb-2 px-20 mx-15 py-2'>{classID.course_type}</div>
                  <p> 
                    <span className="ml-20 mb-5 cursor-pointer text-blue-500 border-b border-blue-500 hover:border-transparent hover:bg-transparent"
                        onClick={() => handleLinkClick(classID.class_id)}>
                     {classID.course_id}-----{classID.class_id} 
                  </span>  
                </p>

                  <div className="  bg-teal-100 rounded-md absolute  top-2 left-2 p-2 w-[10]">
                          <div className="text-sm">{classID.faculty}</div>
                          
                  </div>

                  </div>
                  
                </div>
              </div>   
        </div>
    )
}

export default ListMode;
