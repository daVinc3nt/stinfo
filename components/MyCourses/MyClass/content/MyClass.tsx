import React, { useState, useEffect } from "react";
import { ClassID, CourseID, CourseOperation, FindingStudentInfoByAdmin, StudentID, token } from "@/ambLib/amb"



interface MyClassProps {
    ClassID: ClassID;
}
const Course_ID : CourseID =  {
    course_id: "CN2690"
}
const Token: token = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiMjQyNDMwMDQiLCJyb2xlIjoiU2luaCB2acOqbiIsImFjdGl2ZSI6MSwiaWF0IjoxNzE0NzI2MzExLCJleHAiOjE3MTQ3NjIzMTF9.5nGKMOfyjpnFMC4_Flg8iv-amYosm6hpdovR9P5Wwak"
}
const student : StudentID = {}
const studentInfo: FindingStudentInfoByAdmin = {}
//const MyClass: React.FC<MyClassProps> = ({ClassID}) => {
const MyClass = () => {
    const [filteredStudents, setFilteredStudents]= useState<StudentID[]>([]);
    const [searchTerm, setSearchTerm] = useState<any>('');

    // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const term = event.target.value.toLowerCase();
    //     setSearchTerm(term);
      
    //     const filteredPersons = getStudentList.filter(person =>
    //         person.Name.toLowerCase().includes(term)
    //     );
    //     setFilteredPersons(filteredPersons);
    // };

    const [studentList, setStudentList] = useState<any[]>(null);
    const students: StudentID[] = [];
const fetchStudentList = async () => {
    try {
        const getStudentListAPI = new CourseOperation();
        const response = await getStudentListAPI.findClasses(Course_ID, Token);
        console.log("Full response:", response.data); // Log the entire response
        console.log("Student data:", response.data[0]); // Log the specific data part
        // Set studentList state with the fetched student data
        setStudentList(response.data[0].students);
        
        // Push student IDs to the students array
        students.push(...response.data.students.map(student => student.student_id));
    } catch (error) {
        console.error("Error fetching student data:", error);
    }
};

useEffect(() => {
    fetchStudentList();
    
}, []);





const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter students based on search term
    const filtered = students.filter(student =>
        student.student_id.toLowerCase().includes(term)
    );
    setFilteredStudents(filtered);
};


     

const [sortedStudents, setSortedStudents] = useState<student[]>(students);
const [sortType, setSortType] = useState<'name' | 'ID'>('ID');

useEffect(() => {
    const sorted = [...students].sort((a, b) => {
        if (sortType === 'name') {
            return a.Name.localeCompare(b.Name);
        } else if (sortType === 'ID') {
            return a.ID.localeCompare(b.ID);
        }
        return 0;
    });
    setSortedStudents(sorted);
}, [students, sortType]);

const handleSort = (type: 'name' | 'ID') => {
    setSortType(type);
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
            <div className="flex items-center justify-center space-x-4 mb-4">
                <span>Sort by:</span>
                <select value={sortType} onChange={(e) => handleSort(e.target.value as 'name' | 'ID')}>
                    <option value="name">Name</option>
                    <option value="ID">ID</option>
                </select>
            </div> 

                <div>
                    {studentList && (
                    studentList.map(student => (
                        <div key={student}>{student}</div>
                    )))}
                </div>
            </div>
        </div>

       
    )
};  

export default MyClass  


