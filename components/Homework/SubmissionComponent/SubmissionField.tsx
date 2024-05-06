import React from 'react';
import { useState, useEffect } from 'react';
import { SubmissionProps, Deadline } from '../Utilities/interfaceProps';
import { SubmissionFieldUtils } from '../Utilities/utils_homework';
// import ScoreField from './ScoreField';
import { HomeworkSubmissionData, storeUserAPIAHomeworkArgs } from "@/components/Homework/Data";
import { ClassOperation, StudentOperation, TeacherOperation, token, ClassID, SubmitFile } from '@/ambLib/amb';
import Cookies from "js-cookie";
import { list } from '@material-tailwind/react';

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
	const [classID, setClassID] = useState<ClassID>({ class_id: if (typeof window !== "undefined") window.localStorage.getItem("currentClassID") });
	const [score, setScore] = useState<number>(0);
	const [loadingState, setLoadingState] = useState<boolean>(false);
	const [token, setToken] = useState<token>({ token: if (typeof window !== "undefined") window.localStorage.getItem("currentRole") });
	const [isUploadError, setIsUploadError] = useState<boolean>(false);
	const [listFileName, setListFileName] = useState<string[]>([]);
	const [numOfFile, setNumOfFile] = useState<number>(0);
	const [diffNumOfFile, setDiffNumOfFile] = useState<number>(0);

	// useEffect to get list of submit file

	useEffect(() => {
		setRole(if (typeof window !== "undefined") window.localStorage.getItem("currentRole"));
		setClassID({ class_id: if (typeof window !== "undefined") window.localStorage.getItem("currentClassID") });
		const currentToken = Cookies.get("userToken");
		// console.log("currentToken: ", currentToken);
		setToken({ token: currentToken });
		// console.log("Update token Cookies!: ", Cookies.get("userToken"));
		// console.log("Real token cookie: ", token)

		// return () => {
		// 	// cleanup localStorage
		// 	if (typeof window !== "undefined") window.localStorage.removeItem("currentRole");
		// 	if (typeof window !== "undefined") window.localStorage.removeItem("currentClassID");
		// 	if (typeof window !== "undefined") window.localStorage.removeItem("currentCourseName");
		// }

	}, [
		if (typeof window !== "undefined") window.localStorage.getItem("currentRole"),
		if (typeof window !== "undefined") window.localStorage.getItem("currentClassID"),
		if (typeof window !== "undefined") window.localStorage.getItem("currentCourseName"),
	]);

	useEffect(() => {
		const operation = new ClassOperation();
		if (token && classID.class_id) {
			operation.showSubmitFile({ class_id: String(classID.class_id.toString()) }, token)
				.then(data => {
					const getData = data;
					if (getData.data) {
						// console.log("list of submit File: ", getData);
						setListFileName(getData.data);
						setNumOfFile(getData.data.length);
						console.log("showSubmitFile run from 1st load");
					}
				}
				)
		}
	}, [token]);

	// useEffect when the file change (after the file is uploaded), update isSubmitted, isBeforeDeadline state
	useEffect(() => {
		// Warning: useEffect in this component run twice
		// const operation = new ClassOperation();
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

		const operation = new ClassOperation();
		if (token && classID.class_id) {
			operation.showSubmitFile({ class_id: String(classID.class_id.toString()) }, token)
				.then(data => {
					const getData = data;
					if (getData.data) {
						// console.log("list of submit File: ", getData);
						setListFileName(getData.data);
						setNumOfFile(getData.data.length);
						console.log("showSubmitFile run from 1st load");
					}
				}
				)
		}

	}, [numOfFile]);

	console.log("numOfFile: ", numOfFile);
	console.log("diffNumOfFile: ", diffNumOfFile);

	// This component only inside the SubmissionField component
	const ShowUploadFile = () => {
		if (listFileName && listFileName.length > 0) {
			return (
				<div className='bg-green-200 p-2'>
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
		else {
			return (
				<div>
					Không có tập tin
				</div>
			)
		}
	}

	const SubmitFileButton = () => {

		const handleClick = () => {
			const getFileInputElement = document.getElementById('selected_file');
			getFileInputElement.click();
		};

		return (
			<div className="py-3">
				 {/* the input element actually upload the file, but hidden from the UI, the button will 
				 trigger the onChange event */}
				<input type='file' id="selected_file" className=' hidden' 
					onChange={(event) => {
					// handle file change and upload file
					let newFile: SubmitFile;
					if (event.target.files && event.target.files.length > 0) {
						newFile = {
							submitFile : event.target.files[0]
						}
						setFile(newFile);
						console.log(newFile);
					}

					const operation = new ClassOperation();
					if (newFile) {
						console.log("upload file to local: ", newFile);
						console.log("token from uploading: ", token);
						console.log("classID from uploading: ", classID);
						operation.submitFile(newFile, { class_id: String(classID.class_id) }, token)
							.then(response => {
								// console.log("File submitted: ", response.error);
								if (response.error) {
									setIsUploadError(true);
									console.log("UPLOAD FAILED!!");
								}
								else {
									HomeworkSubmissionData.setNewFile(newFile);
									setIsUploadError(false);
									console.log("UPLOAD SUCCESS!!");
									setNumOfFile(numOfFile => numOfFile + 1);
									setFile(newFile);
								}
							})
					}
				}}
					onClick={(event) => {
						// reset the input element value to allow the same file to be uploaded
						event.currentTarget.value = '';
				}}>
				</input>
				<button
					className="bg-blue-500 text-center block py-3 px-4 text-white border rounded-md hover:bg-blue-800" 
					onClick={handleClick}>
					Thêm bài nộp
				</button>
				{
					isUploadError ? <div className="text-red-500 ml-2">Chỉ có thể nộp file PDF</div> : null
				}
			</div>
		);
	}

	const DeleteFileButton = (props: { deletedFileName: string }) => {
		const [deleteText, setDeleteText] = useState<string>("Xóa");
		const [deleteStyle, setDeleteStyles] = useState<string>("bg-red-300")
		// design style for delete button

		const operation = new ClassOperation();
		const handleDelete = () => {
			setDeleteText("Đang xóa");
			setDeleteStyles("bg-gray-300 hover:bg-gray-500");
			operation.deleteSubmitFile({ class_id: String(classID.class_id), filename: props.deletedFileName }, token)
				.then(response => {
					// console.log("delete file: ", response);
					setNumOfFile(numOfFile => numOfFile - 1);
					setDiffNumOfFile(diffNumOfFile => diffNumOfFile - 1);
				}
				)
				.then(() => {
					if (token && classID) {
						operation.showSubmitFile({ class_id: String(classID.class_id) }, token)
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
				})

		}

		// console.log("deletedFileName: ", props.deletedFileName);

		return (
			<button
				onClick={handleDelete}
				className={`${deleteStyle} text-center block w-full text-black border hover:bg-red-500 h-full`}>
				{
					deleteText
				}
			</button>
		);
	}

	// gridStyles for the grid layout
	const gridStyles = 'border text-left';


	if (!loadingState) {
		return (
			<div className='block'>

				{
					role === "student" ? <SubmitFileButton /> : null
				}
				{
					listFileName ?
						(
							<div className='grid grid-cols-[80%_20%] grid-rows-1 border border-gray-400 mx-8 shadow-lg my-3'>
								<div className={`${gridStyles} break-words bg-gray-100 grid grid-row-[${listFileName.length}]`}>
									<ShowUploadFile />
								</div>
								{
									// only show when role is student
									role === "student" ?
										(
											<div className={`grid grid-row-[${listFileName.length}]`}>
												{

													// show delete button for each 
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


				<div className='grid grid-cols-[30%_70%] grid-rows-1 border border-gray-400 mx-8 shadow-lg'>
					<div className={gridStyles + "bg-gray-100 p-2"}> Trạng thái bài nộp</div>
					<div className={gridStyles + SubmissionFieldUtils.setIsSubmittedStyles(HomeworkSubmissionData.isSubmitted, HomeworkSubmissionData.isDeadline, numOfFile)} id="isSubmittedDiv">
						{
							(numOfFile > 0) ? 'Đã nộp' : 'Chưa nộp'
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

function ScoreField() {


	return (
		<div className='my-8'>
			<ScoreInfo />
			{/* <ScoreDate /> */}
			<ReviewField />
		</div>

	)
}

const ScoreInfo = () => {
	return (
		<div className=" bg-white border-b-2 text-3xl text-blue">
			<div className=''>
				Điểm số
			</div>
		</div>
	)
}

const ReviewField = () => {
	const gridStyles = 'border p-2 text-left';
	return (
		<div className='grid grid-cols-[30%_70%] grid-rows-2 border border-gray-400 mx-8 shadow-lg my-6 '>
			<div className={gridStyles}> Giảng viên</div>
			<div className={gridStyles}>
				{if (typeof window !== "undefined") window.localStorage.getItem("currentTeacher")}
			</div>
			<div className={gridStyles}> Điểm số </div>
			<div className={gridStyles}>
				{if (typeof window !== "undefined") window.localStorage.getItem("currentScore")}
			</div>
		</div>
	)
}

const ScoreDate = () => {
	return (
		<div className=" bg-blue-100 mb-10 rounded text-black my-7 border-b-2  p-2 shadow-lg">
			<div>
				Ngày cho điểm: {HomeworkSubmissionData.gradedDate.toLocaleString()}
			</div>
		</div>
	)
}

export default SubmissionField;