import { JSXElementConstructor } from "react";

interface information {
    Name:               string,
    Email:              string,
    StudentID:          string,
    BirthDay:           string,
    Sex:                boolean,
    Avatar:             string,
};
interface academic {
    Condition:          string,
    Major:              string,
    Program:            string,
    Faculty:            string,
    Class:              string,
    Teacher:            string,
    Timeline:           string,
};
const student: { personal: information, study: academic } = {
    personal: {
        Name: "Nguyen Van A",
        Email: "nguyenvana@hcmut.edu.vn",
        StudentID: "S1234567",
        BirthDay: "1998-05-15",
        Sex: true,   // true là nam, false là nữ
        Avatar: "https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"  

    },
    study: {
        Condition: "Đang học",
        Major: "Khoa học máy tính",
        Program: "Chính quy (CQ)",
        Faculty: "Khoa Khoa học và Kỹ thuật máy tính",
        Class: "MT22KH00",
        Teacher: "Steven Jobs",
        Timeline: "12/2022-10/2028"
    }
};
  
const MainInfo = () => {
    return ( 
        <div className="w-full min-h-screen p-10
                        border shadow-gray-200 shadow-sm rounded-lg">
              <div className="flex justify-center items-center p-2 ">
                <img 
                src={student.personal.Avatar}
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
                                    <div className="items-center md:mx-px sm:px-4 px-10">{student.personal.Name}</div>
                                </div>
                                <div className="flex justify-start">
                                    <div className="font-bold  items-start">MSSV:</div>
                                    <div className="items-center md:mx-px sm:px-4 px-10">{student.personal.StudentID}</div>
                                </div>
                            </div>

                            <div className="md:flex justify-start">
                                    <div className="font-bold  items-start">Ngày tháng năm sinh:</div>
                                    <div className="items-center md:mx-px sm:px-4 px-10">{student.personal.BirthDay}</div>
                            </div>
                            <div className="flex justify-start">
                                    <div className="font-bold  items-start">Giới tính:</div>
                                    <div className="items-center md:mx-px sm:px-4 px-10">{student.personal.Sex ? "Nam" : "Nữ"}</div>
                            </div>
                            <div className="flex justify-start">
                                    <div className="font-bold  items-start">Email:</div>
                                    <div className="items-center md:mx-px sm:px-4 px-10">{student.personal.Email}</div>
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
                                    <div className="items-center md:mx-px sm:px-4 px-10">{student.study.Faculty}</div>
                                </div>
                                <div className="flex justify-start">
                                    <div className="font-bold  items-start">Tình trạng:</div>
                                    <div className="items-center md:mx-px sm:px-4 px-10">{student.study.Condition}</div>
                                </div>
                            </div>

                    
                            <div className="xl:flex justify-between">
                                <div className="flex justify-start">
                                    <div className="font-bold  items-start">Ngành đào tạo:</div>
                                    <div className="items-center md:mx-px sm:px-4 px-10">{student.study.Major}</div>
                                </div>
                                <div className="flex justify-start">
                                    <div className="font-bold  items-start">Chương trình đào tạo:</div>
                                    <div className="items-center md:mx-px sm:px-4 px-10">{student.study.Program}</div>
                                </div>
                            </div>

                            <div className="xl:flex justify-between">
                                <div className="flex justify-start">
                                    <div className="font-bold  items-start">Lớp:</div>
                                    <div className="items-center md:mx-px sm:px-4 px-10">{student.study.Class}</div>
                                </div>
                                <div className="flex justify-start">
                                    <div className="font-bold  items-start">GVCN:</div>
                                    <div className="items-center md:mx-px sm:px-4 px-10">{student.study.Teacher}</div>
                                </div>
                            </div>

                            <div className="md:flex justify-start">
                                    <div className="font-bold  items-start">Thời gian đào tạo tối đa:</div>
                                    <div className="items-center md:mx-px sm:px-4 px-10">{student.study.Timeline}</div>
                            </div>
                        </div>    
                    </div>
                    
                </div>

            </div>
        </div>
    );
}

export default MainInfo