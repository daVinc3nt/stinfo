interface medical {
    photoBHYT:      string,
    BHYT:           string,
    BHTN:           string,
    MedicalReport:  string,
    Vaccine:        string,
    MedicalRecord:  string,
};

export const MedicalInfo = () => {
    const student: medical = {
        photoBHYT: "https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg",
        BHYT: "3128974639824",
        BHTN:  "312423142314",
        MedicalReport:  "124324123",
        Vaccine:        "HIV Lào Giang Mai Ung Thư  Thoái hóa khớp",
        MedicalRecord: "Không có"
    }
    return (        
        <div className="w-full min-h-screen p-10 
                        border shadow-gray-200 shadow-sm rounded-lg">
                <div className="flex justify-center items-center ">
                    <img 
                    src={student.photoBHYT}
                    alt="BHYT" 
                    className="h-[75%] w-[70%] md:h-[62%] md:w-[42%] rounded-xl shadow-xl shadow-gray-100  mx-4"
                    />
                </div>

                <div className="justify-center items-center
                                w-full py-6  space-y-6">
                    <div className="w-[98%] h-[42%] px-2 py-6 md:p-10 
                                    border rounded-lg shadow-sm shadow-teal-200">
                            <div className="space-y-3 text-lg">
                                <div className="md:flex justify-start border-solid">
                                    <div className="font-bold  items-start">Sổ y tế:</div>
                                    <div className="items-center md:mx-auto px-8">Số sổ: {student.MedicalReport} </div>
                                </div>
                                <div className="md:flex justify-start border-solid">
                                    <div className="font-bold  items-start">BHYT:</div>
                                    <div className="items-center md:mx-auto px-8">Số thẻ: {student.BHYT}</div>
                                </div>
                                <div className="md:flex justify-start border-solid">
                                    <div className="font-bold  items-start">BHTN:</div>
                                    <div className="items-center md:mx-auto px-8">Số thẻ: {student.BHTN}</div>
                                </div>
                                
                            </div>
                    </div>
                    
                    <div className="w-[98%] h-[42%] px-2 py-6 md:p-10 
                                    border rounded-lg shadow-sm shadow-teal-200">
                            <div className=" space-y-3 text-lg">
                                <div className="md:flex justify-start border-solid">
                                        <div className="font-bold  items-start">Tiêm chủng và vaccine:</div>
                                        <div className="items-center md:mx-auto px-8 ">{student.Vaccine} </div>
                                </div>
                                <div className="md:flex justify-start border-solid">
                                        <div className="font-bold  items-start">Lịch sử bệnh lý:</div>
                                        <div className="items-center md:mx-auto px-8 ">{student.MedicalRecord} </div>
                                </div>
                            
                            </div>
                    </div> 
                </div>
              
        </div>  
    )
}

export default MedicalInfo