


// // export default function MyClass() {
// //  
// //   

// //   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
// //    
// //    
// //   };

// //   return (
// //     <div className="w-[98%] min-h-screen mt-4 border border-gray-200 rounded-md mx-auto">
// //       <div className="bg-sky-200 p-6 flex justify-between items-center">
// //         <h1 className="uppercase font-bold text-2xl text-white">Danh sách sinh viên</h1>
// //         <input
// //           type="text"
// //           placeholder="Tìm kiếm..."
// //           value={searchTerm}
// //           onChange={handleSearch}
// //           className="w-[40%] px-3 py-2 border rounded-md"
// //         />
// //       </div>
// //       <div className="p-3 md:p-6">
// //         <StudentList persons={filteredPersons} />
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useState, useEffect } from "react";
// import StudentList from "./data/StudentList";
// import getStudentList, { Person,} from "./data/classData"; 

// export default function MyClass() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [students, setStudents] = useState<Person[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const studentsData = await getStudentList();
//         setStudents(studentsData);
//       } catch (error) {
//         console.error("Error fetching student list:", error);
//       }
//     };

//     fetchData();
//   }, []);


//   const filteredStudents = students.filter(student =>
//     student.ID.toLowerCase().includes(searchTerm)
//   );

//   return (
//     <div className="w-[98%] min-h-screen mt-4 border border-gray-200 rounded-md mx-auto">
//       <div className="bg-sky-200 p-6 flex justify-between items-center">
//         <h1 className="uppercase font-bold text-2xl text-white">Danh sách sinh viên</h1>
//         <input
//           type="text"
//           placeholder="Tìm kiếm..."
//           value={searchTerm}
//           onChange={handleSearch}
//           className="w-[40%] px-3 py-2 border rounded-md"
//         />
//       </div>
//       <div className="p-3 md:p-6">
//         <StudentList persons={filteredStudents} />
//       </div>
//     </div>
//   );
// }

import * as React from 'react';
import { useState } from "react";
import StudentList, { Person } from '../data/StudentList';



export default function MyClass() {
    const [filteredPersons, setFilteredPersons] = useState<Person[]>();
    const [searchTerm, setSearchTerm] = useState('');


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
      
        // const filteredPersons = getStudentList.filter(person =>
        //     person.Name.toLowerCase().includes(term)
        // );
        // setFilteredPersons(filteredPersons);
    };
    
    return (
        <div className="w-[98%] min-h-screen mt-4 border border-gray-200 rounded-md mx-auto">
            <div className="bg-sky-200 p-6 flex justify-between items-center">
                <h1 className="uppercase font-bold text-2xl text-white">Danh sách sinh viên</h1>
                <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-[40%] px-3 py-2 border rounded-md"
                />
            </div>
            <div className="p-3 md:p-6">
                {/* <StudentList persons={filteredStudents} /> */}
                <StudentList persons={person}/>
            </div>
        </div>
    );
};