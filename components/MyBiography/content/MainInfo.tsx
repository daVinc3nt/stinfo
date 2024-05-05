import { StudentOperation, token } from "@/ambLib/amb";
import { useEffect, useState } from "react";

// interface information {
//     Name:               string,
//     Email:              string,
//     StudentID:          string,
//     BirthDay:           string,
//     Sex:                boolean,
//     Avatar:             string,
// };
// interface academic {
//     Condition:          string,
//     Major:              string,
//     Program:            string,
//     Faculty:            string,
//     Class:              string,
//     Teacher:            string,
//     Timeline:           string,
// };
// const student: { personal: information, study: academic } = {
//     personal: {
//         Name: "Nguyen Van A",
//         Email: "nguyenvana@hcmut.edu.vn",
//         StudentID: "S1234567",
//         BirthDay: "1998-05-15",
//         Sex: true,   // true là nam, false là nữ
//         Avatar: "https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"  

//     },
//     study: {
//         Condition: "Đang học",
//         Major: "Khoa học máy tính",
//         Program: "Chính quy (CQ)",
//         Faculty: "Khoa Khoa học và Kỹ thuật máy tính",
//         Class: "MT22KH00",
//         Teacher: "Steven Jobs",
//         Timeline: "12/2022-10/2028"
//     }
// };
  
const MainInfo = () => {
    
    const [studentData, setStudentData] = useState<any>(null);
    const tokenData: token = {
        token:  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiMjQyNDMwMDQiLCJyb2xlIjoiU2luaCB2acOqbiIsImFjdGl2ZSI6MSwiaWF0IjoxNzE0NzI2MzExLCJleHAiOjE3MTQ3NjIzMTF9.5nGKMOfyjpnFMC4_Flg8iv-amYosm6hpdovR9P5Wwak"
    };

    const fetchStudentData = async () => {
        try {
            const studentAPI = new StudentOperation();
            const response = await studentAPI.findByAdmin({}, tokenData);
            console.log("Full response:", response); // Log the entire response
            console.log("Teacher data:", response.data); // Log the specific data part
            setStudentData(response.data); // Set teacherData state with the fetched data
        } catch (error) {
            console.error("Error fetching teacher data:", error);
        }
    };

    useEffect(() => {
        fetchStudentData();
    }, []);



    return ( 
        <div>
            {studentData && (
                <div className="w-full min-h-screen p-10
                border shadow-gray-200 shadow-sm rounded-lg">
      <div className="flex justify-center items-center p-2 ">
        <img 
        src= "https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"
        alt="Avatar" 
        className=" h-[72%] w-[65%] md:h-[62%] md:w-[42%] rounded-xl shadow-xl shadow-gray-100  mx-auto mb-2"
        />
      </div>

    <div className=" w-[98%] h-[42%] px-2 py-6 md:p-10 
                            border rounded-lg shadow-sm shadow-teal-200">
        <div className="space-y-6">
            <div className="flex items-center justify-center w-full h-[42px]
                             text-white text-2xl font-bold bg-sky-500 rounded-xl">Thông tin chung</div>
            <div className="border border-gray-200 p-4 rounded-xl mb-4">
                <div className="space-y-3 pl-10 text-lg">
                    <div className="sm:flex justify-between">
                        <div className="flex justify-start">
                            <div className="font-bold  items-start">Họ và tên:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{studentData.fullname}</div>
                        </div>
                        <div className="flex justify-start">
                            <div className="font-bold  items-start">MSSV:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{studentData.student_id}</div>
                        </div>
                    </div>

                    <div className="md:flex justify-start">
                            <div className="font-bold  items-start">Ngày tháng năm sinh:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{studentData.date_of_birth}</div>
                    </div>
                    <div className="flex justify-start">
                            <div className="font-bold  items-start">Giới tính:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{studentData.gender}</div>
                    </div>
                    <div className="flex justify-start">
                            <div className="font-bold  items-start">Email:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{studentData.contact_email}</div>
                    </div>
                </div>    
            </div>
            
        </div>
    </div>

    <div className=" w-[98%] h-[42%] px-2 py-6 md:p-10 
                            border rounded-lg shadow-sm shadow-teal-200">
        <div className="space-y-6">
            <div className="flex items-center justify-center w-full h-[42px]
                             text-white text-2xl font-bold bg-sky-500 rounded-xl">Thông tin học vụ</div>
            <div className="border border-gray-200 p-4 rounded-xl mb-4">
                <div className="space-y-3 pl-10 text-lg">
                    <div className="xl:flex justify-between">
                        <div className="md:flex justify-start">
                            <div className="font-bold  items-start">Khoa quản lý:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{studentData.faculty}</div>
                        </div>
                        {/* <div className="flex justify-start">
                            <div className="font-bold  items-start">Tình trạng:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{student.study.Condition}</div>
                        </div> */}
                    </div>

            
                    <div className="xl:flex justify-between">
                        <div className="flex justify-start">
                            <div className="font-bold  items-start">Ngành đào tạo:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{studentData.major}</div>
                        </div>
                        <div className="flex justify-start">
                            <div className="font-bold  items-start">Chương trình đào tạo:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{studentData.program}</div>
                        </div>
                    </div>

                    <div className="xl:flex justify-between">
                        <div className="flex justify-start">
                            <div className="font-bold  items-start">Lớp:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{studentData.class}</div>
                        </div>
                        <div className="flex justify-start">
                            <div className="font-bold  items-start">trình độ:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{studentData.level}</div>
                        </div>
                    </div>

                    {/* <div className="md:flex justify-start">
                            <div className="font-bold  items-start">Thời gian đào tạo tối đa:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{student.study.Timeline}</div>
                    </div> */}
                </div>    
            </div>
            
        </div>

    </div>
</div>
            )}
        </div>
        
        
    );
}

export default MainInfo