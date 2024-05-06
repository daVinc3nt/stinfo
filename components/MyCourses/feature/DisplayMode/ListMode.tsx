import React, { useEffect, useState } from 'react';
import { CourseOperation, token } from '@/ambLib/amb';
import cookie from "js-cookie"



const myToken: token = {
  token: cookie.get("token"),
};

interface ListModeProps {
  CourseID: string;
  CourseName: string;
  Teacher: string;
  ClassID: string;
}


const ListMode: React.FC<ListModeProps> = ({ CourseID,CourseName,Teacher,ClassID}) => {

const [classID, setClassID] = useState<any>([]);
const fetchClassID = async (courseID: string) => {  
  try {
      const getClassIDAPI = new CourseOperation();
      const response12 = await getClassIDAPI.findClasses({ course_id: courseID }, myToken);
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
        <div className=" md:mx-20  w-full md:w-[75%]  bg-gray-200 rounded-md shadow-md hover:scale-105 duration-100 ease-in-out shadow-gray-300 relative overflow-hidden">
              <div className="grid grid-cols-4">
                <img src="https://th.bing.com/th/id/OIP.s5i4oFXbcoqebKq3ylnzqgHaHa?w=158&h=180&c=7&r=0&o=5&pid=1.7"  className="w-full h-full col-span-1 " />
                <div className='col-span-3 p-12'>
                  <div className="font-bold text-lg mb-2 px-10 md:px-20 mx-15 py-2">{CourseName}</div>
                  
                  <div >
                  {/* <div className='text-lg mb-2 px-20 mx-15 py-2'>{classID.course_type}</div> */}
                  <p> 
                    <span className="ml-20 mb-5 cursor-pointer text-blue-500 border-b border-blue-500 hover:border-transparent hover:bg-transparent"
                        onClick={() => handleLinkClick(ClassID)}>
                     Lớp:{ClassID}----- GV:{Teacher} 
                  </span>  
                </p>

                  <div className="  bg-teal-100 rounded-md absolute  top-2 left-2 p-2 w-[10]">
                          <div className="text-sm">MÃ MÔN:{CourseID}</div>
                          
                  </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default ListMode;
