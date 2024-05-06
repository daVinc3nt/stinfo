import { CourseOperation, token } from "@/ambLib/amb"
import { StudentOperation } from "@/ambLib/amb"
import { useState, useEffect } from "react"
import { UpdatingCourseInfo } from "@/ambLib/amb"
import cookie from 'js-cookie'
interface registerdCourse {
    class_id: string
    course_id: string
    course_name: string
    credits: number
    day: string
    teacher: string
    semester: string
    room: string
    period: number[]
}

export default function Result() {
    const [result, setResult] = useState<registerdCourse[]>([])
    const fixed = [1, 2, 3, 4, 5, 6]
    useEffect(() => {
        const fetchClass = async () => {
            const studOp = new StudentOperation()
            let result: registerdCourse[]
            const myToken: token = {
                token: cookie.get("token"),
            };
            await studOp.findStudentRegisteredClass(myToken)
                .then(data => { setResult(data.data) })
                .catch(error => console.log(error))
        }
        fetchClass()
    }, [])

    return (
        <div className="p-4 border rounded-lg bg-green-300">
            <div className="text-center mb-4">Kết quả đăng ký</div>
            <div className="grid grid-cols-3 gap-3">
                {result.length != 0 &&
                    result.map((item) => {
                        return (
                            <div className="border flex flex-col rounded-lg hover:shadow-md">
                                <div className="relative bg-green-200 flex items-center rounded-t-lg justify-center py-1 truncate">
                                    {item.course_name}
                                </div>
                                <div className="p-2 bg-white flex-1 flex flex-col rounded-b-lg truncate">
                                    <div>Mã môn học: {item.course_id}</div>
                                    <div>Số tín chỉ: {item.credits}</div>
                                    <div>Giảng viên: {item.teacher == null ? "..." : item.teacher}</div>
                                    <div>Phòng học: {item.room}</div>
                                    <div>Thời gian học: {" " + item.day + " "} Tiết {item.period.length == 0 ? "..." : item.period[0].toString() + " - " + item.period[item.period.length - 1].toString()}</div>
                                </div>
                            </div>
                        )
                    })

                }
                {result.length == 0 &&
                    fixed.map(() => {
                        return (
                            <div className="border flex flex-col rounded-lg hover:shadow-md animate-pulse animate-infinite animate-ease-in animate-duration-1000">
                                <div className="relative bg-green-200 text-green-200 flex items-center rounded-t-lg justify-center py-1 truncate">
                                    NONE
                                </div>
                                <div className="p-2 bg-white text-white flex-1 flex flex-col rounded-b-lg truncate">
                                    <div>NONE</div>
                                    <div>NONE</div>
                                    <div>NONE</div>
                                    <div>NONE</div>
                                    <div>NONE</div>
                                </div>
                            </div>)
                    })
                }
            </div>
        </div>
    )
}
