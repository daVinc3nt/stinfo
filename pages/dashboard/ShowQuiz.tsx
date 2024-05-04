import React, { useState, useEffect } from "react";
import Header from "@/components/Homework/Header";
import HomeworkContent from "@/components/Homework/Content";
import Info from "@/components/Homework/Info";
import { HomeworkGeneralData, storeUserAPIAHomeworkArgs } from "@/components/Homework/Data";
import { ClassOperation, StudentOperation, TeacherOperation, token, ClassID } from '@/ambLib/amb';
import { useRouter } from "next/router";

export default function Quiz () {  
	const router = useRouter();
	const { routerClassID, routerCourseID, routerCourseName, routerTeacher, routerToken } = router.query;
	const [role, setRole] = useState<string>("student");
	const [userToken, setUserToken] = useState<token>({ token: routerToken as string });
	const [getUserData, setUserData] = useState<any>(null);
	const [classID, setClassID] = useState<ClassID>(null);
	const [courseName, setCourseName] = useState<string>(routerCourseName as string);
	const [loadingState, setLoadingState] = useState<boolean>(true);
	const [file, setFile] = useState<File | null>(null);
	const [multipleFile, setMultipleFile] = useState<File[]>([]);



	useEffect(() => {
		if (router.isReady) {
			if (router.query.token) {
				setUserToken({ token: router.query.token as string });
			}
			if (router.query.class_id) {
				setClassID( { class_id: router.query.class_id as string });
				console.log("ClassID in query: ", router.query.class_id);
				if (classID)
				{
					console.log("ClassID: ", classID);
				}
				
			}
			if (router.query.course_name) {
				setCourseName(router.query.course_name as string);
			}

		}

	}, [router]);

	// first useEffect to get token
	let student = new StudentOperation();
	let teacher = new TeacherOperation();
	// to get student token
	useEffect(() => {
		if (role == "student") {
			student.login("long.nguyen24243004", "Student@24243004")
				// student.login("viet.nguyen24156661", "089204006677")
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

	if (classID && userToken && getUserData && router.isReady) {
		storeUserAPIAHomeworkArgs.setToken(userToken);
		// console.log("userToken: ", userToken);
		if (classID)
		{
			storeUserAPIAHomeworkArgs.setClassID(classID);
		}
		
		// console.log("classID: ", classID);
	}

	if (getUserData == null || router.isReady == false) {

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