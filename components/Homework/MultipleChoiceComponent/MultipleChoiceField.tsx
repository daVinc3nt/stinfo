import React from 'react'
import { HomeworkMultipleChoiceData } from '../Data'
import { useRouter } from 'next/router';

const SubmitButton = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/dashboard/multiple_choice');
    }

    return (
        <div className="py-3">
             {/* the input element actually upload the file, but hidden from the UI, the button will 
             trigger the onChange event */}
            <button
                className="bg-blue-500 text-center block py-3 px-4 text-white border rounded-md hover:bg-blue-800" 
                onClick={handleClick}
            >
                Bắt đầu làm bài
            </button>
        </div>
    )
}

const ReviewField = () => {
    return (
        <div className=' py-3 border border-gray-500 rounded-lg'>
            <div className='grid grid-cols-[10%_50%_20%_20%] px-2'>
                <div>STT</div>
                <div>Ngày làm bài</div>
                <div>Điểm</div>
                <div>Xem lại</div>
            </div>
            {
                    HomeworkMultipleChoiceData.listOfAttempts.map((attempt, index) => {
                        return (
                            <div key={index} className='grid grid-cols-[10%_50%_20%_20%] px-2 py-3'>
                                <div>{index + 1}</div>
                                <div>{attempt.gradedDate.toDateString()}</div>
                                <div>{attempt.score}</div>
                                <div>
                                    <button className='bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-800'>Xem</button>
                                </div>
                            </div>
                        )
                    })
                }
        </div>
    )
}

const MultipleChoiceField = () => {
    return (
        <div className='block'>
            <SubmitButton />
            <ReviewField />
        </div>
    )
}

export default MultipleChoiceField