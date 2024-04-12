interface Parents {
    Name: string,
    Email: string,
    Phone: string,
    Job: string,
    Workplace: string,
}

interface Student {
    
    Identification: string,
    frontIdentification: string,
    backIdentification: string,
    Birthplace: string,
    PermanentResidence: string,
    

}

const student: Student = {
    
    Identification: "090707001111",
    frontIdentification: "https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg",
    backIdentification: "https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg",
    Birthplace: "American Thor",
    PermanentResidence: "Ho Chi Minh",
};
const parents: { Father:Parents, Mother:Parents }  = {
    Father: {
        Name: "Father's Name",
        Email: "father@example.com",
        Phone: "123456789",
        Job: "Father's Job",
        Workplace: "Father's Workplace",
    },
    Mother: {
        Name: "Mother's Name",
        Email: "mother@example.com",
        Phone: "987654321",
        Job: "Mother's Job",
        Workplace: "Mother's Workplace",
    }
}

export  const PersonalInfo = () => {
    return (
        <div className=" w-full min-h-screen border shadow-black shadow rounded-lg">
                <div className="flex justify-center items-center p-10 space-x-2">
                    <img 
                    src={student.frontIdentification}
                    alt="front_CCCD" 
                    className="w-[23%] h-[32%]"
                    />
                    <img 
                    src={student.backIdentification}
                    alt="back_CCCD" 
                    className="w-[23%] h-[32%]"
                    />
                </div>
                
                <div className="flex-col justify-center items-center px-7 mx-20 ">
                    <div className="w-[92%] h-[10rem] border rounded-lg shadow-sm shadow-teal-200 p-10">
                        <div className="flex-col justify-between items-start  space-y-3">
                            <div className=" grid grid-cols-3">
                                <div className="col-span-1 border shadow-md "> CCCD/CMND :</div>
                                <div className="col-span-2 border flex justify-evenly items-center">{student.Identification} </div>
                            </div>
                            <div className=" grid grid-cols-3">
                                    <div className="col-span-1 border shadow-md "> Nơi sinh :</div> 
                                    <div className="col-span-2 border flex justify-evenly items-center">Số thẻ: {student.Birthplace} </div>
                            </div>
                            <div className=" grid grid-cols-3">
                                <div className="col-span-1 border shadow-md "> Hộ khẩu thường trú :</div>
                                <div className="col-span-2 border flex justify-evenly items-center ">Số thẻ: {student.PermanentResidence} </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="p-4 space-y-6">
                    <div className="flex mt-2 items-center justify-center h-[42px] w-full text-white text-2xl bg-sky-500 rounded-xl">Họ tên cha : {parents.Father.Name}</div>
                    <div className="flex space-x-[18rem] justify-start items-center px-2  text-xl">
                        <div className="flex space-x-5">
                            <div className="shadow-md">Email :</div>
                            <div> {parents.Father.Email}</div>
                        </div> 
                        <div className="flex space-x-3">
                            <div className="shadow-md">SĐT:</div>
                            <div>{parents.Father.Phone}</div>
                        </div> 
                    </div>
                    <div className="flex space-x-[18rem] justify-start items-center px-2  text-xl">
                        <div className="flex space-x-3">
                            <div className="shadow-md">Nghề nghiệp :</div>
                            <div>{parents.Father.Job}</div>
                        </div>
                        
                    </div>
                        <div className="flex justify-start items-center px-2  text-xl">
                            <div className="flex space-x-3">
                            <div className="shadow-md">Nơi công tác:</div>
                            <div>{parents.Father.Workplace}</div>
                        </div>
                    </div>
                </div>
                <div className="p-4 space-y-6">
                    <div className="flex mt-2 items-center justify-center h-[42px] w-full text-white text-2xl bg-sky-500 rounded-xl">Họ tên cha : {parents.Mother.Name}</div>
                    <div className="flex space-x-[18rem] justify-start items-center px-2  text-xl">
                        <div className="flex space-x-5">
                            <div className="shadow-md">Email :</div>
                            <div> {parents.Mother.Email}</div>
                        </div> 
                        <div className="flex space-x-3">
                            <div className="shadow-md">SĐT:</div>
                            <div>{parents.Mother.Phone}</div>
                        </div> 
                    </div>
                    <div className="flex space-x-[18rem] justify-start items-center px-2  text-xl">
                        <div className="flex space-x-3">
                            <div className="shadow-md">Nghề nghiệp :</div>
                            <div>{parents.Mother.Job}</div>
                        </div>
                        
                    </div>
                        <div className="flex justify-start items-center px-2  text-xl">
                            <div className="flex space-x-3">
                            <div className="shadow-md">Nơi công tác:</div>
                            <div>{parents.Mother.Workplace}</div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default PersonalInfo