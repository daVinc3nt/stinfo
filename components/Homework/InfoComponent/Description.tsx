import React from 'react'

// This component is a container for the quiz description
const HomeworkDescription = () => {
    return (
        <div className="bg-gray-100 rounded-xl shadow-sm p-2 my-2">
            <h1 className=' m-2'> Thông tin bài kiểm tra </h1>
            <ul className=' list-disc list-inside m-2'>
                <li>Report (pdf): Phân tích rõ ràng phương pháp làm và kết quả, tên file: L14(/16)_MSSV_Lab 2.pdf</li>
                <li>Code (Clean code, comment hợp lý)</li>
                <li>Makefile</li>
                <li>Exercise 1, 2 (Exercise 3, 4 làm thêm sẽ có bonus)</li>
            </ul>
        </div>
    )
}

export default HomeworkDescription