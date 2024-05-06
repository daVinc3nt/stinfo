import React from 'react';

interface Student {
    Address: string;
    Phone: string;
    FamilyPhone: string;
}

interface Family {
    Name: string;
    Phone: string;
    Email: string;
    FamilyContact: string;
    FamilyAddress: string;
}

const FamilyInfo: React.FC = () => {
    const student: Student = {
        Address: "KTX DHQG HCM",
        Phone: "+8400000000",
        FamilyPhone: "+8400000000",
    };

    const family: Family = {
        Name: "Tran Thu Do",
        Phone: "+8400000000",
        Email: "callme@example.com",
        FamilyContact: "Địa chỉ liên lạc",
        FamilyAddress: "Địa chỉ theo hộ khẩu",
    };

    return (
        <div className="w-full min-h-screen p-10 md:p-4 border shadow-gray-200 shadow-sm rounded-lg">
            <div className="w-[98%] max-h-screen px-2 md:p-6 rounded-lg shadow-sm">
                <div className="w-full mb-4 px-4 py-2 font-bold text-white text-2xl bg-sky-500 rounded-xl">Nơi ở hiện tại của sinh viên</div>
                <div className="border border-gray-200 p-4 rounded-xl mb-4">
                    <div className="space-y-3 pl-10 text-lg">
                        <div className="md:flex justify-start border-solid">
                            <div className="font-bold items-start">Số nhà/tên đường:</div>
                            <div className="items-center md:mx-px px-8">{student.Address}</div>
                        </div>
                        <div className="md:flex justify-start border-solid">
                            <div className="font-bold items-start">Số điện thoại liên lạc:</div>
                            <div className="items-center md:mx-px px-8">{student.Phone}</div>
                        </div>
                        <div className="md:flex justify-start border-solid">
                            <div className="font-bold items-start">Số điện thoại gia đình:</div>
                            <div className="items-center md:mx-px px-8">{student.FamilyPhone}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[98%] max-h-screen px-2 md:p-6 rounded-lg shadow-sm">
                <div className="w-full mb-4 px-4 py-2 font-bold text-white text-2xl bg-sky-500 rounded-xl">Người thân liên lạc khi cần thiết</div>
                <div className="border border-gray-200 p-4 rounded-xl mb-4">
                    <div className="space-y-3 pl-10 text-lg">
                        <div className="md:flex justify-start border-solid">
                            <div className="font-bold items-start">Họ và tên:</div>
                            <div className="items-center md:mx-px px-8">{family.Name}</div>
                        </div>
                        <div className="md:flex justify-start border-solid">
                            <div className="font-bold items-start">Số điện thoại liên lạc:</div>
                            <div className="items-center md:mx-px px-8">{family.Phone}</div>
                        </div>
                        <div className="md:flex justify-start border-solid">
                            <div className="font-bold items-start">Email:</div>
                            <div className="items-center md:mx-px px-8">{family.Email}</div>
                        </div>
                        <div className="md:flex justify-start border-solid">
                            <div className="font-bold items-start">Địa chỉ liên hệ:</div>
                            <div className="items-center md:mx-px px-8">{family.FamilyContact}</div>
                        </div>
                        <div className="md:flex justify-start border-solid">
                            <div className="font-bold items-start">Địa chỉ theo hộ khẩu:</div>
                            <div className="items-center md:mx-px px-8">{family.FamilyAddress}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FamilyInfo;
