import React, { useEffect, useState } from 'react';
import { CourseID, CourseOperation, UpdatingCourseInfo, token } from "@/ambLib/amb";
// import { Course, CustomLink } from '../../content/coursesData';






interface CardModeProps {
  CourseID: CourseID;
}
const Course_Info : UpdatingCourseInfo = {}
const Token: token = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiMjQyNDMwMDQiLCJyb2xlIjoiU2luaCB2acOqbiIsImFjdGl2ZSI6MSwiaWF0IjoxNzE0NzM1MTk4LCJleHAiOjE3MTQ3NzExOTh9.KwlMV9vDysyDZB-GYdac4u7fZKceaQyPAbugep71mKU"
}
const CardMode: React.FC<CardModeProps> = ({ CourseID }) => {


  const handleLinkClick = (link: string) => {
    window.open(link, '_blank'); // Mở đường dẫn trong cửa sổ mới khi click vào link
  };
  
const [courseData, setCoursesData] = useState<any>(null)
const getCourseData = async () => {
  try {
      const getCourseDataAPI = new CourseOperation();
      const response = await getCourseDataAPI.findAllCourses(Course_Info,Token);
      console.log("Full response:", response); 
      console.log("Teacher data:", response.data); 
      setCoursesData(response.data); 
    }catch (error) {
      console.error("Error fetching teacher data:", error);
    }
};

  useEffect(() => {
  getCourseData();
}, []);
  return (
    <div>
        { courseData && (
              <div className="bg-gray-200 rounded-md shadow-md hover:scale-105 duration-100 ease-in-out shadow-gray-300 relative overflow-hidden">
                 <img src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"  className="w-full" />
                  <div className="p-4 text-black">
                  <div className="font-bold text-lg mb-2">{courseData.course_name}</div>
                  <p> 
                  {/* <span className="cursor-pointer text-blue-500 border-b border-blue-500 hover:border-transparent hover:bg-transparent"
                        onClick={() => handleLinkClick()}>
                  {}
                  </span>  */}
                  </p>
                  
                  <div className="flex justify-between items-center bg-teal-100 rounded-md absolute top-2 left-2 p-2 w-2/3">
                    <div className="text-sm">{courseData.faculty}</div>


                    </div>
              
                  </div>

              </div>
              
           )}
    
    </div>
   
    

  )
};



export default CardMode;


// import React from 'react';
// import { Course, CustomLink } from '../../content/coursesData';

// interface ListModeProps {
//   course: Course;
// }

// const ListMode: React.FC<ListModeProps> = ({ course }) => {
//   const { src, Faculty, SubjectLink, SubjectName } = course;

//   const handleLinkClick = (link: string) => {
//     window.open(link, '_blank'); // Mở đường dẫn trong cửa sổ mới khi click vào link
//   };

//   return (
//     <div className='bg-gray-200 w-full max-h-[100%] rounded-md shadow-md hover:scale-105 duration-100 ease-in-out shadow-gray-300 relative overflow-hidden'>
//       <img src={src} alt="/" className="w-full" />
//       <div className="p-4 text-black">
//         <div className="font-bold text-lg mb-2">{SubjectName}</div>
//         <p>
//           {/* Đường dẫn được hiển thị với màu xanh và có border dưới chân khi hover */}
//           <span
//             className="cursor-pointer text-blue-500 border-b border-blue-500 hover:border-transparent hover:bg-transparent"
//             onClick={() => handleLinkClick(SubjectLink.Link)}
//           >
//             {SubjectLink.Label}
//           </span>
//         </p>
//       </div>
//       <div className="flex justify-between items-center bg-teal-100 rounded-md absolute top-2 left-2 p-2 w-2/3">
//         <div className="text-sm">{Faculty}</div>
//       </div>
//     </div>
//   );
// };

// export default ListMode;







  
 
