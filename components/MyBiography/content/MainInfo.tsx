import { StudentOperation, token } from "@/ambLib/amb";
import { useEffect, useState } from "react";
import cookie from "js-cookie"



const myToken: token = {
  token: cookie.get("token"),
};

  
const MainInfo = () => {
    
    const [studentData, setStudentData] = useState<any>(null);
    const fetchStudentData = async () => {
        try {
            const studentAPI = new StudentOperation();
            const response = await studentAPI.findByAdmin({}, myToken);
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
        src= "https://th.bing.com/th/id/OIP.8bss3pk_BMm06NPJfvQrHAHaDm?rs=1&pid=ImgDetMain"
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
                        <div className="flex justify-start sm:pr-[38.5%] ">
                            <div className="font-bold  items-start ">MSSV:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{studentData.student_id}</div>
                        </div>
                    </div>

                    <div className="flex justify-start">
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
            <div className="border border-gray-200 p-4 rounded-xl mb-4 ">
                <div className="sm:grid sm:grid-cols-2 space-y-3 pl-10 text-lg">
                    <div className="sm:col-span-1 m-2 space-y-4">
                        <div className="md:flex justify-start">
                            <div className="font-bold  items-start">Khoa quản lý:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{studentData.faculty}</div>
                        </div>
                        <div className="md:flex justify-start ">
                            <div className="font-bold  items-start">Ngành đào tạo:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{studentData.major}</div>
                        </div>
                        <div className="flex justify-start">
                            <div className="font-bold  items-start">Lớp:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{studentData.class}</div>
                        </div>
                        <div className="md:flex justify-start">
                            <div className="font-bold  items-start">Thời gian đào tạo tối đa:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{studentData.exclusion}</div>
                        </div> 
                    </div>
                    <div className="col-span-1 m-2 space-y-4">
                        <div className="flex justify-start ">
                            <div className="font-bold  items-start">Tình trạng:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{studentData.active ==1 ? "Đang học" : "Tạm dừng"}</div>
                        </div>
                        <div className="flex justify-start ">
                            <div className="font-bold  items-start">Chương trình đào tạo:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{studentData.program}</div>
                        </div>
                        <div className="flex justify-start ">
                            <div className="font-bold  items-start">Trình độ:</div>
                            <div className="items-center md:mx-px sm:px-4 px-10">{studentData.level}</div>
                        </div>
                    </div>
                </div>    
            </div>
            
        </div>

    </div>

    <div className="md:flex justify-center items-center pt-6">
    <div className="flex items-center justify-center w-full h-[42px]
                             text-white text-2xl font-bold bg-sky-500 rounded-xl">Thông tin liên lạc</div>             
    </div>

                <div className="justify-center items-center
                                w-full py-6  space-y-6">
                    <div className="w-[98%] h-[42%] px-2 py-6 sm:p-10 
                                    border rounded-lg shadow-sm shadow-teal-200">
                            <div className="space-y-3 text-lg">
                                <div className="flex justify-start border-solid sm:pr-[30%]">
                                    <div className="font-bold  items-start">CCCD/CMND:</div>
                                    <div className="items-center sm:mx-auto sm:px-4 px-5">{studentData.credential_id}</div>
                                </div>
                                {/* <div className="md:flex justify-start border-solid">
                                    <div className="font-bold  items-start">Nơi sinh:</div>
                                    <div className="items-center sm:mx-auto sm:px-4 px-10">{}</div>
                                </div> */}
                                <div className="flex justify-start border-solid sm:pr-[34%]">
                                    <div className="font-bold  items-start">Hộ khẩu thường trú:</div>
                                    <div className="items-center sm:mx-auto sm:px-4 px-5">{studentData.address}</div>
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