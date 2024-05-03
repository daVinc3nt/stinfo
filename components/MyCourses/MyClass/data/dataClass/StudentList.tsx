// import * as React from 'react';
// import { CourseID, CourseOperation, token } from '@/ambLib/amb';
// import { useState, useEffect } from 'react';


// export interface Person {
//     ID: string;
// }
// interface FormValues {
//     CourseID?: CourseID ;
//     token?: token;
// }


// const StudentList: React.FC<{ persons: Person[] }> = ({ persons }) => {
//     const initialValues: FormValues = {CourseID: null , token: null }
//     const [formValues, setFormValues] = useState<FormValues>(initialValues);
      

//     // const [sortedPersons, setSortedPersons] = useState<Person[]>(persons);
//     // const [sortType, setSortType] = useState<'name' | 'ID'>('ID'); 
//     // useEffect(() => {
//     //     const sorted = [...persons].sort((a, b) => {
//     //         if (sortType === 'name') {
//     //             return a.Name.localeCompare(b.Name);
//     //                  } else if (sortType === 'ID') {
//     //                     return a.ID.localeCompare(b.ID);
//     //                 }
//     //                 return 0; 
//     //             });
//     //             setSortedPersons(sorted);
//     //         }, [persons, sortType]);
        
//     //         const handleSort = (type: 'name' | 'ID') => {
//     //             setSortType(type);
//     //         };

//     const [studentList, setStudentList] = useState([]);
    
//     const getStudentIDAPI = async () => {
//         const fetchStudentListID = new CourseOperation();
//         const response = await fetchStudentListID.findClasses(formValues.CourseID,formValues.token);


//         if(response.error) {
//             throw new Error(response.error);
//         }
//         else {
//             setStudentList(response.data.student);
//             console.log(setStudentList)
//         }
  
//     }

//     useEffect(() => {
     
            
           

//     }, []);

//     return (
        <div>
             
            {/* <div>{sortedPersons.map(person => (<ClassCard key={person.ID} person={person} /> ))}</div> */}
        
        </div>
//     )

// }

// export default StudentList;

import * as React from 'react';
import { CourseID, CourseOperation, UpdatingCourseInfo, token } from '@/ambLib/amb';
import { useState, useEffect } from 'react';

export interface Student {
    ID: string;
}

interface CourseData {
    course_id: string;
    students: Student[];
}

interface FormValues {
    CourseID?: CourseID;
}

const StudentList = () => {
    //const initialValues: FormValues = { CourseID: {CN2690} };
    //const [formValues, setFormValues] = useState<FormValues>(initialValues);
    const [studentList, setStudentList] = useState<Student[]>([]);

const Token: token = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiMjQyNDMwMDQiLCJyb2xlIjoiU2luaCB2acOqbiIsImFjdGl2ZSI6MSwiaWF0IjoxNzE0NjQwOTk0LCJleHAiOjE3MTQ2NzY5OTR9.SHziW_YNs0wO7d7yjwmbl_IsE7hSkElH-X0GFECmlag"
}
const CourseID : CourseID =  {
    course_id: "CN2690"
}
const CourseInfo: UpdatingCourseInfo = {}
const [studentData, setStudentData] = useState<any>(null);
    const fetchStudentList = async () => {
    try {
        const getStudentListAPI = new CourseOperation();
        const response = await getStudentListAPI.findClasses(CourseID,Token);
        console.log("Full response:", response); // Log the entire response
        console.log("Teacher data:", response.data); // Log the specific data part
        setStudentData(response.data); // Set teacherData state with the fetched data
    } catch (error) {
        console.error("Error fetching teacher data:", error);
    }
};

    useEffect(() => {
        fetchStudentList();
}, []);
    

    return (
        <div>
            {studentList.map(student => (
                <div key={student.ID}>{student.ID}</div>
            ))}
        </div>
    );
};

export default StudentList;
