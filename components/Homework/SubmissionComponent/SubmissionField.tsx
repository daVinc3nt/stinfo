import React from 'react';
import { useState, useEffect} from 'react';
import SubmitButton from './FinishSubmissionButton';
import { SubmissionProps, Deadline } from '../Utilities/interfaceProps';
import { SubmissionFieldUtils } from '../Utilities/utils_homework';
import ScoreField from './ScoreField';
import { HomeworkSubmissionData} from "@/components/Homework/Data";

// This component is a container for the submission field of a quiz
const SubmissionField = () => {
	const [file, setFile] = useState<File | null>(HomeworkSubmissionData.submissionFile);
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [isGraded, setIsGraded] = useState<boolean>(HomeworkSubmissionData.isGraded);
	const [deadlineState, setDeadlineState] = useState<Deadline>(HomeworkSubmissionData.isDeadline);
	const [timeLeft, setTimeLeft] = useState<string>(HomeworkSubmissionData.calculateTimeLeft());
	const [lastModifiedTime, setLastModifiedTime] = useState<string>(HomeworkSubmissionData.lastModifiedTime);

	// useEffect when the file change (after the file is uploaded), update isSubmitted, isBeforeDeadline state
	
	useEffect(() => {
		// Warning: useEffect in this component run twice

		// If the file actually uploaded, set the isSubmitted state to true
		console.log("useEffect rendered");
		HomeworkSubmissionData.setNewFile(file);
		console.log(HomeworkSubmissionData);
		if (file) {
			HomeworkSubmissionData.setIsSubmitted(true);
			setIsSubmitted(true);
			HomeworkSubmissionData.setIsDeadline();
			setDeadlineState(HomeworkSubmissionData.isDeadline);
			setTimeLeft(HomeworkSubmissionData.calculateTimeLeft());
			HomeworkSubmissionData.setLastModifiedTime();
			setLastModifiedTime(HomeworkSubmissionData.lastModifiedTime);
			//console.log(HomeworkSubmissionData.isSubmitted);
		}


	}, [file]);

	console.log("component rendered");

	// gridStyles for the grid layout
	const gridStyles = 'border p-2 text-left ';
	return (
		<div className='block'>
			<SubmitButton file={file} uploadFile={setFile}/>
			<div className='grid grid-cols-[30%_70%] grid-rows-5 border border-gray-400 mx-8 shadow-lg'>
				<div className={gridStyles + "bg-gray-100"}> Trạng thái bài nộp</div>
				<div className={gridStyles + SubmissionFieldUtils.setIsSubmittedStyles(HomeworkSubmissionData.isSubmitted, HomeworkSubmissionData.isDeadline)} id="isSubmittedDiv">
					{
						HomeworkSubmissionData.isSubmitted ? 'Đã nộp' : 'Chưa nộp'
					}
				</div>
				<div className={gridStyles}> 
					Trạng thái chấm điểm
				</div>
				<div className={gridStyles}>
				{
					HomeworkSubmissionData.isGraded ? 'Đã chấm' : 'Chưa chấm'
				}
				</div>
				<div className={gridStyles + "bg-gray-100"}> Thời gian còn lại</div>
				<div className={gridStyles + "bg-gray-100"}> 
					{
						timeLeft
					}
				</div>
				<div className={gridStyles}> Chỉnh sửa lần cuối </div>
				<div className={gridStyles}>
					{
						lastModifiedTime
					}
				</div>
				<div className={gridStyles + "bg-gray-100"}> Nộp tập tin </div>
				<div className={`${gridStyles} break-words bg-gray-100`} id="submitFileDiv"> 
					{
						//
						file ? ( file.name ) : ('Không có tập tin')
					}
				</div>
			</div>
			{
				HomeworkSubmissionData.isGraded ? <ScoreField /> : null
			}
		</div>
	)
}

export default SubmissionField;