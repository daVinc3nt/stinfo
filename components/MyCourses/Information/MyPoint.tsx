


const MyPoint = () => {
    return (
        <div className="rounded-md rounded-gray-100 border shadow-sm shadow-gray-100 w-full p-10 m-8">
            <div className="uppercase text-3xl p-4 text-slate-500" > Báo cáo người dùng - Tên sinh viên</div>
            <div className="mx-10 font-bold text-2xl py-8">LTNC (MT100)_Nguyen Tran Thuan (CQ_HK232)</div>
            <div className="border-y-2 grid grid-cols-7 flex justify-items-center"> 
                <div>Mục điểm</div>
                <div>Trọng số</div>
                <div>Điểm</div>
                <div>Phạm vi</div>
                <div>Tỷ lệ phần trăm</div>
                <div>Thông tin phản hồi</div>
                <div>Contribution to course total</div>		
            </div>
            <div className="border-y-2 grid grid-cols-7 flex justify-items-center"> 
                <div>Tổng cộng khóa học</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>		
            </div>
        </div>
    )
}

export default MyPoint