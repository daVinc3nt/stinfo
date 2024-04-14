import React from 'react'
import { HomeworkSubmissionData } from '../Data'

const ScoreInfo = () => {
	return (
		<div className=" bg-white border-b-2 text-3xl text-blue">
			<div className=''>
				Nhận xét và cho điểm
			</div>
		</div>
	)
}

const ScoreDate = () => {
	return (
		<div className=" bg-blue-100 mb-10 rounded text-black my-7 border-b-2  p-2 shadow-lg">
			<div>
				Ngày cho điểm: { HomeworkSubmissionData.gradedDate.toLocaleString() }
			</div>
		</div>
	)	
}

const ReviewField = () => {
	const gridStyles = 'border p-2 text-left ';
	return (
		<div className='grid grid-cols-[30%_70%] grid-rows-3 border border-gray-400 mx-8 shadow-lg '>
			<div className={gridStyles}> Giảng viên nhận xét</div>
			<div className={gridStyles}>
				{HomeworkSubmissionData.lecturerName}
			</div>
			<div className={gridStyles + "bg-gray-100"}> 
				Nhận xét
			</div>
			<div className={gridStyles + "bg-gray-100"}>
				{HomeworkSubmissionData.lecturerComment}
			</div>
			<div className={gridStyles}> Điểm số </div>
			<div className={gridStyles}>
				{HomeworkSubmissionData.score}
			</div>
		</div>
	)
}

function ScoreField() {
	return (
		<div className='my-8'>
			<ScoreInfo />
			<ScoreDate />
			<ReviewField />
		</div>

	)
}

export default ScoreField;