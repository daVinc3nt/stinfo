import React, { useState, useEffect } from "react";
import Header from "@/components/Homework/Header";
import HomeworkContent from "@/components/Homework/Content";
import Info from "@/components/Homework/Info";
import { HomeworkGeneralData, storeUserAPIAHomeworkArgs } from "@/components/Homework/Data";
import { ClassOperation, StudentOperation, TeacherOperation, token, ClassID } from '@/ambLib/amb';
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Quiz () {  
	const [role, setRole] = useState<string>(window?.localStorage.getItem("role"));
	const [userToken, setUserToken] = useState<token>({ token: ""});
	const [getUserData, setUserData] = useState<any>(null);
	const [classID, setClassID] = useState<ClassID>({ class_id: window?.localStorage.getItem("classID")});
	const [courseName, setCourseName] = useState<string>(window?.localStorage.getItem("courseName"));
	const [loadingState, setLoadingState] = useState<boolean>(true);
	const [file, setFile] = useState<File | null>(null);
	const [multipleFile, setMultipleFile] = useState<File[]>([]);


	// first useEffect to get token
	let student = new StudentOperation();
	let teacher = new TeacherOperation();
	// to get student token
	useEffect(() => {
		setRole(window?.localStorage.getItem("currentRole"));
		setCourseName(window?.localStorage.getItem("currentCourseName"));
		setClassID({ class_id: window?.localStorage.getItem("currentClassID") });
		const currentToken = Cookies.get("userToken");
		// console.log("currentToken: ", currentToken);
		setUserToken({ token: currentToken });
		// console.log("Update token Cookies!: ", Cookies.get("userToken"));
		console.log("Real token cookie: ", userToken)
		console.log("DATA UPDATED!!");

		// return () => {
		// 	// cleanup localStorage
		// 	window?.localStorage.removeItem("currentRole");
		// 	window?.localStorage.removeItem("currentClassID");
		// 	window?.localStorage.removeItem("currentCourseName");
		// }

	}, [
		window?.localStorage.getItem("currentRole"),
		window?.localStorage.getItem("currentClassID"),
		window?.localStorage.getItem("currentCourseName"),
	]);

	// second useEffect to get data
	useEffect(() => {
		console.log("token has been updated!");
		if (userToken) {
			// console.log("role: ", role);
			if (role == "student") {
				student.findStudentRegisteredClass({ token: userToken.token })
					.then(data => {
						const getData = data.data;
						if (getData) {
							console.log("newData: ", getData);
							setUserData(getData);
							let newClassID: ClassID = getData[0].class_id;
							// setClassID(newClassID);
							// console.log("currentClassID: ", newClassID);
							// setCourseName(getData[0].course_name);
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
							// setClassID(newClassID);
							// setCourseName(getData[2].course_name);
						}
					}
					)
			}
		}

	}, [userToken]);

	if (role)
	{
		console.log("role: ", role);
	
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
			<div className="flex">
				<div className=" block m-10 flex-auto">
					<Header header={`${courseName} - ${classID.class_id}`} />
					<Info />
					<HomeworkContent
						typeOfHomework={HomeworkGeneralData.whichHomeworkType}
						role={role}
					/>
					{role == "teacher" ? <TeacherDownloadButton classID={classID} userToken={userToken} /> : null}
				</div>
			</div>

		);
	}


};

function TeacherDownloadButton (props: { classID: ClassID, userToken: token }) {
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