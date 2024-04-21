import { teacher } from "./information/teacherData";



export default function MyTeacher() {
    const {src,Name,TeacherID,BirthDay,Sex,Position,Duty,Phone,Email,Faculty,GroupID,Education,Achievement} = teacher
    return (
        <div className="space-y-8">
            <div className=" 
                            lg:grid grid-cols-4
                            border shadow-sm shadow-gray-200 rounded-md p-8 ">
               <img 
                src={src} 
                alt="Anh the" 
                className=" col-span-1
                            flex justify-center items-center
                            h-[85%] w-[92%] md:h-[42%] md:w-[34%] lg:h-[98%] lg:w-[87%]  mx-auto
                            rounded-sm shadow-sm shadow-white"
                />
                <div className=" col-span-3
                                w-full  
                                rounded-sm border shadow-sm shadow-gray-200 ">
                    <h1 className=" w-full p-4 uppercase font-bold text-center bg-light-primary-200 ">Thông tin cá nhân</h1>
                     <div className="space-y-3 text-lg my-6 p-4">
                        <div className="md:flex justify-start border-solid rounded-sm">
                            <div className="font-bold items-start mx-5">Tên giảng viên:</div>
                            <div className="items-center md:mx-auto px-8"> {Name} </div>
                        </div>
                        <div className="md:flex justify-start border-solid">
                                <div className="font-bold items-start mx-5">MSGV:</div>
                                <div className="items-center md:mx-auto px-8"> {TeacherID}</div>
                        </div>
                        <div className="md:flex justify-start border-solid">
                                <div className="font-bold items-start mx-5">Ngày tháng năm sinh:</div>
                                <div className="items-center md:mx-auto px-4"> {BirthDay}</div> 
                                <div className="font-bold items-start mx-5">Giới tính:</div>
                                <div className="items-center md:mx-auto px-8">{Sex ? "Nam" : "Nữ" } </div>        
                        </div>
                        <div className="md:flex justify-start border-solid">
                                <div className="font-bold items-start mx-5">Số điện thoại:</div>
                                <div className="items-center md:mx-auto px-8"> {Phone}</div>
                        </div>
                        <div className="md:flex justify-start border-solid">
                                <div className="font-bold items-start mx-5">Email:</div>
                                <div className="items-center md:mx-auto px-8"> {Email}</div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="border shadow-sm shadow-gray-200 rounded-md p-8">
               <div className="w-full  
                            rounded-sm border shadow-sm shadow-gray-200 ">
                    <h1 className="w-full p-4 uppercase font-bold text-center bg-light-primary-200 ">Thông tin giảng dạy</h1>
               </div>
               <div className="space-y-3 text-lg my-6 p-4">
                        <div className="md:flex justify-start border-solid rounded-sm">
                            <div className="font-bold items-start mx-5">Khoa quản lý:</div>
                            <div className="items-center md:mx-auto px-8"> {Faculty} </div>
                        </div>
                        <div className="md:flex justify-start border-solid">
                                <div className="font-bold items-start mx-5">Mã tổ:</div>
                                <div className="items-center md:mx-auto px-8"> {GroupID}</div>
                        </div>
                        <div className="md:flex justify-start border-solid">
                                <div className="font-bold items-start mx-5">Chức danh:</div>
                                <div className="items-center md:mx-auto px-4"> {Position}</div> 
                                <div className="font-bold items-start mx-5">Chức vụ:</div>
                                <div className="items-center md:mx-auto px-8">{Duty} </div>        
                        </div>
                        <div className="md:flex justify-start border-solid">
                                <div className="font-bold items-start mx-5">Học vị:</div>
                                <div className="items-center md:mx-auto px-8"> {Education}</div>
                        </div>
                        <div className="md:flex justify-start border-solid">
                                <div className="font-bold items-start mx-5">Thành tựu:</div>
                                <div className="items-center md:mx-auto px-8"> {Achievement}</div>
                        </div>
                    </div>
            </div> 
            
        
        </div>

       
    );
};



/* 
  <div className="w-full  p-10 
                        border shadow-gray-200 shadow-sm rounded-lg">
                
                </div>

                <div className="">

                </div>

              <div  className="space-y-3 text-lg">
              <div className="md:flex justify-start border-solid">
                                    <div className="font-bold  items-start">Mã tổ:</div>
                                    <div className="items-center md:mx-auto px-8"> {GroupID} </div>
                                </div>
                                <div className="md:flex justify-start border-solid">
                                    <div className="font-bold  items-start">Chức danh:</div>
                                    <div className="items-center md:mx-auto px-8"> {Position} </div>
                                </div>
                                <div className="md:flex justify-start border-solid">
                                    <div className="font-bold  items-start">Chức vụ:</div>
                                    <div className="items-center md:mx-auto px-8"> {Duty} </div>
                                </div>
                                <div className="md:flex justify-start border-solid">
                                    <div className="font-bold  items-start">Học vị:</div>
                                    <div className="items-center md:mx-auto px-8"> {Education} </div>
                                </div>
                                <div className="md:flex justify-start border-solid">
                                    <div className="font-bold  items-start">Thành tựu:</div>
                                    <div className="items-center md:mx-auto px-8"> {Achievement} </div>
                                </div>
              </div>

           
               
        </div>  


        */