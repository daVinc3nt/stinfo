import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button, button } from "@material-tailwind/react"


const DATE = new Date();
interface course {
    ID: number,
    Name: string,
    Score: number[],
    FinalScore: number,
    numofCredit: number,
    semeter: string
}
const student: { name: string, ID: string, score: number, listofCourse: course[] } = {
    name: "Hà Trường Phước",
    ID: "2212714",
    score: 0,
    listofCourse: [],

}
var semester: { name: string, course: number[] }[] = [
    { name: "Học kỳ 1 Năm học 2022 - 2023", course: [0, 1, 2] },
    { name: "Học kỳ 2 Năm học 2022 - 2023", course: [0] },
    { name: "Học kỳ 1 năm học 2023-2024", course: [0, 1, 2, 3, 4] }
]
const date = "Tuần 13, 28/3/2024"
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
        <div className={`flex-1 flex flex-col bg-blue-200 border-spacing-1 rounded-lg justify-center ${animation}`}>
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

const chartMouse = (x, y) => {

}
const getPosition = () => {

}
export default function MyScore() {
    const [semes, setSemes] = useState("Tất cả");
    const [show, setShow] = useState(0);
    const percentages = [12, 12, 20, 22, 10, 26];
    const score = [3, 2.9, 2.8, 3.2, 3.4, 3.3, 3.2, 3.2];
    const level = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]
    return (
        <>
            <div className="flex mt-2 justify-center text-xl">Bảng điểm sinh viên</div>
            <div className=" flex flex-row mx-2">
                <div className="flex-1 my-4  flex flex-col" >
                    <div className={`flex flex-col bg-blue-200 p-2 border border-spacing-1 rounded-lg shadow-lg h-144 `}>
                        <div className="flex justify-between ">
                            <div>Họ và Tên: {student.name} ({student.ID})</div>
                            <div className="hidden xl:block">{DATE.getDate() + '/' + DATE.getMonth() + '/' + DATE.getFullYear()}</div>
                        </div>
                        <div>Điểm trung bình tích luỹ</div>
                        <div>Số tín chỉ tích luỹ</div>
                        <label className="flex items-center">
                            <p className=" mr-1">Chọn kết quả học kỳ:</p>
                            <select className=" bg-gray-200 w-50 rounded-xl hover:bg-gray-300  "
                                value={semes}
                                onChange={(e) => { setSemes(e.target.value) }}
                            >
                                <option value="Tất cả">Tất cả</option>
                                {
                                    semester.map((item) => {
                                        return (
                                            <option value={item.name}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </label>

                        <div className="overflow-auto mt-10 flex flex-col ">
                            {semester.map((item, index) => {
                                const key = { index };
                                if (item.name == semes || semes == "Tất cả")
                                    return (
                                        <div className=" animate-fade-down flex flex-col" key={index}>
                                            <div className="bg-gray-300 border-2  rounded-xl text-center w-64">{item.name}</div>
                                            <table className="  table-fixed flex-1 mt-4 mb-20">
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
                                                    {item.course.map((item) => {
                                                        return (
                                                            <tr className=" text-center">
                                                                <td>None</td>
                                                                <td>None</td>
                                                                <td>None</td>
                                                                <td>None</td>
                                                                <td>None</td>
                                                                <td className="flex justify-center items-center">
                                                                    <button className="relative flex items-center justify-center w-14 h-5 bg-purple-400 border rounded-lg hover:bg-purple-500"
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
                                        </div>
                                    )
                            })
                            }
                        </div>
                    </div>
                </div>
                <div className={`${!show ? 'w-0' : ' w-1/3 mt-4 ml-2 '} flex flex-col transition-width h-144`}>
                    <PieChart animation={`${!show ? 'hidden' : ' animate-delay-[500ms] animate-fade animate-duration-700'}`} percentages={percentages}></PieChart>
                    <div className={`border rounded-lg shadow-lg ${!show ? 'hidden' : 'mt-2 animate-delay-[500ms] rounded-lg animate-fade animate-duration-700 flex-1 flex flex-col bg-blue-200'}`}>
                        <div className="text-center my-2">Tiến độ học tập</div>
                        <div className="flex-1 mx-2">
                            <div className="grid grid-cols-3 gap-5">
                                <dl className="bg-orange-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
                                    <dt className="w-8 h-8 rounded-full bg-orange-100 dark:bg-gray-500 text-orange-600 dark:text-orange-300 text-sm  flex items-center justify-center mb-1">128</dt>
                                    <dd className="text-orange-600 dark:text-orange-300 text-sm ">Tổng tín chỉ</dd>
                                </dl>
                                <dl className="bg-teal-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
                                    <dt className="w-8 h-8 rounded-full bg-teal-100 dark:bg-gray-500 text-teal-600 dark:text-teal-300 text-sm  flex items-center justify-center mb-1">15</dt>
                                    <dd className="text-teal-600 dark:text-teal-300 text-sm ">Số tín chỉ đang học</dd>
                                </dl>
                                <dl className="bg-blue-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
                                    <dt className="w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-500 text-blue-600 dark:text-blue-300 text-sm  flex items-center justify-center mb-1">50</dt>
                                    <dd className="text-blue-600 dark:text-blue-300 text-sm  text-center">Số tín chỉ đã hoàn thành</dd>
                                </dl>
                            </div>
                            <div className="flex-1"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row mb-4 px-2">
                {/*Tool for predicting score */}
                <div className="flex-1 flex flex-col border rounded-lg shadow-lg bg-blue-200 h-96 mr-2">
                    <div className="text-center mt-2 mb-2">Dự đoán điểm môn học</div>
                    <div className="h-[2px] bg-slate-200"></div>
                    <div className="flex-1 flex flex-row">

                        {/*User*/}
                        <div className="flex-1">
                            <div className="my-2 text-center">Dự đoán của bạn</div>
                        </div>
                        <div className="w-1 bg-slate-200"></div>
                        {/*System*/}
                        <div className="flex-1">
                            <div className="my-2 text-center">Dự đoán của hệ thống</div>
                        </div>
                    </div>
                    <div className="text-center mt-2 mb-4"></div>
                </div>

                {/*MAKE CHART FOR SEMESTER AVERAGE SCORE */}
                <div className="flex-1 flex flex-col  bg-blue-200 border rounded-lg shadow-lg ">
                    <div className=" text-center mt-2">Điểm trung bình học kỳ</div>
                    <div className="mx-2 my-10 flex-1 flex flex-row" style={{ height: 320 }}>
                        <div className=" flex flex-col-reverse w-10 mr-3">
                            {
                                level.map((item) => {
                                    return (
                                        <div className="relative flex-1 justify-end  hover:bg-slate-200 "><div className="absolute right-0 -top-3">{item}</div></div>
                                    )
                                })
                            }
                        </div>
                        <div className="relative flex-1 flex mr-3">
                            <div className="absolute inset-0 flex-1 flex flex-row z-30" >

                                {
                                    score.map((item) => {

                                        return (
                                            <div className="relative flex-1 flex justify-center px-2">
                                                <div className="absolute bottom-0 w-4  rounded-t-xl bg-red-300 hover:bg-red-500" style={{ height: (item / 4) * 320 }}>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="absolute inset-0 flex flex-col z-20">
                                {
                                    score.map((item) => {
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

        </>
    )
}