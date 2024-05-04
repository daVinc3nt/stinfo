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
	CourseID, TeacherID
} from '@/ambLib/amb';
import { Subject } from "@/components/Homework/Utilities/interfaceProps";
import { SubmissionFieldUtils } from "@/components/Homework/Utilities/utils_homework";
import Link from "next/link";
import { useRouter } from "next/router";


const ListOfSubmittedSubject = () => {
	const [role, setRole] = useState<string>("student");
	const [userToken, setUserToken] = useState<token>({ token: "" });
	const [getUserData, setUserData] = useState<any>(null);
	const [classID, setClassID] = useState<ClassID>(null);
	const [courseName, setCourseName] = useState<string>("");
	const [loadingState, setLoadingState] = useState<boolean>(true);
	const [listSubject, setListSubject] = useState<Subject[]>([]);

	let student = new StudentOperation();
	let teacher = new TeacherOperation();
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
							setListSubject(SubmissionFieldUtils.createArrayOfSubject(getData));
							console.log("listSubject: ", listSubject);
							// let newClassID: ClassID = getData[0].class_id;
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
							setClassID(newClassID);
							setCourseName(getData[2].course_name);
						}
					}
					)
			}
		}
		storeUserAPIAHomeworkArgs.setToken(userToken);

	}, [userToken]);

	const router = useRouter();
	const routeToShowQuiz = (subject: Subject, index: number) => {
		storeUserAPIAHomeworkArgs.setClassID({ class_id: subject.class_id });
		console.log("Show Subject: ", subject);
		router.push({
			pathname: "/dashboard/ShowQuiz",
			query: {
				class_id: subject.class_id, 
				course_id: subject.course_id,
				course_name: subject.course_name,
				teacher: subject.teacher,
				token: userToken.token,
			}
		});
	}

	if (listSubject)
	{
		return (
			<div>
				<div className="flex justify-between items-center bg-gray-200 p-4">
					<h1 className="text-2xl font-bold">
						Danh sách các môn nộp bài
					</h1>
				</div>
				<div>
					{listSubject.map((subject, index) => (
						<div key={index} className=" shadow-md p-6 my-4 mx-4 rounded-md bg-blue-200">
							<h2 className="text-xl font-semibold mb-2">{subject.course_name}</h2>
							<p className="text-gray-600 mb-2">Course ID: {subject.course_id}</p>
							<p className="text-gray-600 mb-2">Class ID: {subject.class_id}</p>
							<p className="text-gray-600 mb-2">Teacher: {subject.teacher}</p>
							<button onClick={() => routeToShowQuiz(subject, index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
								Show Submission
							</button>
						</div>
					))}
				</div>
			</div>
		);
	}

}



export default ListOfSubmittedSubject;