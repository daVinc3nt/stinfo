import React, { useEffect, useState } from 'react';
import DataTableControls from '../content/DataTableControls';
import DisplayModeSelector from '../content/DisplayModeSelector';
import ListMode from './DisplayMode/ListMode';
import CardMode from './DisplayMode/CardMode';
import { ClassID, CourseID, CourseOperation, StudentOperation, UpdatingCourseInfo, token } from '@/ambLib/amb';
import { cookies } from 'next/headers';




// KHAI BAO TAM THOi
  const Token: token = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiMjQyNDMwMDQiLCJyb2xlIjoiU2luaCB2acOqbiIsImFjdGl2ZSI6MSwiaWF0IjoxNzE0OTEzMjkxLCJleHAiOjE3MTQ5NDkyOTF9.fHNHeARPQRTaWQxROodLgxuVVn03KuyjmY1wETEpnVk" 
  };
  const CouseInfo: UpdatingCourseInfo = {}
  
  const Course_ID: CourseID = {
    course_id: "CN2690"
  }
// KHAI BAO TAM THOi
export interface CustomLink {
  link: '/class_info';
  class_id: string;
  teacher_name: string;
}

export interface Course {
  course_id?:string;
  course_name?: string;
  class_link?: CustomLink;
  faculty?: string;
  course_type?: string;

}



const CoursesList = () => {
  
//   const [displayMode, setDisplayMode] = useState<'list' | 'card'>('list');
//   const [filteredCourses, setFilteredCourses] = useState<any[]>(null);
//   const handleModeChange = (mode: 'list' | 'card') => {
//     setDisplayMode(mode);
//   };

//   const handleSearch = (query: string) => {
//     const filtered = courseInfo.filter((course: Course) =>
//         course.course_name?.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredCourses(filtered);
// };

// const handleFilter = (filterKey: string, value: string) => {
//   const filtered = courseInfo.filter((course: Course) => {
//       if (filterKey === 'course_type') {
//           return course.course_type === value;
//       }
//       return true;
//   });
//   setFilteredCourses(filtered);
// };


const [displayMode, setDisplayMode] = useState<'card' | 'list'>('card');
const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
const [searchQuery, setSearchQuery] = useState<string>('');
const [filterType, setFilterType] = useState<string>('');

const handleModeChange = (mode: 'card' | 'list') => {
  setDisplayMode(mode);
};

const handleSearch = (query: string) => {
  setSearchQuery(query);
};

const handleFilter = (filterKey: string, value: string) => {
  setFilterType(value);
};



// CALL API //
const [courseInfo, setCourseInfo] = useState<Course[]>([]);
const [classID, setClassID] = useState<any>([]);
const fetchCourseList = async () => {  
  try {
      const getCourseListAPI = new CourseOperation();
      const response = await getCourseListAPI.findAllCourses({}, Token);
      console.log("Course data :", response.data); // Log the specific data part
      setCourseInfo(response.data);
      
      // Fetch class ID for the first course
      if (response.data.length > 0) {
          const firstCourseID = response.data[0].course_id;
          fetchClassID(firstCourseID);
      }
  } catch (error) {
      console.error("Error fetching course data:", error);
  }
};

const fetchClassID = async (courseID: string) => {  
  try {
      const getClassIDAPI = new CourseOperation();
      const response12 = await getClassIDAPI.findClasses({ course_id: courseID }, Token);
      console.log(response12.data);
      setClassID(response12.data[0].class_id);
  } catch (error) {
      console.error("Error fetching class data:", error);
  }
};

useEffect(() => {
  fetchCourseList();  
}, []);
useEffect(() => {
  console.log(classID);  
}, []);
  return(
    <div>
    <div className='flex justify-center items-center pb-8'>
      <DataTableControls onSearch={handleSearch} onFilter={handleFilter} />
    </div>
    <div>   
      <div className="flex justify-between items-center w-[98%] bg-sky-300 mx-auto rounded-md shadow-sm shadow-gray-300 ">
        <div className='p-6 px-[8%] text-3xl font-bold text-white'>Khóa học của tôi</div>
        <div className=''><DisplayModeSelector onChangeMode={handleModeChange} /></div>    
      </div>
      
    <div className={displayMode === 'card' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-10" : "py-20 px-40 space-y-8 min-h-full"}>
  {courseInfo && courseInfo.map(course => (
    <div key={course.course_id}>
      {displayMode === 'card' ? (
        <CardMode
          CourseID={course.course_id}
          CourseName={course.course_name}
          Faculty={course.faculty}
          CourseType={course.course_type}
          ClassID={classID}
        />
      ) : (
        <ListMode
          CourseID={course.course_id}
          CourseName={course.course_name}
          Faculty={course.faculty}
          CourseType={course.course_type}
          ClassID={classID}
        />
      )}
    </div>
  ))}
</div>

    </div>
  </div>

  )
};


export default CoursesList;






