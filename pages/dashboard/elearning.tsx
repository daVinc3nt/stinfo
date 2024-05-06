import React from 'react';
import CoursesList from '@/components/MyCourses/feature/CoursesList';

const elearning = () => {
    return (
        <div className="flex-row mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Danh sách các môn học</h1>
          <div className="bg-wwhite rounded-md shadow-sm shadow-gray-400  overflow-hidden border-b ">
            <CoursesList />
        </div>
        </div>
      );
}
export default elearning
