import { useState, useEffect } from "react"
import Image from "next/image"
import { Button, button } from "@material-tailwind/react"
import { StudentOperation, token } from "@/ambLib/amb";
import { ContactSupportOutlined } from "@mui/icons-material";
import course from "@/pages/dashboard/course_registration";
const DATE = new Date();
interface course {
    GPA: number,
    course_id: string,
    course_name: string,
    credits: number,
    exercise: number,
    final: number,
    lab: number,
    midterm: number,
    semester: string,
}

interface student {
    name: string,
    ID: string
}
interface avgSemes {
    score: number
    semester: string
    credits: number
}
const PieChart = ({ percentages, animation }) => {
    const [paths, setPaths] = useState([]);
    const [color, setColor] = useState([]);


    useEffect(() => {
        const total = percentages.reduce((acc, val) => acc + val, 0);
        let startAngle = 0;
        let endAngle = 0;
        let pathsArray = [];
        let c = [];
        for (let i = 0; i < percentages.length; i++) {
            c.push((360 / percentages.length) * i);
            const percentage = percentages[i];
            endAngle = startAngle + (percentage / total) * 360;
            const largeArcFlag = percentage > 50 ? 1 : 0;

            const startX = Math.cos((startAngle * Math.PI) / 180) * 100 + 100;
            const startY = Math.sin((startAngle * Math.PI) / 180) * 100 + 100;

            const endX = Math.cos((endAngle * Math.PI) / 180) * 100 + 100;
            const endY = Math.sin((endAngle * Math.PI) / 180) * 100 + 100;

            const pathData = `M 100 100 L ${startX} ${startY} A 100 100 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
            pathsArray.push(<path stroke="white" stroke-width="2" key={i} d={pathData} fill={`hsl(${c[i]}, 70%, 50%)`} />);
            startAngle = endAngle;
        }
        setColor(c);
        setPaths(pathsArray);
    }, [percentages]);
    const Note = ({ e, str }) => {
        return (
            <div className=" flex flex-row items-center  w-28">
                <svg className="w-2 h-2 mr-1" height="100" width="100" viewBox="0 0 100 100">
                    <circle r="45" cx="50" cy="50" fill={`hsl(${e}, 70%, 50%)`} stroke="green" stroke-width="3" />
                </svg>
                <p>{str}</p>
            </div>
        )
    }
    return (
        <div className={`flex-1 flex flex-col bg-blue-200 border-spacing-1 rounded-lg   ${animation}`}>
            <p className="mt-2 mb-2 text-center">Thống kê môn học </p>
            <div className=" border shadow-lg mb-2"></div>
            <div className="flex justify-center">
                <svg className="w-56 h-56 mb-2 mx-5" viewBox="0 0 200 200">
                    {paths}
                </svg>
            </div>
            <div className="hidden lg:block justify-center">
                <div className=" p-2 grid grid-cols-3 place-items-center">
                    <Note e={color[0]} str="Xuất sắc"></Note>
                    <Note e={color[1]} str="Giỏi"></Note>
                    <Note e={color[2]} str="Khá"></Note>
                    <Note e={color[3]} str="Trung bình"></Note>
                    <Note e={color[4]} str="Yếu"></Note>
                    <Note e={color[5]} str="Kém"></Note>
                </div>
            </div>
        </div>
    );
};

export default function MyScore() {
    const token: token = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiMjQyNDMwMDQiLCJyb2xlIjoiU2luaCB2acOqbiIsImFjdGl2ZSI6MSwiaWF0IjoxNzE0ODE5MjE4LCJleHAiOjE3MTQ4NTUyMTh9.tzlHo8G1224NKh3zoZSULMkGh6MvOyjgEVj4k3_wTRM"
    }
    const [student, setStudent] = useState<student>({ name: "", ID: "" })
    const [semes, setSemes] = useState<course[][]>([])
    const [cursemes, setCursemes] = useState("")
    const [show, setShow] = useState(0)
    const percentages = [12, 12, 20, 22, 10, 26]
    const [score, setScore] = useState<avgSemes[]>([])
    let score1 = [3.1, 3.2, 3.0, 3.5, 3.1, 3.4, 3.3, 3.6]
    const level = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]
    const [curAv, setcurAv] = useState(0)
    const [isMouseInside, setIsMouseInside] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [dateInfo, setDateInfo] = useState('');
    const [chart, setChart] = useState<course[][]>([])
    const [overallGPA, setoverallGPA] = useState(0)
    const [overallCredits, setoverallCredits] = useState(0)

    {/*Fetch Score */ }
    useEffect(() => {

        if (student.name != "") {
            const wDay = new Date().toLocaleString('vi-VN', { weekday: 'long', timeZone: 'Asia/Ho_Chi_Minh' });
            const date = new Date().toLocaleString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' })
            setDateInfo(wDay + ', ' + date);
            const stuOp = new StudentOperation()
            let DATA: course[] = []
            let semester: course[][] = [[]]
            let curSemes: string = "231"
            let avgSemester: avgSemes[] = []
            let map = new Map<string, number>()
            let loop = parseInt(curSemes[2], 10) % 2 == 0 ? 2 * (parseInt(curSemes[1], 10) - parseInt(student.ID[1], 10)) + 2 : 2 * (parseInt(curSemes[1], 10) - parseInt(student.ID[1], 10)) + 1
            for (let temp: string = curSemes, i = loop - 1; i > -1; i--) {
                avgSemester.push({ semester: temp, score: 0, credits: 0 })
                map.set("HK" + temp, i)
                if (temp[2] == '2') temp = temp[0] + temp[1] + '1'
                else temp = (temp[1] == '0' ? (parseInt(temp[0], 10) - 1).toString() + '9' : temp[0] + (parseInt(temp[1], 10) - 1).toString()) + '2'
            }
            setScore(avgSemester.reverse())
            const fetchScore = async () => {
                await stuOp.getScore(token)
                    .then(data => {
                        DATA = data.data.allScores
                        for (let i = 0, j = 0, ss = ""; i < DATA.length; i++) {
                            ss = DATA[i].semester
                            j = map.get(ss)
                            DATA[i].semester = "Học kỳ " + ss[4] + " Năm học 20" + ss[2] + ss[3] + " - "
                                + "20" + (ss[3] == '9' ? (parseInt(ss[2], 10) + 1).toString() + '0' : ss[2] + (parseInt(ss[3], 10) + 1).toString())
                            semester[j].push(DATA[i])
                        }
                        setSemes(semester)

                    })
                    .catch(error => console.log(error))

            }
            fetchScore()
        }

    }, [student])

    {/* */ }
    useEffect(() => {
        if (semes.length != 0) {
            let avgSemester: avgSemes[] = score
            let GPA = 0
            let credit = 0
            for (let i = 0; i < score.length; i++) {
                let sum = 0
                avgSemester[i].score = 0
                for (let j = 0; j < semes[i].length; j++) {
                    avgSemester[i].score += (semes[i][j].GPA * semes[i][j].credits)
                    sum += semes[i][j].credits
                }
                GPA = avgSemester[i].score
                avgSemester[i].score = parseFloat((avgSemester[i].score * 0.4 / sum).toFixed(1))
                avgSemester[i].credits = sum
                credit += sum
            }
            setoverallCredits(credit)
            setoverallGPA(GPA / credit)
            setScore(avgSemester)
        }
    }, [semes])

    {/*FETCH INFO */ }
    useEffect(() => {
        const info = new StudentOperation()
        const fetchInfo = async () => {
            await info.findByStudent(token).then(data => setStudent({ name: data.data.fullname, ID: "2313254" }))
        }
        fetchInfo()
    }, [])

    {/*Mouse Handling */ }
    useEffect(() => {
        const updateMousePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsMouseInside(false);
        };
        const handleMouseMove = (e) => {
            for (let i = 0; i < 8; i++) {
                const div = document.getElementById(i.toString());
                let isInside = false;
                if (div) {
                    const rect = div.getBoundingClientRect();
                    const mouseX = e.clientX;
                    const mouseY = e.clientY;
                    isInside =
                        mouseX >= rect.left &&
                        mouseX <= rect.right &&
                        mouseY >= rect.top &&
                        mouseY <= rect.bottom;

                    if (isInside) {
                        setIsMouseInside(isInside);
                        setcurAv(i);
                        break;
                    }

                }
            }

        };
        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {

        };
    }, []);

    return (

        <>
            <div className="flex mt-2 justify-center text-xl">Bảng điểm sinh viên</div>
            <div className=" flex flex-row mx-2  md:text-base sm:text-sm text-xs">
                <div className="flex-1 my-4  flex flex-col" >
                    <div className={`flex flex-col bg-blue-200 p-2 border border-spacing-1 rounded-lg shadow-lg h-144 `}>
                        <div className="flex justify-between ">
                            <div>Họ và Tên: {student.name != "" ? student.name + " (" + student.ID + ")" : ""}</div>
                            {dateInfo.length != 0 && <div className=" truncate shadow-lg inline bg-blue-500 rounded-md text-white py-1 px-2">{dateInfo}</div>}
                        </div>
                        <div className="mb-2">Điểm trung bình tích luỹ</div>
                        <div className="mb-2">Số tín chỉ tích luỹ</div>


                        <label className="flex items-center">
                            <p className=" mr-1">Chọn kết quả học kỳ:</p>
                            {!(semes.length == 0) && <select className="inline bg-gray-200  rounded-xl hover:bg-gray-300 p-[3px] "
                                value={cursemes}
                                onChange={(e) => { setCursemes(e.target.value) }}
                            >
                                <option value="Tất cả">Tất cả</option>
                                {
                                    semes.map((item) => {
                                        return (
                                            <option value={item[0].semester}>{item[0].semester}</option>
                                        )
                                    })
                                }
                            </select>}
                            {semes.length == 0 && <div className="inline bg-gray-200 text-gray-200 animate-pulse animate-infinite animate-duration-1000 animate-ease-in  rounded-xl hover:bg-gray-300 p-[3px] ">Học kỳ 2 Năm học 2023 - 2024</div>}
                        </label>

                        {!(semes.length == 0) && <div className="overflow-auto mt-10 flex flex-col ">
                            {semes.map((item, index) => {
                                if (item[0].semester == cursemes || cursemes == "Tất cả") {
                                    return (
                                        <div className=" animate-fade-down flex flex-col">
                                            <div className="bg-gray-300 border-2  rounded-xl text-center w-64">{item[0].semester}</div>
                                            <table className="  table-fixed flex-1 mt-4 mb-2">
                                                <thead>
                                                    <tr className=" border-t-2 border-b-2">
                                                        <th>Mã môn học</th>
                                                        <th>Tên môn học </th>
                                                        <th>Số tín chỉ</th>
                                                        <th>Điểm thành phần</th>
                                                        <th>Điểm trung bình</th>
                                                        <th>Thống kê môn học</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    {item.map((item) => {
                                                        return (
                                                            <tr className=" text-center">
                                                                <td>{item.course_id}</td>
                                                                <td>{item.course_name}</td>
                                                                <td>{item.credits}</td>
                                                                <td className="lg:pl-1 pl-2 grid grid-cols-2 lg:grid-cols-4 text-clip">
                                                                    <div className="text-start">BT:{item.exercise}</div>
                                                                    <div className="text-start">LAB:{item.lab}</div>
                                                                    <div className="text-start">GK:{item.midterm}</div>
                                                                    <div className="text-start">CK:{item.final}</div></td>
                                                                <td>{item.GPA}</td>
                                                                <td className="flex justify-center items-center">
                                                                    <button className=" flex items-center justify-center w-14 h-5 bg-purple-400 border rounded-lg hover:bg-purple-500"
                                                                        onClick={() => { if (show) setShow(0); else setShow(1) }}>
                                                                        <Image
                                                                            src="/statistic.png"
                                                                            width={15}
                                                                            height={20}
                                                                            alt="Picture of the author"
                                                                        />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    }
                                                </tbody>
                                            </table>
                                            <div className="flex flex-row">
                                                <div className="mb-20">{"Điểm trung bình học kỳ: " + score[index].score + " (hệ 4)"}</div>
                                                <div className="ml-6">{"Số TCTL học kỳ: " + score[index].credits}</div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                            }
                        </div>}
                    </div>
                </div>
                <div className={`${!show ? 'w-0' : ' w-1/3 mt-4 ml-2 '} flex flex-col transition-width h-144`}>
                    <PieChart animation={`${!show ? 'hidden' : ' animate-delay-[500ms] animate-fade animate-duration-700'}`} percentages={percentages}></PieChart>
                    {score.length != 0 && <div className={`border rounded-lg shadow-lg ${!show ? 'hidden' : 'mt-2 animate-delay-[500ms] rounded-lg animate-fade animate-duration-700 flex flex-col bg-blue-200'}`}>
                        <div className="text-center my-2">Tiến độ học tập</div>
                        <div className="flex-1 m-2">
                            <div className="grid grid-cols-2 gap-5 p-2">
                                <dl className="bg-orange-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center ">
                                    <dt className="w-8 h-8 rounded-full bg-orange-100 dark:bg-gray-500 text-orange-600 dark:text-orange-300 text-sm  flex items-center justify-center mb-1">128</dt>
                                    <dd className="text-orange-600  text-center">Tổng tín chỉ</dd>
                                </dl>

                                <dl className="bg-blue-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center ">
                                    <dt className="w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-500 text-teal-600 dark:text-teal-300 text-sm  flex items-center justify-center mb-1">{overallCredits}</dt>
                                    <dd className="inline-flex text-teal-600  text-center">Số tín chỉ đã hoàn thành</dd>
                                </dl>
                            </div>
                            <div className="flex-1"></div>
                        </div>
                    </div>
                    }
                </div>
            </div>
            <div className=" mb-4 px-2">


                <div className="flex flex-col  bg-blue-200 border rounded-lg shadow-lg ">
                    <div className=" text-center mt-2">Điểm trung bình học kỳ</div>
                    <div className="mx-2 my-10 flex-1 flex flex-row ">

                        <div className=" flex flex-col-reverse w-10 mr-3" style={{ height: 320 }}>
                            {
                                level.map((item) => {
                                    return (
                                        <div className="relative flex-1 justify-end "><div className="absolute right-0 -top-3">{item}</div></div>
                                    )
                                })
                            }
                        </div>
                        <div className="relative flex-1 flex mr-3">
                            {score.length != 0 && <div className="absolute inset-0 flex-1 flex flex-row z-30" >

                                {
                                    score.map((item, index) => {

                                        return (
                                            <div className="relative flex-1 flex justify-center px-2">
                                                <div id={`${index}`} className="absolute bottom-0 w-4  rounded-t-xl bg-red-300 hover:bg-red-500" style={{ height: (item.score / 4) * 320 }}>

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            }
                            <div className="absolute inset-0 flex flex-col z-20">
                                {
                                    level.map((item) => {
                                        return (
                                            <div className=" border-t-2 border-slate-400 flex-1"></div>
                                        )
                                    })
                                }
                            </div>
                            <div className="absolute h-0.5 bg-slate-400 bottom-0 inset-x-0"></div>
                        </div>
                    </div>
                </div>

            </div>
            {isMouseInside && score.length != 0 &&
                <div className="rounded-lg p-2 z-50 bg-slate-300" style={{ position: "fixed", left: position.x, top: position.y - 40 }}>{score[curAv].score}{" HK" + score[curAv].semester}</div>}
        </>
    )
}