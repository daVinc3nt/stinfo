import React, { useEffect, useState } from 'react';
import { Course } from '../content/coursesData';
import DataTableControls from '../content/DataTableControls';
import DisplayModeSelector from '../content/DisplayModeSelector';
import ListMode from './DisplayMode/ListMode';
import CardMode from './DisplayMode/CardMode';
import { StudentOperation, token } from '@/ambLib/amb';



// interface CoursesListProps {
//   courses: Course[];
// }


// const CoursesList: React.FC<CoursesListProps> = ({ courses }) => {
//   const [displayMode, setDisplayMode] = useState<'list' | 'card'>('list');
//   const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

//   const handleModeChange = (mode: 'list' | 'card') => {
//     setDisplayMode(mode);
//   };

//   const handleSearch = (query: string) => {
//     const filtered = courses.filter(course =>
//       course.SubjectName.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredCourses(filtered);
//   };

//   const handleFilter = (filterKey: string, value: string) => {
//     const filtered = courses.filter(course => {
//       if (filterKey === 'status') {
//         if (value === 'active') {
//           return course.Active === true;
//         } else if (value === 'inactive') {
//           return course.Active === false;
//         }
//         // Handle other filter conditions if needed
//       }
//       return true;
//     });
//     setFilteredCourses(filtered);
//   };



//   return (
//     <div>
//       <div className='flex justify-center items-center pb-8'>
//         <DataTableControls onSearch={handleSearch} onFilter={handleFilter} />
//       </div>
//       <div>   
//         <div className="flex justify-between items-center w-[98%] bg-sky-300 mx-auto rounded-md shadow-sm shadow-gray-300 ">
//           <div className='p-6 px-[8%] text-3xl font-bold text-white'>Khóa học của tôi</div>
//           <div className=''><DisplayModeSelector onChangeMode={handleModeChange} /></div>    
//         </div>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-10">
//           {filteredCourses.map(course => (
//             displayMode === 'card' ? <CardMode key={course.src} course={course} /> : <ListMode key={course.src} course={course} />
//           ))}
//         </div>
//       </div>
//     </div>

//   );
// };


const Token: token = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiMjQyNDMwMDQiLCJyb2xlIjoiU2luaCB2acOqbiIsImFjdGl2ZSI6MSwiaWF0IjoxNzE0NjQwOTk0LCJleHAiOjE3MTQ2NzY5OTR9.SHziW_YNs0wO7d7yjwmbl_IsE7hSkElH-X0GFECmlag"
}

const CoursesList = () => {
  

const [courseID, setCoursesID] = useState<any>(null)
const [faculty, setFaculty] = useState<any>(null)
const getCourseID = async () => {
  try {
      const getCourseIDAPI = new StudentOperation();
      const response = await getCourseIDAPI.findStudentRegisteredClass(Token);
      console.log("Full response:", response); 
      console.log("Teacher data:", response.data); 
      setCoursesID(response.data); 
    }catch (error) {
      console.error("Error fetching teacher data:", error);
    }
};

  useEffect(() => {
  getCourseID();
}, []);


  return (
    <div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-10">
            {courseID && (
              <div>
                <CardMode key={courseID} CourseID={courseID} />
              </div>
            )}
        </div>
    </div>
  )
}

export default CoursesList;



