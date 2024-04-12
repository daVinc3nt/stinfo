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
        Email: "nguyenvana@example.com",
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
    return ( /*
        <div className=" w-full min-h-screen col-span-2 bg-light-primary-500 text-white">
            
            <div className="flex flex-col items-center justify-center">
                <div  className=" pt-4" >{student.personal.Avatar }</div>
                <div className="mt-2 items-center justify-center rounded-xl w-34 h-30 bg-blue-200 text-black">
                    
                    <div className="space-x-2 text-2xl"> 
                        
                    </div>
                </div>
            </div>
            
            <div className="space-y-4 p-2 mt-4 md:text-xl">
                <div className="space-y-3">
                   
                </div>
               
            </div>
        </div> */
        <div className=" w-full min-h-screen border shadow-gray-200 shadow-xl rounded-lg p-10">
              <div className="flex justify-center items-center  ">
                <img 
                src={student.personal.Avatar}
                alt="Avatar" 
                className=" h-[178px] w-[240px] md:h-[62%] md:w-[42%] rounded-xl shadow-xl shadow-gray-100  mx-4"
                />
              </div>

            <div className=" ">
                <div className="p-4 space-y-6">
                    <div className="flex mt-2 items-center justify-center h-[42px] w-full text-white text-2xl bg-sky-500 rounded-xl">Thông tin chung</div>
                    <div className="md:flex md:space-x-[18rem] justify-start items-center px-2  text-xl">
                        <div className="flex space-x-5">
                            <div className="font-bold">Họ và tên:</div>
                            <div> {student.personal.Name}</div>
                        </div> 
                        <div className="flex space-x-3">
                            <div className="shadow-md">MSSV:</div>
                            <div>{student.personal.StudentID}</div>
                        </div> 
                    </div>
                    <div className="flex space-x-[18rem] justify-start items-center px-2  text-xl">
                        <div className="flex space-x-3">
                            <div className="shadow-md">Ngày tháng năm sinh:</div>
                            <div>{student.personal.BirthDay}</div>
                        </div>
                        
                    </div>
                        <div className="flex justify-start items-center px-2  text-xl space-x-3" >
                            <div className="shadow-md">Giới tính:</div>
                            <div>{student.personal.Sex ? "Nam" : "Nữ"}</div>
                        </div>
                        <div className="flex justify-start items-center px-2  text-xl">
                            <div className="flex space-x-3">
                            <div className="shadow-md">Email:</div>
                            <div>{student.personal.Email}</div>
                        </div>
                    </div>
                </div>
                
                <div className="p-4 space-y-6">
                    <div className="flex mt-2 items-center justify-center h-[42px] w-full text-white text-2xl bg-sky-500 rounded-xl">Thông tin học vụ</div>
                    <div className="flex justify-between items-center px-2  text-xl" >
                        <div className="flex space-x-3">
                            <div className="shadow-md">Khoa quản lý:</div>
                            <div>{student.study.Faculty}</div>
                        </div> 
                        <div className="flex space-x-2">
                            <div className="shadow-md">Tình trạng :</div>
                            <div> {student.study.Condition}</div>
                        </div> 
                    </div>
                    <div className="flex justify-start items-center px-2  text-xl">
                        <div className="flex space-x-1 items-start">
                                <div className="shadow-md">Ngành:</div>
                                <div>{student.study.Major}</div> 
                            </div>
                            <div className="flex space-x-1 items-end">
                                <div className="shadow-md">Chương trình đạo tạo:</div>
                                <div>{student.study.Program}</div>
                            </div>
                    </div>
                    <div className="flex justify-start items-center px-2 space-x-[12rem] text-xl" >
                        <div className="flex space-x-3">
                            <div className="shadow-md">Lớp:</div>
                            <div>{student.study.Class}</div>
                        </div> 
                        <div className="flex space-x-2">
                            <div className="shadow-md">GVCN : </div>
                            <div>{student.study.Teacher}</div>
                        </div> 
                    </div>
                    <div className="flex justify-start items-center px-2  text-xl">
                        <div className="flex space-x-2">
                            <div className="shadow-md">Thời gian đào tạo tối đa: </div>
                            <div>{student.study.Timeline}</div>
                        </div>
                       
                    </div>
                </div>

            </div>

        </div>
    );
}

export default MainInfo