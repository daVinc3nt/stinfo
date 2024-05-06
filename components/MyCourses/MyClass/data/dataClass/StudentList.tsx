import React, { useEffect, useState } from 'react';
import { StudentOperation, token } from '@/ambLib/amb';
import cookie from "js-cookie"


const myToken: token = {
    token: cookie.get("token"),
  };
interface Props {
    StudentID: string; 
    FullName: string;
    Role: string;
}

const StudentList: React.FC<Props> = ({ StudentID,FullName, Role }) => {
    // console.log(StudentID)
    // const [studentInfo,setStudentInfo] = useState<any>(null)
    // const fetchStudentList = async () => {  
    //     try {
    //         const getStudentListInfo = new StudentOperation();
    //         const responseInfo = await getStudentListInfo.findByAdmin({ student_id: StudentID }, myToken);
    //         // const responseInfo = await getStudentListInfo.findByStudent({token: null})
    //         setStudentInfo(responseInfo.data)
    //         console.log(responseInfo.data)
    //     } catch (error) {
    //         console.error("Error fetching student data:", error);
    //     }
    // };
    // useEffect(() => {
    //     fetchStudentList();  
    // }, []);

    return (
        <div >
            
            <div>
                { {/*studentInfo*/} && (
                    <div  className=" border-y-2 grid grid-cols-6">
                    <div className='flex justify-center col-span-1'> {StudentID}</div>
                    <div className='flex justify-center col-span-3'> {FullName}</div>
                    <div className='flex justify-center col-span-2'> {Role}</div>
                </div>
                )}
            </div>
            
         
        </div>
    );
}


export default StudentList;
