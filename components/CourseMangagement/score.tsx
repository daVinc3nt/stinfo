import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import course from "@/pages/dashboard/course_registration";
import { ClassOperation, TeacherOperation, CourseOperation, token } from "@/ambLib/amb";
import { UpdateScoreInfo } from "@/ambLib/amb";
import { UpdatingCourseInfo } from "@/ambLib/amb";
interface CLASS {
    class_id: string
    students: string[]
}
interface studScore {
    fullname: string
    student_id: string
    GPA: number
    final: number
    midterm: number
    exercise: number
    lab: number
}



const Score = forwardRef((props: { class_id: string, course_id: string, token: token }, ref) => {
    const it = ["BT", "LAB", "GK", "CK", "GPA"]
    const [checkUpload, setCheckupload] = useState(0)
    const [scorechange, setScorechange] = useState(0)
    const [score, setScore] = useState<studScore[]>([])
    const [noStudent, setnoStudent] = useState(0)
    const [loadingInfo, setLoadingInfo] = useState(true)
    const [rightformat, setRightformat] = useState(true);
    const pattern = /^\d+(\.\d)?$/;
    const handleText = (e, typeScore: string, index: number) => {
        if (e.target.value == "") setRightformat(true);
        else {
            if (pattern.test(e.target.value)) {
                setRightformat(true)
                const temp = [...score]
                switch (typeScore) {
                    case ("BT"):
                        temp[index].exercise = parseFloat(e.target.value)
                        break
                    case ("LAB"):
                        temp[index].lab = parseFloat(e.target.value)
                        break
                    case ("GK"):
                        temp[index].midterm = parseFloat(e.target.value)
                        break
                    case ("CK"):
                        temp[index].final = parseFloat(e.target.value)
                        break
                    case ("GPA"):
                        temp[index].GPA = parseFloat(e.target.value)
                        break
                }
                setScore(temp)

            } else setRightformat(false)
        }
    }

    useEffect(() => {
        let temp: studScore[] = []
        const Class = new CourseOperation()
        let Data: CLASS[]
        const fetchData = async () => {
            await Class.findClasses({ course_id: props.course_id }, props.token)
                .then(data => {
                    Data = data.data
                    for (let i = 0; i < Data.length; i++) {
                        let x = Data[i]
                        if (x.class_id == props.class_id) {
                            let no = x.students.length
                            //Initialize data for score
                            for (let j = 0; j < no; j++) {
                                temp.push({ student_id: x.students[j], fullname: "", GPA: -1, midterm: -1, final: -1, exercise: -1, lab: -1 })
                            }
                            setLoadingInfo(false)
                            setScore(temp)
                            break
                        }
                    }

                })
        }
        fetchData()
    }, [])
    useEffect(() => {
        if (!loadingInfo) {
            const course = new ClassOperation()
            let Data: studScore[]
            const temp = [...score]
            const fetchData = async () => {
                await course.getScoreForTeacher({ class_id: props.class_id }, props.token).then(data => {    //Load score
                    Data = data.data
                    if (Data == undefined) { setnoStudent(0); return }
                    let no = Data.length
                    setnoStudent(no)
                    //let index = 0
                    //let ele: studScore
                    for (let i = 0; i < no; i++) {
                        // ele = { student_id: Data[i].student_id, fullname: "", GPA: -1, midterm: -1, final: -1, exercise: -1, lab: -1 }
                        // console.log(ele)
                        // index = score.indexOf(ele)
                        // console.log(index)
                        temp[i].fullname = Data[i].fullname
                        temp[i].GPA = isNaN(Data[i].GPA) ? -1 : Data[i].GPA
                        temp[i].exercise = isNaN(Data[i].exercise) ? -1 : Data[i].exercise
                        temp[i].final = isNaN(Data[i].final) ? -1 : Data[i].final
                        temp[i].midterm = isNaN(Data[i].midterm) ? -1 : Data[i].midterm
                        temp[i].lab = isNaN(Data[i].lab) ? -1 : Data[i].lab
                    }
                    setScore(temp)
                })
            }
            fetchData()

        }
    }, [loadingInfo])

    useEffect(() => {
        if (scorechange == 2) {
            if (rightformat) {
                const updateScore = new ClassOperation()
                for (let i = 0; i < noStudent; i++) {
                    const loadScore = async () => {
                        updateScore.updateScore({ student_id: score[i].student_id, midterm: score[i].midterm, final: score[i].final, exercise: score[i].exercise, lab: score[i].lab }, { class_id: props.class_id }, props.token)
                            .then(error => { if (error) console.log(error); setCheckupload(checkUpload + 1) })
                    }
                    loadScore()
                }
            } else {
                setScorechange(1)
            }
        }
    }, [scorechange])
    useEffect(() => {
        if (checkUpload > 0) {
            if (checkUpload == noStudent) {
                setCheckupload(0)
                setScorechange(0)
                setLoadingInfo(true)
            }
        }
    }, [checkUpload])
    return (
        <div className="p-2">
            <div className="p-2 flex-col  rounded-lg bg-slate-200">

                {/*Button for scorechange */}
                <div className="flex flex-row">
                    <div className=" inline ml-2 mr-2 mt-2 lg:mt-0 rounded-md hover:scale-110 hover:ease-in-out text-center truncate hover:bg-blue-700 hover:text-black p-2 bg-blue-500 text-white cursor-pointer"
                        onClick={() => { if (scorechange == 0) setScorechange(1); else if (scorechange == 1) setScorechange(2) }}>
                        {scorechange == 0 && <div>Nhập và chỉnh sửa điểm</div>}
                        {scorechange == 1 && <div>Hoàn tất</div>}
                        {scorechange == 2 && <div >Đang tiến hành lưu điểm ...</div>}
                    </div>
                    <div className="flex-1"></div>
                </div>


                <div className="relative flex flex-col lg:flex-row gap-2">

                    {/* TABLE FOR SCORE INFO*/}
                    {scorechange == 0 && <div className="flex-1 lg:w-2/5 mt-4 h-80 flex flex-col">
                        <div className=" overflow-auto border-[1px] border-gray-500 rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase border-b-[1px] border-gray-500">
                                    <tr>
                                        <th scope="col" className="w-1/6 px-6 py-3 bg-white">Mã số sinh viên</th>
                                        <th scope="col" className="w-1/4 px-6 py-3 bg-blue-200">Họ và tên</th>
                                        <th scope="col" className="w-1/2 px-6 py-3 bg-white">Điểm thành phần</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {score.map((item, index) => {
                                        return (
                                            <tr className="cursor-pointer border-b-[1px] border-gray-500 bg-white dark:bg-gray-800 hover:bg-slate-30">
                                                <td className="px-6 py-4 bg-white">{item.student_id}</td>
                                                <td className="px-6 py-4 bg-blue-200">{item.fullname}</td>
                                                <td className="px-6 py-4 bg-white">
                                                    <div className="grid grid-cols-3 lg:grid-cols-5">

                                                        <div>BT:{item.GPA == -1 ? "..." : item.GPA}</div>
                                                        <div>LAB:{item.lab == -1 ? "..." : item.lab}</div>
                                                        <div>GK:{item.midterm == -1 ? "..." : item.midterm}</div>
                                                        <div>CK:{item.midterm == -1 ? "..." : item.midterm}</div>
                                                        <div>GPA:{item.GPA == -1 ? "..." : item.GPA}</div>
                                                    </div>
                                                </td>
                                            </tr>


                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex-1"></div>
                    </div>
                    }

                    {/*TABLE FOR SCORE CHANGING */}
                    {scorechange != 0 &&
                        <div className="flex-1 mt-4 flex flex-col h-80">

                            <div className="overflow-auto border-[1px] border-gray-500 rounded-lg text-sm">
                                <div className=" flex flex-row border-b-[1px] border-gray-500 bg-blue-300 p-3 justify-center text-center">
                                    Nhập và chỉnh sửa điểm
                                </div>
                                {score.length != 0 &&
                                    score.map((item, index) => {
                                        return (
                                            <div className="border-b-[1px] border-gray-500">
                                                <div className="flex flex-row bg-white">
                                                    <div className="py-3 flex-1 flex justify-center">{item.fullname}</div>
                                                    <div className="w-[1px] bg-black h-11"></div>
                                                    <div className="py-3 flex-1 flex justify-center">{item.student_id}</div>
                                                </div>
                                                <div className="bg-blue-200 flex flex-row py-3">
                                                    {it.map((other, idx) => {
                                                        return (
                                                            <div className="flex-1 flex flex-row ">

                                                                <div className="flex-1 flex flex-row gap-2 px-2 items-center justify-between">
                                                                    <p className="flex-1 ">{other}</p>
                                                                    <input type="text" onChange={(e) => handleText(e, it[idx], index)} className={`text-center h-6 w-12 ${rightformat ? "focus:outline-blue-400 bg-slate-100" : "focus:outline-red-500 bg-red-200"} focus:ring-blue-400 rounded-lg`} ></input>
                                                                </div>
                                                                {idx != 4 && <div className="w-[2px] h-full rounded-lg bg-gray-400 m-[1px]"></div>}
                                                            </div>


                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="flex-1"></div>
                        </div>}
                </div>
            </div>
        </div>
    )
});

export default Score;