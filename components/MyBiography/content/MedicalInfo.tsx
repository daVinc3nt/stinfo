interface medical {
    photoBHYT:      string,
    BHYT:           string,
    BHTN:           string,
    MedicalReport:  string,
    Vaccine:        string,
    MedicalRecord:  string,
};
const student: medical = {
    photoBHYT: "https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg",
    BHYT: "3128974639824",
    BHTN:  "312423142314",
    MedicalReport:  "124324123",
    Vaccine:        "HIV",
    MedicalRecord: "Không có"
}
export const MedicalInfo = () => {
    return (
       /* <div className="px-4 pt-1 mt-3 space-y-8 ">
             <div className="flex items-center justify-center"> 
                        <script>ảnh BHYT</script>
                        <img src=
                           className="w-63 h-40" alt="" />
            </div>
           <p>Số sức khỏe</p>
           <p>Mã BHYT</p>
           <p>BH Tai nạn</p>
           <p>Thông tin về tình trạng sức khỏe:</p>
           <p>Lịch sử bệnh lý.</p>
           <p> Tiêm chủng và vaccine.</p>
            
           
        </div>*/
        <div className="w-full min-h-screen border shadow-gray-200 shadow-sm rounded-lg">
                <div className="flex justify-center items-center p-10 ">
                    <img 
                    src={student.photoBHYT}
                    alt="BHYT" 
                    className="w-[23%] h-[32%]"
                    />
                </div>
                    <div className="flex-col justify-center items-center px-7 mx-20 ">
                        <div className="w-[92%] h-[10rem] border rounded-lg shadow-sm shadow-teal-200 p-10">
                            <div className="flex-col justify-between items-start  space-y-3">
                                <div className=" grid grid-cols-3">
                                    <div className="col-span-1 border shadow-md "> Sổ y tế :</div>
                                    <div className="col-span-2 border flex justify-evenly items-center">Số sổ: {student.MedicalReport} </div>
                                </div>
                                <div className=" grid grid-cols-3">
                                    <div className="col-span-1 border shadow-md "> BHYT :</div> 
                                    <div className="col-span-2 border flex justify-evenly items-center">Số thẻ: {student.BHYT} </div>
                                </div>
                                <div className=" grid grid-cols-3">
                                    <div className="col-span-1 border shadow-md "> BHTN :</div>
                                    <div className="col-span-2 border flex justify-evenly items-center ">Số thẻ: {student.BHTN} </div>
                                </div>
                        </div>
                    </div>
                    <div className="w-[92%] h-[10rem] border rounded-lg shadow-sm shadow-teal-200 p-10">
                    <div className="flex-col justify-between items-start  space-y-3">
                            <div className=" grid grid-cols-3">
                                <div className="col-span-1 border shadow-md "> Tiêm chủng và vaccine :</div>
                                <div className="col-span-2 border flex justify-center items-center">{student.Vaccine} </div>
                            </div>
                            <div className=" grid grid-cols-3">
                                <div className="col-span-1 border shadow-md "> Lịch sử bệnh lý :</div>
                                <div className="col-span-2 border flex justify-center items-center">{student.MedicalRecord} </div>
                            </div>
                        </div>
                    </div> 
                </div>
              
        </div>
    )
}

export default MedicalInfo