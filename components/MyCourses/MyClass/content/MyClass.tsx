import React, { useState, useEffect } from "react";
import { ClassID, ClassOperation, CourseID, CourseOperation, FindingStudentInfoByAdmin, StudentID, StudentOperation, token } from "@/ambLib/amb"
import CouresInfo from "../CouresInfo";
import StudentList from "../data/dataClass/StudentList";


// KHAI BAO TAM THOI    
const Course_ID : CourseID =  {
    course_id: "CN2690"
}
const Token: token = {
    token:  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiMjQyNDMwMDQiLCJyb2xlIjoiU2luaCB2acOqbiIsImFjdGl2ZSI6MSwiaWF0IjoxNzE0OTY2MDIwLCJleHAiOjE3MTUwMDIwMjB9.sX-xyPVY4JT-QFA2ePVGTuCciKMHzHDtd80vCF2tBrU"
}
const CourseInfo: FindingStudentInfoByAdmin = {}
// KHAI BAO TAM THOI   

interface MyClassProps {
    ClassID: string;
}
export interface Student {
    student_id: string;
    fullname: string;
    role: string;
}



const MyClass: React.FC<MyClassProps> = ({ClassID}) => {
    
    const [filteredStudents, setFilteredStudents] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortType, setSortType] = useState<'name' | 'ID'>('ID');
//     // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     //     const term = event.target.value.toLowerCase();
//     //     setSearchTerm(term);
      
//     //     const filteredPersons = getStudentListInfo.filter(person =>
//     //         person.Name.toLowerCase().includes(term)
//     //     );
//     //     setFilteredPersons(filteredPersons);
//     // };

// const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const term = event.target.value.toLowerCase();
//     setSearchTerm(term);

//     // Filter student_array based on search term
//     const filtered = studentID.filter(student =>
//         student.student_id.toLowerCase().includes(term)
//     );
//     setFilteredstudent_array(filtered);
// };


// const [sortedstudent_array, setSortedstudent_array] = useState<Student[]>(null);
// const [sortType, setSortType] = useState<'name' | 'ID'>('ID');

// useEffect(() => {
//     const sorted = [...studentID].sort((a, b) => {
//         if (sortType === 'name') {
//             return a.fullname.localeCompare(b.fullname);
//         } else if (sortType === 'ID') {
//             return a.student_id.localeCompare(b.student_id);
//         }
//         return 0;
//     });
//     setSortedstudent_array(sorted);
// }, []);

const handleSort = (type: 'name' | 'ID') => {
    setSortType(type);
};




    

    const [studentID, setStudentID] = useState<any[]>([]);

    const fetchStudentID = async () => {
        try {
            const getStudentListID = new ClassOperation();
            const responseID = await getStudentListID.getClassInfo({class_id: String(ClassID)}, Token); // truyền vào tham số mã số lớp học
            console.log(responseID.data.students)
            setStudentID(responseID.data.students);
        }
        catch ( error) {
            console.error("Error fetching student data:", error);
        }
    }
    useEffect(() => {
        fetchStudentID();  
    }, []);
    useEffect(() => {
        console.log(studentID);  
    }, []);
    return (
      

    <div className="w-[98%] min-h-screen mt-4 border border-gray-200 rounded-md mx-auto">
        <div className="bg-sky-200 p-6 flex justify-between items-center">
        <h1 className="uppercase font-bold text-2xl text-white">Danh sách sinh viên</h1>
                     <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-[40%] px-3 py-2 border rounded-md"
                     />
        </div>

        <div className="p-3 md:p-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
                <span>Sort by:</span>
                    <select value={sortType} onChange={(e) => handleSort(e.target.value as 'name' | 'ID')}>
                        <option value="name">Name</option>
                        <option value="ID">ID</option>
                    </select>
            </div>
        </div>
        <div className=" rounded-md rounded-gray-100 border shadow-sm shadow-gray-100 w-full ">
        <div className="border-y-2 grid grid-cols-6">
                <div className="text-center font-bold col-span-1" >Mã số sinh viên</div>
                <div className="text-center font-bold col-span-3">Tên</div>
                <div className="text-center font-bold col-span-2">Chức danh</div>   
            </div>
        </div>
        <div >
            
            {/* {studentID &&  ( <div> <StudentList StudentID={String(studentID)}/> </div> )} */}
            {studentID && studentID.map( student => ( <div key= {student}> <StudentList StudentID={student}/> </div> ))}
        </div>

    </div>
       
       
    )
};  

export default MyClass  



