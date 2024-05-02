import React, { useState } from 'react';
import CardMode from './CardMode';
import ListMode from './ListMode';
import { Course } from '../../content/coursesData';
import DisplayModeSelector from '../../content/DisplayModeSelector';
import DataTableControls from '../../content/DataTableControls';

interface CoursesListProps {
  courses: Course[];
}

const CoursesList: React.FC<CoursesListProps> = ({ courses }) => {
  const [displayMode, setDisplayMode] = useState<'list' | 'card'>('list');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

  const handleModeChange = (mode: 'list' | 'card') => {
    setDisplayMode(mode);
  };

  const handleSearch = (query: string) => {
    const filtered = courses.filter(course =>
      course.SubjectName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleFilter = (filterKey: string, value: string) => {
    const filtered = courses.filter(course => {
      if (filterKey === 'status') {
        if (value === 'active') {
          return course.Active === true;
        } else if (value === 'inactive') {
          return course.Active === false;
        }
        // Handle other filter conditions if needed
      }
      return true;
    });
    setFilteredCourses(filtered);
  };

  return (
    <div>
      <div className='flex justify-center items-center pb-8'>
        <DataTableControls onSearch={handleSearch} onFilter={handleFilter} />
      </div>
      <div>   
        <div className="flex justify-between items-center w-[98%] bg-sky-300 mx-auto rounded-md shadow-sm shadow-gray-300 ">
          <div className='p-6 px-[8%] text-3xl font-bold text-white'>Khóa học của tôi</div>
          <div className=''><DisplayModeSelector onChangeMode={handleModeChange} /></div>    
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-10">
          {filteredCourses.map(course => (
            displayMode === 'card' ? <CardMode key={course.src} course={course} /> : <ListMode key={course.src} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesList;