import { useState, useRef, useEffect } from "react"
import React from "react";
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import Image from "next/image";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import Score from "./score";
import Lecture from "./lecture";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Submiss from "./submission";
import { ClassOperation, CourseOperation, TeacherOperation } from "@/ambLib/amb";
import { token } from "@/ambLib/amb";
import { RegisterClassInfo } from "@/ambLib/amb";
import CourseRegistration from "./courseRes";
import Teacher from "./teacherInfo";

const WEEKDAY: { [key: string]: string } = {
    "Thứ Hai": "Thứ 2",
    "Thứ Ba": "Thứ 3",
    "Thứ Tư": "Thứ 4",
    "Thứ Năm": "Thứ 5",
    "Thứ Sáu": "Thứ 6",
    "Thứ Bảy": "Thứ 7",
    "Chủ Nhật": "Chủ nhật"
};

interface TeacherInfo {
    class_id: string
    course_id: string
    course_name: string
    credits: number
    day: string
    period: Array<number>
    room: string
    semester: string
    teacher: string
}
interface TimeTable {
    time: { per: number[], name: string, room: string }[]
}
interface Class {
    class_name: string
    per: number[]
    room: string
}
interface Course {
    name: string
    course_id: string
    classes: Class[]
}



const Grid: React.FC<TimeTable> = ({ time }) => {
    const numbers = Array.from({ length: 15 }, (_, i) => i + 1);
    const color = ["bg-orange-100", "bg-teal-100", "bg-blue-100"]
    const other_color = ["bg-orange-200", "bg-teal-200", "bg-blue-200"]
    const list: { color: string, name: string, room: string, other_color: string }[] = []
    let flag = 0
    const len = time.length
    let map: Map<number, string> = new Map()
    let map1: Map<number, number> = new Map()
    for (let i = 0; i < 16; i++) {
        list.push({ color: "bg-white", name: "", room: "", other_color: "" })
    }
    for (let i = 0; i < len; i++) {
        let temp = time[i].per
        for (let j = 0; j < temp.length; j++) {
            list[temp[j]].color = color[flag]
            list[temp[j]].other_color = other_color[flag]
            list[temp[j]].name = time[i].name
            list[temp[j]].room = time[i].room
        }
        flag = (flag + 1) % 3
    }
    return (
        <div>
            <div className="grid grid-cols-5 gap-1 cursor-pointer">
                {numbers.map((number) => {
                    return (
                        <div className={` relative group p-1 text-center border rounded-md border-gray-300 ${list[number].color} text-sm`}>
                            <div>{number}</div>
                            {list[number].color != "" && <div className={`p-1 ${list[number].other_color} border rounded-lg hidden absolute -top-10 -right-2 truncate group-hover:block`}>
                                {list[number].name + " " + list[number].room}
                            </div>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default function Course() {
    const [techerInfo, setTeacherInfo] = useState<{ name: string, gender: string }>({ name: "", gender: "" });
    const [numLessons, setNumlessons] = useState(0);
    const [cur, setCur] = useState(1);
    const [curcourse, setCurcourse] = useState(0);
    const [showClass, setShowclass] = useState(0);
    const [curClass, setCurClass] = useState<Class>();
    const upData = useRef(undefined);
    const [dateInfo, setDateInfo] = useState('');
    const [today, setToday] = useState<TimeTable>({ time: [] })
    const [course, Setcourse] = useState<Course[]>([])
    const token: token = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFjaGVyX2lkIjoiR1Y1MzU4NyIsInJvbGUiOiJHaeG6o25nIHZpw6puIiwiYWN0aXZlIjoxLCJpYXQiOjE3MTQ5MjI1MTAsImV4cCI6MTcxNDk1ODUxMH0.w43xyP55fcXuk8g4Nu37IUeKTPljOOXGiEivacgbq_o"
    }
    console.log(techerInfo)

    useEffect(() => {
        const wDay = new Date().toLocaleString('vi-VN', { weekday: 'long', timeZone: 'Asia/Ho_Chi_Minh' });
        const date = new Date().toLocaleString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' })
        setDateInfo(wDay + ', ' + date);
        let numLessons = 0
        let DATA: TeacherInfo[]
        let Today: TimeTable = { time: [] }
        let course: Course[] = []
        const teacher = new TeacherOperation()
        const Class = new CourseOperation()
        const fetchData1 = async () => {
            await teacher.findTeacherRegisteredClass(token)
                .then(data => {
                    DATA = data.data
                    let temp: TeacherInfo
                    let othertemp: Course
                    let len = course.length
                    for (let i = 0; i < DATA.length; i++) {
                        temp = DATA[i]
                        numLessons += temp.period.length
                        if (DATA[i].day == WEEKDAY[wDay]) {
                            Today.time.push({ per: temp.period, name: temp.course_name, room: temp.room })
                        }
                        if (course.length == 0) course.push({ name: temp.course_name, classes: [], course_id: temp.course_id })
                        let len = course.length
                        for (let j = 0; j < len; j++) {
                            othertemp = course[j]
                            if (temp.course_name != othertemp.name && j == len - 1) {
                                course.push({ name: temp.course_name, classes: [{ class_name: temp.class_id, per: temp.period, room: temp.room }], course_id: temp.course_id })
                            }
                            else if (temp.course_name == othertemp.name) {
                                course[j].classes.push({ class_name: temp.class_id, per: temp.period, room: temp.room })
                                break
                            }

                        }
                    }
                    Setcourse(course)
                    setNumlessons(numLessons)
                    setToday(Today)
                })
                .catch(error => console.log(error))
        }
        const fetchData2 = async () => {
            await teacher.findByTeacher(token)
                .then(data => setTeacherInfo({ name: data.data.fullname, gender: data.data.gender }))
                .catch(error => console.log(error))
        }
        const fetchData3 = async () => {
            await Class.findClasses({ course_id: "CS1716" }, token)
        }
        fetchData1()
        fetchData2()
        fetchData3()
    }, [])




    const handleClick = () => {
        if (showClass == 2) {
            if (course[curcourse].classes.length == 1) setShowclass(0)
            else setShowclass(1)
        } else if (showClass == 1) {
            setShowclass(0);
        }
    }
    const handleClickCourse = (index, num) => {
        if (!showClass) {
            if (num > 1) { setShowclass(1); setCurcourse(index) }
            else { setShowclass(2); setCurcourse(index); setCurClass(course[index].classes[0]) }
        }

    }

    return (
        <>
            <div className="flex flex-row  text-sm md:text-base ">

                <div className=" w-80 bg-slate-200 p-2 hidden sm:block  h-full fixed">
                    <div className="mt-10 flex flex-row items-center justify-center gap-1 text-indigo-600 text-xl mb-10">
                        <AutoStoriesOutlinedIcon ></AutoStoriesOutlinedIcon>
                        Quản lý môn học

                    </div>
                    <div className="pl-12">
                        <div className={`mt-10 flex flex-row items-center ${cur == 1 ? 'text-blue-600' : ''} gap-1 cursor-pointer  mb-10 `} onClick={() => { setCur(1) }}>
                            <div className={`p-1 rounded-lg  bg-slate-200 ${cur == 1 ? 'bg-blue-600' : ''}`}><DescriptionOutlinedIcon className={`${cur == 1 ? 'text-white' : ''}`} /></div> Tổng quan
                        </div>
                        <div className={`mt-10 flex flex-row items-center ${cur == 2 ? 'text-blue-600' : ''} gap-1 cursor-pointer  mb-10`} onClick={() => setCur(2)}>
                            <div className={`p-1 rounded-lg  bg-slate-200S ${cur == 2 ? 'bg-blue-600 ' : ''}`}><AppRegistrationIcon className={`${cur == 2 ? 'text-white' : ''}`} /></div>Đăng ký giảng dạy
                        </div>
                        <div className={`mt-10 flex flex-row items-center ${cur == 3 ? 'text-blue-600' : ''} gap-1 cursor-pointer  mb-10`} onClick={() => setCur(3)}>
                            <div className={`p-1 rounded-lg  bg-slate-200 ${cur == 3 ? 'bg-blue-600' : ''}`}><SchoolOutlinedIcon className={`${cur == 3 ? 'text-white' : ''}`} /></div>Nhập điểm
                        </div>
                        <div className={`mt-10 flex flex-row items-center ${cur == 4 ? 'text-blue-600' : ''} gap-1 cursor-pointer  mb-10`} onClick={() => setCur(4)}>
                            <div className={`p-1 rounded-lg  bg-slate-200 ${cur == 4 ? 'bg-blue-600 ' : ''}`}><NotificationsActiveOutlinedIcon className={`${cur == 4 ? 'text-white' : ''}`} /></div>Xem bài nộp
                        </div>
                        <div className={`mt-10 flex flex-row items-center ${cur == 4 ? 'text-blue-600' : ''} gap-1 cursor-pointer  mb-10`} onClick={() => setCur(5)}>
                            <div className={`p-1 rounded-lg  bg-slate-200 ${cur == 4 ? 'bg-blue-600 ' : ''}`}><NotificationsActiveOutlinedIcon className={`${cur == 5 ? 'text-white' : ''}`} /></div>Thông tin cá nhân
                        </div>
                    </div>
                </div>
                <div className=" w-80 bg-slate-200 p-2 hidden sm:block "></div>
                <div className="flex-1 p-2">

                    {showClass == 0 && cur != 2 && cur != 5 && <div className="p-2 bg-slate-200 rounded-xl flex flex-row">
                        <div className="flex-1 flex flex-row items-center justify-center">
                            {techerInfo.gender == "Nam" && <div className=" items-center justify-center"><Image src="/male.png" height={150} width={150} alt="Male"></Image></div>}
                            {techerInfo.gender == "Nữ" && <div className=" items-center justify-center"><Image src="/female.png" height={150} width={150} alt="Female"></Image></div>}

                            {numLessons != 0 && techerInfo.name.length != 0 && <div className="flex-1 p-2 h-full">
                                <div className="flex justify-end"><div className=" truncate shadow-lg inline bg-blue-500 rounded-md text-white py-1 px-2">{dateInfo}</div></div>
                                <div className="p-2 bg-slate-300 mt-1 rounded-lg shadow-lg">
                                    <div className="">Chào, {techerInfo.name} !</div>
                                    <div className="">Số tiết trong tuần: {numLessons}</div>
                                </div>
                            </div>}
                        </div>
                        <div className="w-1">
                            <div className="py-2 w-1 h-full rounded-lg bg-white"></div>
                        </div>
                        <div className="flex-1 p-1">
                            <div className="flex justify-center mb-2"><div className=" shadow-lg inline bg-blue-500 rounded-md text-white py-1 px-2">Lịch dạy hôm nay</div></div>
                            <div className="flex justify-center items-center">
                                {today.time.length != 0 && <Grid time={today.time} />}
                                {today.time.length == 0 &&
                                    <div className="truncate">
                                        <Grid time={today.time} />
                                        <div className="mt-1">Không có tiết giảng dạy trong ngày hôm nay !</div>
                                    </div>}
                            </div>
                        </div>
                    </div>}
                    {/*LIST OF COURSE*/}
                    {cur != 2 && cur != 5 && <div className="  text-md font-medium mt-2">
                        <div className="bg-slate-200 border  rounded-xl p-2">
                            <div className="pt-1 text-center text-xl text pb-3">Môn giảng dạy</div>
                            {showClass != 0 && <div onClick={() => { handleClick() }} className="cursor-pointer"><KeyboardReturnIcon /></div>}
                            {course.length != 0 && <div className="uppercase text-white grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 place-items-center gap-4">
                                {course.map((item, index) => {
                                    if (showClass == 0 || (showClass == 1 && index == curcourse) || (showClass == 2 && index == curcourse))
                                        return (
                                            <div className="cursor-pointer" onClick={() => handleClickCourse(index, item.classes.length)}>
                                                <div className="bg-indigo-500  h-20 w-64 rounded-lg p-2">
                                                    <div className="">
                                                        <div className="flex flex-row">
                                                            <div className="pr-2"><Image src="/courses.png" height={50} width={50} alt="Course"></Image></div>
                                                            <div className="flex-1">{item.name}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                })}
                                {showClass == 1 &&
                                    course[curcourse].classes.map((item, index) => {
                                        return (
                                            <div className="cursor-pointer snap-start" onClick={() => { setCurClass(item); setShowclass(2) }}>
                                                <div className="bg-blue-400 h-20 w-64 rounded-lg p-2">
                                                    <div className="flex flex-row justify-between">
                                                        <div className="flex flex-row items-center  justify-center">
                                                            <div className="pr-2"><Image src="/classroom.png" height={50} width={50} alt="Course"></Image></div>
                                                            <div className="flex flex-col text-sm">
                                                                <div className="mb-1">Lớp: {item.class_name}</div>
                                                                <div className="mb-1">Phòng: {item.room}</div>
                                                                <div className="mb-1">Lịch dạy: Tiết {" " + item.per[0] + " - " + item.per[item.per.length - 1]}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {showClass == 2 &&
                                    <div className="cursor-pointer snap-start">
                                        <div className="bg-blue-400 h-20 w-64 rounded-lg p-2">
                                            <div className="flex flex-row justify-between">
                                                <div className="flex flex-row items-center  justify-center">
                                                    <div className="pr-2"><Image src="/classroom.png" height={50} width={50} alt="Course"></Image></div>
                                                    <div className="flex flex-col text-sm">
                                                        <div className="mb-1">Lớp: {curClass.class_name}</div>
                                                        <div className="mb-1">Phòng: {curClass.room}</div>
                                                        <div className="mb-1">Lịch dạy: Tiết {" " + curClass.per[0] + " - " + curClass.per[curClass.per.length - 1]}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>}
                        </div>
                    </div>
                    }


                    {/*LECTURE*/}
                    {cur == 2 && <CourseRegistration token={token} />}
                    {/* {cur == 2 && showClass == 0 && <div className="inline-flex flex-row m-4 gap-2 p-2 rounded-lg bg-slate-300 animate-bounce "><ErrorOutlineIcon />Vui lòng chọn môn học !</div>} */}

                    {/*SCORE*/}
                    {cur == 3 && showClass == 2 && <Score ref={upData} class_id={curClass.class_name} course_id={course[curcourse].course_id} token={token} />}
                    {cur == 3 && showClass != 2 && <div className="inline-flex flex-row m-4 gap-2 p-2 rounded-lg bg-slate-300 animate-bounce "><ErrorOutlineIcon />Vui lòng chọn lớp học !</div>}

                    {/*SUBMISSION*/}
                    {cur == 4 && showClass == 2 && <Submiss ref={upData} class_id={curClass.class_name} course_id={course[curcourse].course_id} token={token} />}
                    {cur == 4 && showClass != 2 && <div className="inline-flex flex-row m-4 gap-2 p-2 rounded-lg bg-slate-300 animate-bounce "><ErrorOutlineIcon />Vui lòng chọn lớp học !</div>}

                    {cur == 5 && <Teacher />}


                </div>
            </div>
        </>
    )
}
