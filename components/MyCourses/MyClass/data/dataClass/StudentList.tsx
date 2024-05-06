import React, { useEffect, useState } from 'react';
import { StudentOperation, token } from '@/ambLib/amb';


const Token: token = {
    token:  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiMjQyNDMwMDQiLCJyb2xlIjoiU2luaCB2acOqbiIsImFjdGl2ZSI6MSwiaWF0IjoxNzE0OTY2MDIwLCJleHAiOjE3MTUwMDIwMjB9.sX-xyPVY4JT-QFA2ePVGTuCciKMHzHDtd80vCF2tBrU"
}
interface Props {
    StudentID: string; 
}

const StudentList: React.FC<Props> = ({ StudentID }) => {
    console.log(StudentID)
    const [studentInfo,setStudentInfo] = useState<any>(null)
    const fetchStudentList = async () => {  
        try {
            const getStudentListInfo = new StudentOperation();
            const responseInfo = await getStudentListInfo.findByAdmin({ student_id: StudentID }, {token: null});
            // const responseInfo = await getStudentListInfo.findByStudent({token: null})
            setStudentInfo(responseInfo.data)
            console.log(responseInfo.data)
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    };
    useEffect(() => {
        fetchStudentList();  
    }, []);

    return (
        <div >
            
            <div>
                {studentInfo && (
                    <div  className=" border-y-2 grid grid-cols-6">
                    <div className='flex justify-center col-span-1'>{studentInfo.student_id}</div>
                    <div className='flex justify-center col-span-3'>{studentInfo.fullname}</div>
                    <div className='flex justify-center col-span-2'>{studentInfo.role}</div>
                </div>
                )}
            </div>
            
         
        </div>
    );
}


export default StudentList;
