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
import Cookies from "js-cookie"
import { useRouter } from "next/router";
import Quiz from "./ShowQuiz";

const ListOfSubmittedSubject = () => {
	const [role, setRole] = useState<string>(Cookies.get("role"));
	const [userToken, setUserToken] = useState<token>({ token: Cookies.get("token") });
	const [getUserData, setUserData] = useState<any>(null);
	const [classID, setClassID] = useState<ClassID>(null);
	const [courseName, setCourseName] = useState<string>("");
	const [loadingState, setLoadingState] = useState<boolean>(true);
	const [listSubject, setListSubject] = useState<Subject[]>(null);
	const [listScore, setListScore] = useState<any[]>(null);
	// const [showSubmission, setShowSubmission] = useState<boolean>(false);
	// Keep track of the index of the item whose submission is being shown
	const [showSubmissionIndex, setShowSubmissionIndex] = useState<number>(-1);
	const router = useRouter();

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

		return () => {
			// cleanup localStorage
			window?.localStorage.removeItem("currentRole");
			window?.localStorage.removeItem("currentClassID");
			window?.localStorage.removeItem("currentCourseName");
		}

	}, []);

	// second useEffect to get data
	let getListSubjectData, getListScoreData;
	useEffect(() => {


		if (userToken) {
			if (role == "student") {
				student.findStudentRegisteredClass({ token: userToken.token })
					.then(data => {
						getListSubjectData = data.data;
						if (getListSubjectData) {
							SubmissionFieldUtils.sortListSubject(getListSubjectData);
							setListSubject(SubmissionFieldUtils.createArrayOfSubject(getListSubjectData));
							// console.log("subject data: ", listSubject);
						}
					}
					)
				student.getScore({ token: userToken.token })
					.then(data => {
						if (data.data) {
							getListScoreData = data.data.allScores;
						}
						if (getListScoreData) {
							// console.log("score data: ", getListScoreData);
							SubmissionFieldUtils.sortListScore(getListScoreData);
							setListScore(SubmissionFieldUtils.createArrayOfScore(getListScoreData));
							// console.log("score data: ", listScore)
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
		Cookies.set("userToken", userToken.token);

	}, [userToken]);

	if (listSubject && listScore) {
		console.log("listSubject: ", listSubject);
		console.log("listScore: ", listScore);
	}


	const routeToShowQuiz = (subject: Subject, index: number) => {
		if (typeof window !== 'undefined') {
		window?.localStorage.setItem("currentClassID", subject.class_id);
		window?.localStorage.setItem("currentCourseName", subject.course_name);
		window?.localStorage.setItem("currentRole", "student");
		window?.localStorage.setItem("currentCourseID", subject.course_id);
		window?.localStorage.setItem("currentTeacher", subject.teacher);
		window?.localStorage.setItem("currentScore", String(listScore[index].exercise))
		console.log(window?.localStorage.getItem("currentScore"));
		console.log("currentScore: ", listScore[index].exercise);
		console.log("currentIndex: ", index);
		console.log("listOfScore: ", listScore);
		}
		setCourseName(subject.course_name);
		setRole("student");
		setShowSubmissionIndex(prevIndex => prevIndex === index ? -1 : index);
	}

	if (listSubject && listScore) {
		return (
			<div>
				<div className="flex justify-between items-center bg-gray-200 p-4">
					<h1 className="text-2xl font-bold">
						Danh sách các môn nộp bài
					</h1>
				</div>
				<div>
					{listSubject.map((subject, index) => (
						<div key={index} className=" shadow-md p-6 my-4 mx-4 rounded-md border border-blue-200 border-solid">
							<h2 className="text-xl font-semibold mb-2">{subject.course_name}</h2>
							<p className="text-gray-600 mb-2">Course ID: {subject.course_id}</p>
							<p className="text-gray-600 mb-2">Class ID: {subject.class_id}</p>
							<p className="text-gray-600 mb-2">Teacher: {subject.teacher}</p>
							<button onClick={() => routeToShowQuiz(subject, index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
								{
									showSubmissionIndex == index ? "Ẩn" : "Xem"
								}
							</button>
							<div>
								{
									showSubmissionIndex == index ? <Quiz /> : null
								}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
	else {
		return (
			<div>
				<div className="flex justify-between items-center bg-gray-200 p-4">
					<h1 className="text-2xl font-bold">
						Danh sách các môn nộp bài
					</h1>
				</div>
				<div className="flex justify-center items-center h-64">
					<p>Đang tải...</p>
				</div>
			</div>
		)
	}

}



export default ListOfSubmittedSubject;