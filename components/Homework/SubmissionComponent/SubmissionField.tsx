import React from 'react';
import { useState, useEffect } from 'react';
import SubmitButton from './FinishSubmissionButton';
import { SubmissionProps, Deadline } from '../Utilities/interfaceProps';
import { SubmissionFieldUtils } from '../Utilities/utils_homework';
import ScoreField from './ScoreField';
import { HomeworkSubmissionData, storeUserAPIAHomeworkArgs } from "@/components/Homework/Data";
import { ClassOperation, StudentOperation, TeacherOperation, token, ClassID, SubmitFile } from '@/ambLib/amb';


// This component is a container for the submission field of a quiz
const SubmissionField = (props: { role: string }) => {
	// create a useState to store a list of Files
	const [file, setFile] = useState<SubmitFile | null>(null);
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [isGraded, setIsGraded] = useState<boolean>(HomeworkSubmissionData.isGraded);
	const [deadlineState, setDeadlineState] = useState<Deadline>(HomeworkSubmissionData.isDeadline);
	const [timeLeft, setTimeLeft] = useState<string>(HomeworkSubmissionData.calculateTimeLeft());
	const [lastModifiedTime, setLastModifiedTime] = useState<string>(HomeworkSubmissionData.lastModifiedTime);
	const [role, setRole] = useState<string>(props.role); // the role will be taken from login page
	const [classID, setClassID] = useState<ClassID>(storeUserAPIAHomeworkArgs.classID);
	const [className, setClassName] = useState<string>("");
	const [score, setScore] = useState<number>(0);
	const [loadingState, setLoadingState] = useState<boolean>(false);
	const [token, setToken] = useState<token>(storeUserAPIAHomeworkArgs.currentToken);
	const [isUploadError, setIsUploadError] = useState<boolean>(false);
	const [listFileName, setListFileName] = useState<string[]>([]);
	const [numOfFile, setNumOfFile] = useState<number>(0);

	// useEffect to get list of submit file
	useEffect(() => {
		const operation = new ClassOperation();
		if (token && classID) {
			operation.showSubmitFile({ class_id: String(classID) }, token)
				.then(data => {
					const getData = data;
					if (getData.data) {
						// console.log("list of submit File: ", getData);
						setListFileName(getData.data);
						setNumOfFile(getData.data.length);
					}
				}
				)
		}
	}, []);

	// useEffect when the file change (after the file is uploaded), update isSubmitted, isBeforeDeadline state
	useEffect(() => {
		// Warning: useEffect in this component run twice
		const operation = new ClassOperation();
		if (file) {
			console.log("upload file to local: ", file);
			console.log("token from uploading: ", token);
			console.log("classID from uploading: ", classID);
			operation.submitFile(file, { class_id: String(classID) }, token)
				.then(response => {
					// console.log("File submitted: ", response.error);
					if (response.error) {
						setIsUploadError(true);
						console.log("UPLOAD FAILED!!");
					}
					else {
						HomeworkSubmissionData.setNewFile(file);
						setIsUploadError(false);
						console.log("UPLOAD SUCCESS!!");
						// setNumOfFile(numOfFile => numOfFile + 1);
					}
				})
		}
		// // console.log(HomeworkSubmissionData);
		if (listFileName != null && listFileName.length > 0) {
			HomeworkSubmissionData.setIsSubmitted(true);
			setIsSubmitted(true);
			HomeworkSubmissionData.setIsDeadline();
			setDeadlineState(HomeworkSubmissionData.isDeadline);
			setTimeLeft(HomeworkSubmissionData.calculateTimeLeft());
			HomeworkSubmissionData.setLastModifiedTime();
			setLastModifiedTime(HomeworkSubmissionData.lastModifiedTime);
			//console.log(HomeworkSubmissionData.isSubmitted);
		}

		if (token && classID) {
			operation.showSubmitFile({ class_id: String(classID) }, token)
				.then(data => {
					const getData = data;
					if (getData) {
						// console.log("list of submit File: ", getData);
						setListFileName(getData.data);
						if (getData.data) {
							// setNumOfFile(getData.data.length);
						}

					}
				}
				)
		}

	}, [file, numOfFile]);

	// This component only inside the SubmissionField component
	const ShowUploadFile = () => {
		if (listFileName) {
			if (isUploadError == true) {
				return (
					<div className="bg-red-500">
						Chỉ có thể nộp file PDF
					</div>
				)
			} else {
				return (
					<div className='bg-green-200'>
						{
							// show all the File Name based on listFileName
							listFileName.map((fileName, index) => {
								return (
									<div key={index}>
										{fileName}
									</div>
								)
							})
						}
					</div>
				)
			}
		}
		else {
			return (
				<div>
					Không có tập tin
				</div>
			)
		}
	}

	const DeleteFileButton = (props: { deletedFileName: string }) => {
		// design style for delete button

		const operation = new ClassOperation();
		const handleDelete = () => {
			operation.deleteSubmitFile({ class_id: String(classID), filename: props.deletedFileName }, token)
				.then(response => {
					console.log("delete file: ", response);
					setNumOfFile(numOfFile => numOfFile + 1);
				}
				)
		}

		console.log("deletedFileName: ", props.deletedFileName);

		return (
			<button
				onClick={handleDelete}
				className='bg-red-300 text-center block w-full text-black border rounded-md hover:bg-red-500 h-full'>
				Xóa
			</button>
		);
	}

	// gridStyles for the grid layout
	const gridStyles = 'border p-2 text-left ';


	if (!loadingState) {
		return (
			<div className='block'>

				{
					role === "student" ? <SubmitButton file={file} uploadFile={setFile} /> : null
				}
				{
					listFileName? 
					(
					<div className='grid grid-cols-[80%_20%] grid-rows-1 border border-gray-400 mx-8 shadow-lg my-3'>
						<div className={`${gridStyles} break-words bg-gray-100 grid grid-row-[${listFileName.length}]`}>
							<ShowUploadFile />
							{/* <ShowMultipleFileName /> */}
						</div>
						{
							// only show when role is student
							role === "student" ?
								(
									<div className={`grid grid-row-[${listFileName.length}]`}>
										{
											// show delete button for each file
											listFileName.map((fileName, index) => {
												return (
													<div key={index}>
														<DeleteFileButton deletedFileName={fileName} />
													</div>
												)
											})
										}
									</div>
								) : null
						}

					</div>
					) : null
				}


				<div className='grid grid-cols-[30%_70%] grid-rows-4 border border-gray-400 mx-8 shadow-lg'>
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

				</div>
				{
					HomeworkSubmissionData.isGraded ? <ScoreField /> : null
				}
			</div>
		)
	}
	else {
		return (
			<div>
				Loading...
			</div>
		)
	}

}

export default SubmissionField;