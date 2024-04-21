import React from 'react';
import { Course, CustomLink } from '../../content/coursesData';

interface CardModeProps {
  course: Course;
}

const CardMode: React.FC<CardModeProps> = ({ course }) => {
  const { src, Faculty, SubjectLink, SubjectName } = course;

  const handleLinkClick = (link: string) => {
    window.open(link, '_blank'); // Mở đường dẫn trong cửa sổ mới khi click vào link
  };

  return (
    <div className="bg-gray-200 rounded-md shadow-md hover:scale-105 duration-100 ease-in-out shadow-gray-300 relative overflow-hidden">
      <img src={src} alt={SubjectName} className="w-full" />
      <div className="p-4 text-black">
        <div className="font-bold text-lg mb-2">{SubjectName}</div>
        <p>
          {/* Đường dẫn được hiển thị với màu xanh và có border dưới chân khi hover */}
          <span
            className="cursor-pointer text-blue-500 border-b border-blue-500 hover:border-transparent hover:bg-transparent"
            onClick={() => handleLinkClick(SubjectLink.Link)}
          >
            {SubjectLink.Label}
          </span>
        </p>
      </div>
      <div className="flex justify-between items-center bg-teal-100 rounded-md absolute top-2 left-2 p-2 w-2/3">
        <div className="text-sm">{Faculty}</div>
      </div>
    </div>
  );
};

export default CardMode;
