interface Parents {
    Name: string,
    Email: string,
    Phone: string,
    Job: string,
    Workplace: string,
};
interface Student {
    
    Identification: string,
    frontIdentification: string,
    backIdentification: string,
    Birthplace: string,
    PermanentResidence: string,
    

};

export  const ContactInfo = () => {
    const student: Student = {
    
        Identification: "090703001234",
        frontIdentification: "https://th.bing.com/th/id/OIP.8bss3pk_BMm06NPJfvQrHAHaDm?rs=1&pid=ImgDetMain",
        backIdentification: "https://th.bing.com/th/id/OIP.8bss3pk_BMm06NPJfvQrHAHaDm?rs=1&pid=ImgDetMain",
        Birthplace: "Ba Ria Vung Tau",
        PermanentResidence: "Ho Chi Minh",
    };
    const parents: { Father:Parents, Mother:Parents }  = {
        Father: {
            Name: "Father's Name",
            Email: "father@example.com",
            Phone: "+84000000000",
            Job: "Father's Job",
            Workplace: "Father'sWorkplace",
        },
        Mother: {
            Name: "Mother's Name",
            Email: "mother@example.com",
            Phone: "+84000000000",
            Job: "Mother's Job",
            Workplace: "Mother's Workplace",
        }
    };
    return (
        <div className=" w-full min-h-screen p-10
                         border shadow-gray-200 shadow-sm rounded-lg">
                <div className="md:flex justify-center items-center">
                    <img 
                    src={"https://th.bing.com/th/id/OIP.8bss3pk_BMm06NPJfvQrHAHaDm?rs=1&pid=ImgDetMain"}
                    alt="front_CCCD" 
                    className="h-[82%] w-[78%] md:h-[62%] md:w-[42%] rounded-xl shadow-xl shadow-gray-100  mx-auto"
                    />
                    <img 
                    src={"https://th.bing.com/th/id/OIP.8bss3pk_BMm06NPJfvQrHAHaDm?rs=1&pid=ImgDetMain"}
                    alt="back_CCCD" 
                    className="h-[82%] w-[78%] md:h-[62%] md:w-[42%] rounded-xl shadow-xl shadow-gray-100  mx-auto"
                    />
                </div>

                <div className="justify-center items-center
                                w-full py-3 md:py-6 space-y-2  md:space-y-6">
                     <div className="w-[98%] h-[42%] px-2 py-6 sm:p-10 
                                border rounded-lg shadow-sm shadow-teal-200">
                        <div className="w-full mb-4 px-4 py-2
                                font-bold text-white text-2xl bg-sky-500 rounded-xl">Họ và tên cha: {parents.Father.Name}</div>
                        <div className="border border-gray-200 p-4 rounded-xl mb-4">
                            <div className="space-y-3 pl-10 text-lg">
                                <div className="md:flex justify-start border-solid">
                                    <div className="font-bold  items-start">Email:</div>
                                    <div className="items-center md:mx-px sm:px-4 px-10">{parents.Father.Email}</div>
                                </div>
                                <div className="md:flex justify-start border-solid">
                                    <div className="font-bold  items-start">Số điện thoại:</div>
                                    <div className="items-center md:mx-px sm:px-4 px-10">{parents.Father.Phone}</div>
                                </div>
                                <div className="md:flex justify-start">
                                    <div className="font-bold  items-start">Nơi công tác:</div>
                                    <div className="items-center md:mx-px sm:px-4 px-10">{parents.Father.Workplace}</div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div >

                <div className="justify-center items-center
                                w-full py-3 md:py-6 space-y-2  md:space-y-6 ">
                     <div className="w-[98%] h-[42%] px-2 py-6 sm:p-10 
                                border rounded-lg shadow-sm shadow-teal-200">
                        <div className="w-full mb-4 px-4 py-2
                                font-bold text-white text-2xl bg-sky-500 rounded-xl">Họ và tên mẹ: {parents.Mother.Name}</div>
                        <div className="border border-gray-200 p-4 rounded-xl mb-4">
                            <div className="space-y-3 pl-10 text-lg">
                                <div className="md:flex justify-start border-solid">
                                    <div className="font-bold  items-start">Email:</div>
                                    <div className="items-center md:mx-px sm:px-4 px-10">{parents.Mother.Email}</div>
                                </div>
                                <div className="md:flex justify-start border-solid">
                                    <div className="font-bold  items-start">Số điện thoại:</div>
                                    <div className="items-center md:mx-px sm:px-4 px-10">{parents.Mother.Phone}</div>
                                </div>
                                <div className="md:flex justify-start">
                                    <div className="font-bold  items-start">Nơi công tác:</div>
                                    <div className="items-center md:mx-px sm:px-4 px-10">{parents.Mother.Workplace}</div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div >
               
        </div>
    )
}

export default ContactInfo