import React, { useState, useEffect } from 'react';
import { TeacherOperation, token } from "@/ambLib/amb";

const MyTeacher = () => {
    const [teacherData, setTeacherData] = useState<any>(null);
    const tokenData: token = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFjaGVyX2lkIjoiR1Y1MzU4NyIsInJvbGUiOiJHaeG6o25nIHZpw6puIiwiYWN0aXZlIjoxLCJpYXQiOjE3MTQ2MzU0NDQsImV4cCI6MTcxNDY3MTQ0NH0.lHuuT399jqdEiz2y3gyt33Ywsk5UwWuhXgpU_Kj-Ks4"
    };

    const fetchTeacherData = async () => {
        try {
            const teacherAPI = new TeacherOperation();
            const response = await teacherAPI.findByAdmin({}, tokenData);
            console.log("Full response:", response); // Log the entire response
            console.log("Teacher data:", response.data); // Log the specific data part
            setTeacherData(response.data); // Set teacherData state with the fetched data
        } catch (error) {
            console.error("Error fetching teacher data:", error);
        }
    };

    useEffect(() => {
        fetchTeacherData();
    }, []);

    return (
        <div>
            {teacherData && (
                <div className="space-y-8">
                    <div className="lg:grid grid-cols-4 border shadow-sm shadow-gray-200 rounded-md p-8">
                                 { <img 
               src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg" 
             alt="Anh the" 
              className=" col-span-1
                         flex justify-center items-center
                            h-[85%] w-[92%] md:h-[42%] md:w-[34%] lg:h-[98%] lg:w-[87%]  mx-auto
                         rounded-sm shadow-sm shadow-white"
               /> }
                        <div className="col-span-3 w-full rounded-sm border shadow-sm shadow-gray-200">
                            <h1 className="w-full p-4 uppercase font-bold text-center bg-light-primary-200">Thông tin cá nhân</h1>
                            <div className="space-y-3 text-lg my-6 p-4">
                                <div className="md:flex justify-start border-solid rounded-sm">
                                    <div className="font-bold items-start mx-5">Tên giảng viên:</div>
                                    <div className="items-center md:mx-auto px-8">{teacherData.fullname}</div>
                                </div>
                                <div className="md:flex justify-start border-solid">
                                    <div className="font-bold items-start mx-5">CCCD/CMND:</div>
                                    <div className="items-center md:mx-auto px-8">{teacherData.credential_id}</div>
                                </div>
                                <div className="md:flex justify-start border-solid">
                                    <div className="font-bold items-start mx-5">Ngày tháng năm sinh:</div>
                                    <div className="items-center md:mx-auto px-4">{teacherData.date_of_birth}</div>
                                    <div className="font-bold items-start mx-5">Giới tính:</div>
                                    <div className="items-center md:mx-auto px-8">{teacherData.gender ? "Nam" : "Nữ"}</div>
                                </div>
                                <div className="md:flex justify-start border-solid">
                                    <div className="font-bold items-start mx-5">Số điện thoại:</div>
                                    <div className="items-center md:mx-auto px-8">{teacherData.phone_number}</div>
                                </div>
                                <div className="md:flex justify-start border-solid">
                                    <div className="font-bold items-start mx-5">Email:</div>
                                    <div className="items-center md:mx-auto px-8">{teacherData.contact_email}</div>
                                </div>
                                <div className="md:flex justify-start border-solid">
                                    <div className="font-bold items-start mx-5">Địa chỉ:</div>
                                    <div className="items-center md:mx-auto px-8">{teacherData.address}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border shadow-sm shadow-gray-200 rounded-md p-8">
                        <div className="w-full rounded-sm border shadow-sm shadow-gray-200">
                            <h1 className="w-full p-4 uppercase font-bold text-center bg-light-primary-200">Thông tin giảng dạy</h1>
                        </div>
                        <div className="space-y-3 text-lg my-6 p-4">
                            <div className="md:flex justify-start border-solid rounded-sm">
                                <div className="font-bold items-start mx-5">Khoa quản lý:</div>
                                <div className="items-center md:mx-auto px-8">{teacherData.faculty}</div>
                            </div>
                            <div className="md:flex justify-start border-solid">
                                <div className="font-bold items-start mx-5">Mã GV:</div>
                                <div className="items-center md:mx-auto px-8">{teacherData.teacher_id}</div>
                            </div>
                            <div className="md:flex justify-start border-solid">
                                <div className="font-bold items-start mx-5">Lớp CN:</div>
                                <div className="items-center md:mx-auto px-4">{teacherData.homeroom_class}</div>
                                <div className="font-bold items-start mx-5">Chức vụ:</div>
                                <div className="items-center md:mx-auto px-8">{teacherData.role}</div>
                            </div>
                            <div className="md:flex justify-start border-solid">
                                <div className="font-bold items-start mx-5">Học vị:</div>
                                <div className="items-center md:mx-auto px-8">{teacherData.level}</div>
                            </div>
                            <div className="md:flex justify-start border-solid">
                                <div className="font-bold items-start mx-5">Chuyên ngành:</div>
                                <div className="items-center md:mx-auto px-8">{teacherData.major}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTeacher;
