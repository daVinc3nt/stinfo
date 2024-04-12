import React from 'react';

const FamilyInfo = () => {
    const student = {
        Address: "KTX DHQG àuihsdkjfhdsjkfsadkjfhks",
        Phone: "00000000000000",
        FamilyPhone: "1213333321321312",
    };

    const family = {
        Name: "Tran Thu Do",
        Phone: "1672",
        Email: "callme",
        FamilyContact: "dia chi lien lac",
        FamilyAddress: "dia chi theo ho khau",
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 w-full min-h-screen border shadow rounded-sm">
            <div className="w-full text-white text-2xl bg-sky-500 rounded-xl mb-4 px-4 py-2">
                Nơi ở hiện tại của sinh viên
            </div>
            <div className="w-full border border-gray-200 p-4 rounded-xl mb-4">
                <div className="mb-2">
                    Số nhà/tên đường: {student.Address}
                </div>
                <div className="mb-2">
                    Số điện thoại liên lạc: {student.Phone}
                </div>
                <div>
                    Số điện thoại gia đình: {student.FamilyPhone}
                </div>
            </div>
            <div className="w-full text-white text-2xl bg-sky-500 rounded-xl mb-4 px-4 py-2">
                Người thân liên lạc khi cần thiết
            </div>
            <div className="w-full border border-gray-200 p-4 rounded-xl">
                <div className="mb-2">
                    Họ và tên: {family.Name}
                </div>
                <div className="mb-2">
                    Số điện thoại liên lạc: {family.Phone}
                </div>
                <div className="mb-2">
                    Email: {family.Email}
                </div>
                <div className="mb-2">
                    Địa chỉ liên hệ: {family.FamilyContact}
                </div>
                <div>
                    Địa chỉ theo hộ khẩu: {family.FamilyAddress}
                </div>
            </div>
        </div>
    );
};

export default FamilyInfo;
