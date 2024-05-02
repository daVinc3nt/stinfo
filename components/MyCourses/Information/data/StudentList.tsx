import * as React from 'react';
import { CourseID, CourseOperation, token } from '@/ambLib/amb';
import { useState, useEffect } from 'react';


export interface Person {
    ID: string;
}
interface FormValues {
    CourseID?: CourseID ;
    token?: token;
}


const StudentList: React.FC<{ persons: Person[] }> = ({ persons }) => {
    const initialValues: FormValues = {CourseID: null , token: null }
    const [formValues, setFormValues] = useState<FormValues>(initialValues);
      

    // const [sortedPersons, setSortedPersons] = useState<Person[]>(persons);
    // const [sortType, setSortType] = useState<'name' | 'ID'>('ID'); 
    // useEffect(() => {
    //     const sorted = [...persons].sort((a, b) => {
    //         if (sortType === 'name') {
    //             return a.Name.localeCompare(b.Name);
    //                  } else if (sortType === 'ID') {
    //                     return a.ID.localeCompare(b.ID);
    //                 }
    //                 return 0; 
    //             });
    //             setSortedPersons(sorted);
    //         }, [persons, sortType]);
        
    //         const handleSort = (type: 'name' | 'ID') => {
    //             setSortType(type);
    //         };

    const [studentList, setStudentList] = useState<Person[]>([]);
    useEffect(() => {
        
        const fetchStudentList = async () => {
            const fetchStudentListID = new CourseOperation();
            const response = await fetchStudentListID.findClasses(CourseID);
            if (response.error) {
                throw new Error(response.error);
            } else {
                setStudentList(response.data.student);
                console.log(setStudentList)
            }
        };
        fetchStudentList();
    }, []);

    return (
        <div>
            {/* <div className="flex items-center justify-center space-x-4 mb-4">
                <span>Sort by:</span>
                <select value={sortType} onChange={(e) => handleSort(e.target.value as 'name' | 'ID')}>
                    <option value="name">Name</option>
                    <option value="ID">ID</option>
                </select>
            </div> */}
            {/* <div>
            {sortedPersons.map(person => (
        <ClassCard key={person.ID} person={person} /> 
    ))}

            </div> */}
        
        </div>
    )

}

export default StudentList;

