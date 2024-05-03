'use client';
import React, { useEffect, useState } from "react";
import Header from "@/components/Homework/Header";
import HomeworkContent from "@/components/Homework/Content";
import Info from "@/components/Homework/Info";
import { HomeworkType } from "@/components/Homework/Utilities/interfaceProps";
import { HomeworkGeneralData, storeUserAPIAHomeworkArgs } from "@/components/Homework/Data";
import {
	ClassOperation, StudentOperation, TeacherOperation, token,
	ClassID, FileName, SubmitFile,
	CourseID
} from '@/ambLib/amb';

const TeacherDownloadButton = (props: { classID: ClassID, userToken: token }) => {

	const operation = new ClassOperation();

	return (
		<div>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={() => {
					const operation = new ClassOperation();
					if (props.userToken) {
						operation.getSubmitFile({ class_id: String(props.classID) }, props.userToken)
							.then(data => {
								console.log("downloading file......................");
								const getData = data;
								if (getData) {
									console.log("downloadFile: ", getData);
								}
							}
							)
							.catch(error => {
								console.log("ERROR DOWNLOADING FILE!!: ", error);
							});
					}
				}
				}
			>
				Tải file bài làm về máy
			</button>
		</div>
	);
}

const Quiz = () => {
	const [role, setRole] = useState<string>("student");
	const [userToken, setUserToken] = useState<token>({ token: "" });
	const [getUserData, setUserData] = useState<any>(null);
	const [classID, setClassID] = useState<ClassID>(null);
	const [courseName, setCourseName] = useState<string>("");
	const [loadingState, setLoadingState] = useState<boolean>(true);
	const [file, setFile] = useState<File | null>(null);
	const [multipleFile, setMultipleFile] = useState<File[]>([]);

	// first useEffect to get token

	let student = new StudentOperation();
	let teacher = new TeacherOperation();
	// to get student token
	useEffect(() => {
		if (role == "student") {
			student.login("long.nguyen24243004", "Student@24243004")
				.then(data => {
					console.log("Data: ", data);
					const newToken = { token: data.token };
					if (newToken) {
						setUserToken(newToken);
						console.log("newToken: ", newToken.token);
					}
				});
		}
		else if (role == "teacher") {
			teacher.login("huy.bui53587", "huy.bui53587")
				.then(data => {
					console.log("Data: ", data);
					const newToken = { token: data.token };
					if (newToken) {
						setUserToken(newToken);
						console.log("newToken: ", newToken.token);
					}
				});
		}
	}, []);

	// second useEffect to get data
	useEffect(() => {
		if (userToken) {
			if (role == "student") {
				student.findStudentRegisteredClass({ token: userToken.token })
					.then(data => {
						const getData = data.data;
						if (getData) {
							console.log("newData: ", getData);
							setUserData(getData);
							let newClassID: ClassID = getData[0].class_id;
							setClassID(newClassID);
							// console.log("currentClassID: ", newClassID);
							setCourseName(getData[0].course_name);
						}
					}
					)
			}
			else if (role == "teacher") {
				teacher.findTeacherRegisteredClass({ token: userToken.token })
					.then(data => {
						const getData = data.data;
						if (getData) {
							console.log("newData: ", getData);
							setUserData(getData);
							let newClassID: ClassID = getData[2].class_id;
							setClassID(newClassID);
							setCourseName(getData[2].course_name);
						}
					}
				)
			}
		}

	}, [userToken]);

	if (classID && userToken && getUserData)
	{
		storeUserAPIAHomeworkArgs.setToken(userToken);
		// console.log("userToken: ", userToken);
		storeUserAPIAHomeworkArgs.setClassID(classID);
		// console.log("classID: ", classID);
	}

	if (getUserData == null) {

		return (
			<div className="block">
				<p>Loading...</p>
			</div>
		);
	}
	else {
		return (
			<div className=" block m-10">
				<Header header={`${courseName} - ${classID}`} />
				<Info />
				<HomeworkContent
					typeOfHomework={HomeworkGeneralData.whichHomeworkType}
					role={role}
				/>
				{role == "teacher" ? <TeacherDownloadButton classID={classID} userToken={userToken} /> : null}
			</div>
		);
	}


};

export default Quiz;