import NavItem from "@/components/Common/NavItem"
import React from "react"
import { useState } from "react" 
import ContactInfo from "@/context/ContactInfo"
import MedicaltInfo from "@/context/MedicalInfo"




const StuInfo = () => {
    const [page,setPage] = useState(<ContactInfo />)
    return (
        <div>
            <div className="flex w-full h-14 rounded-lg p-8 bg-blue-400 justify-between items-center text-3xl">
                <img 
                    src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"
                    className="flex w-20 h-20  rounded-full items-start justify-between " 
                    alt="" />
                <p className="flex p-2 space-x-2">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" 
                    stroke-width="1.5" stroke="currentColor" 
                    className="w-6 h-6 ">
                    <path stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                </svg>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" 
                    stroke-width="1.5" stroke="currentColor" 
                    className="w-6 h-6 ">
                    <path stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </p>
            </div>
            <div className="grid grid-cols-5 ">
                <div className="w-full h-screen bg-red-200 col-span-2 space-y-4">
                    <img 
                    src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"
                    className="w-40 h-40 py-1 rounded-full flex items-end justify-center mx-auto my-6" 
                    alt="" />
                   
                    <main className="space-y-14">
                        <div>
                            <div className="flex items-center justify-center p-1 ">Nguyen Van A</div>
                            <div className="flex items-center justify-center space-x-2">
                                <p>MSSV:</p> 
                                <p>23100000</p>
                            </div>
                        </div>
                        <div className="space-y-4">
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
               
                <div className="w-full h-screen bg-orange-300 col-span-3">
                    <NavItem/>
                    
                </div>

            </div>
        </div>
    )
}





export default StuInfo