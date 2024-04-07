import NavItemsContainer from "@/components/Common/NavItemsContainer"
import React from "react"





const info = () => {
    return (
            <div className='grid md:grid-cols-5 sm:justify-center sm:items-center'>
                <div className="md:first-letter:w-full h-full bg-red-200 md:col-span-2  space-y-3">
                    <img 
                    src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"
                    className="w-40 h-40 py-1 rounded-full flex items-end justify-center mx-auto my-3" 
                    alt="" />
                   
                    <main className="space-y-8">
                        <div>
                            <div className="flex items-center justify-center p-1 ">Nguyen Van A</div>
                            <div className="flex items-center justify-center space-x-2">
                                <p>MSSV:</p> 
                                <p>23100000</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <div className="flex space-x-2 " >
                                    <p> Ngày tháng năm sinh: </p>
                                    <p>12/12/2222</p>
                                </div>
                                <div className="flex space-x-2 ">
                                    <p>Giới tính:</p>
                                    <p>Nam</p>
                                </div>
                            </div>
                            <div className="flex space-x-2 ">
                                <p>Email:</p>
                                <p>bku-laungungbich@hcmut.edu.vn</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex space-x-1">
                                <div>Tình trạng:</div>
                                <p>Đau cột sống</p>
                            </div>
                            <div className="flex  justify-between items-start">
                               
                                <div className="flex  space-x-1">
                                    <p>Ngành: </p>
                                    <p>Khoa học máy tính</p> 
                                </div>
                                <div className="flex  space-x-1">
                                    <p>Chương trình đạo tạo: </p>
                                    <p>Chính quy (CQ)</p>
                                </div>
                            </div>
                            <div className="flex  space-x-1">
                                <p>Khoa quản lý:</p>
                                <p>Khoa Khoa học và Kỹ thuật máy tính </p>
                            </div>
                            <div className="flex  space-x-8">
                               
                               <div className="flex  space-x-1">
                                   <p>Lớp</p>
                                   <p>MT22KH00</p> 
                               </div>
                               <div className="flex  space-x-1">
                                   <p>GVCN</p>
                                   <p>Steven Jobs</p>
                               </div>
                           </div>
                           <div className="flex  space-x-1">
                                <p>Thời gian đào tạo tối đa:</p>
                                <p>12/2022-10/2028</p>
                            </div>
                        </div>
                      
                            
                    </main>
                </div>
                <div className=" bg-orange-300 md:col-span-3 flex-none overflow-y-scroll h-full ">
                    
                        <NavItemsContainer/>
                </div>

            </div>
    )
}





export default info