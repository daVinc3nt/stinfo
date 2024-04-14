
export default function Result() {
    const result = [
        {
            courseID: "AS3083",
            name: "Cơ học vật rắn biến dạng ",
            numofCredit: 4,
        },

        {
            courseID: "AS3085",
            name: "Lập trình tính toán ckt ",
            numofCredit: 3,
        },

        {
            courseID: "AS3087",
            name: "Cơ sở vật lý y sinh ",
            numofCredit: 3,
        },

        {
            courseID: "AS3089",
            name: "Thực tập kỹ thuật (nt) ",
            numofCredit: 1,
        },

        {
            courseID: "AS3091",
            name: "Phân tích số liệu tnnc ",
            numofCredit: 3,
        },

        {
            courseID: "AS3093",
            name: "Phương pháp phần tử hhưd ",
            numofCredit: 3,
        },

        {
            courseID: "AS3097",
            name: "Ứng xử cơ học của vật liệu ",
            numofCredit: 3,
        },
    ]
    return (
        <div className="p-4 border rounded-lg bg-green-300">
            <div className="text-center mb-4">Kết quả đăng ký</div>
            <div className="grid grid-cols-3 gap-3">
                {
                    result.map((item) => {
                        return (
                            <div className="border flex flex-col rounded-lg hover:shadow-md">
                                <div className="relative bg-green-200 flex items-center rounded-t-lg justify-center h-10">
                                    {item.name}
                                </div>
                                <div className="p-2 bg-white flex-1 flex flex-col rounded-b-lg">
                                    <div>Mã môn học: {item.courseID}</div>
                                    <div>Số tín chỉ: {item.numofCredit}</div>
                                    <div>Giảng viên: Đang cập nhật</div>
                                    <div>Lớp học: </div>
                                    <div>Thời gian học: </div>
                                </div>
                            </div>
                        )
                    })

                }
            </div>
        </div>
    )
}
