import React, { useEffect, useState } from 'react';
import { Course, CustomLink } from '../../content/coursesData';
import { CourseOperation, token } from '@/ambLib/amb';

interface ListModeProps {
  CourseID: string;
  CourseName: string;
  Faculty: string;
  CourseType?: string;
  ClassID: string;
}
const Token: token = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFjaGVyX2lkIjoiR1Y1MzU4NyIsInJvbGUiOiJHaeG6o25nIHZpw6puIiwiYWN0aXZlIjoxLCJpYXQiOjE3MTQ5MjI1MTAsImV4cCI6MTcxNDk1ODUxMH0.w43xyP55fcXuk8g4Nu37IUeKTPljOOXGiEivacgbq_o"
}


const ListMode: React.FC<ListModeProps> = ({ CourseID, CourseName, CourseType, Faculty, ClassID }) => {

  const [classID, setClassID] = useState<any>(null)

  const fetchClassID = async () => {
    try {
      const getClassIDAPI = new CourseOperation();
      const response = await getClassIDAPI.findClasses({ course_id: String(CourseID) }, Token);
      console.log("Course data :", response.data);
      setClassID(response.data);

    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };
  useEffect(() => {
    fetchClassID;
  }, []);

  const handleLinkClick = (link: string) => {
    const url = `./class_info?class_id=${classID}`;
    window.open(url, '_blank');
  };

  return (
    <div className=" mx-20 w-[75%]  bg-gray-200 rounded-md shadow-md hover:scale-105 duration-100 ease-in-out shadow-gray-300 relative overflow-hidden">
      <div className="grid grid-cols-4">
        <img src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg" className="w-full h-full col-span-1 " />
        <div className='col-span-3'>
          <div className="font-bold text-lg mb-2 px-20 mx-15 py-2">{CourseName}</div>

          <div className=''>
            <div className='text-lg mb-2 px-20 mx-15 py-2'>{CourseType}</div>
            <p>
              <span className="ml-20 mb-5 cursor-pointer text-blue-500 border-b border-blue-500 hover:border-transparent hover:bg-transparent"
                onClick={() => handleLinkClick(ClassID)}>
                {ClassID}-{CourseID}
              </span>
            </p>

            <div className="  bg-teal-100 rounded-md absolute  top-2 left-2 p-2 w-[10]">
              <div className="text-sm">{Faculty}</div>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default ListMode;
