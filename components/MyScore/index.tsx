import { useState, useEffect } from "react"
import Image from "next/image"
import { Button, button } from "@material-tailwind/react"
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
]
const date = "Tuần 13, 28/3/2024"
const PieChart = ({ percentages }) => {
    const [paths, setPaths] = useState([]);

    useEffect(() => {
        const total = percentages.reduce((acc, val) => acc + val, 0);
        let startAngle = 0;
        let endAngle = 0;
        let pathsArray = [];

        for (let i = 0; i < percentages.length; i++) {
            const percentage = percentages[i];
            endAngle = startAngle + (percentage / total) * 360;
            const largeArcFlag = percentage > 50 ? 1 : 0;

            const startX = Math.cos((startAngle * Math.PI) / 180) * 100 + 100;
            const startY = Math.sin((startAngle * Math.PI) / 180) * 100 + 100;

            const endX = Math.cos((endAngle * Math.PI) / 180) * 100 + 100;
            const endY = Math.sin((endAngle * Math.PI) / 180) * 100 + 100;

            const pathData = `M 100 100 L ${startX} ${startY} A 100 100 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
            pathsArray.push(<path key={i} d={pathData} fill={`hsl(${(360 / percentages.length) * i}, 70%, 50%)`} />);
            startAngle = endAngle;
        }

        setPaths(pathsArray);
    }, [percentages]);

    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            {paths}
        </svg>
    );
};

const IndexPage = () => {
    const percentages = [12, 12, 20, 22, 36];

    return (
        <div>
            <PieChart percentages={percentages} />
        </div>
    );
};
function IconStatistic() {
    const [statistic, setStatistic] = useState(1);
    return (
        <button className="relative flex justify-center w-14 h-6 bg-purple-400 border rounded-lg hover:bg-purple-500"
            onClick={() => { if (statistic) setStatistic(0); else setStatistic(1) }}
        >
            <Image
                src="/statistic.png"
                width={20}
                height={30}
                alt="Picture of the author"
            />

            {!statistic && <div className="absolute -top-10 -left-10 w-10 h-10 bg-white rounded-xl ">
                <svg height="20" width="20" viewBox="0 0 20 20">
                    <circle r="10" cx="10" cy="10" fill="white" />
                    <circle r="5" cx="10" cy="10" fill="transparent"
                        stroke="tomato"
                        stroke-width="10"
                        stroke-dasharray="calc(35 * 31.4 / 100) 31.4"
                        transform="rotate(-90) translate(-20)" />
                </svg>

            </div>}
        </button>
    )
}
export default function MyScore() {
    const [semes, setSemes] = useState("Tất cả");
    return (
        <div >
            <IndexPage></IndexPage>
            <div className="flex mt-4 justify-center text-xl">Bảng điểm sinh viên</div>
            <div className="relative flex flex-col bg-blue-200 m-4 p-2 border border-spacing-1 rounded-lg shadow-lg ">
                <div className="relative top-0">
                    <div className="relative left-0 top-0 ">Họ và Tên: {student.name} ({student.ID})</div>
                    <div className="absolute top-0 right-0 hidden xl:block">{date}</div>
                </div>
                <div>Điểm trung bình tích luỹ</div>
                <div>Số tín chỉ tích luỹ</div>
                <label className="flex items-center">
                    <p className=" mr-1">Chọn kết quả học kỳ:</p>
                    <select className="p-1 bg-gray-200 w-50 rounded-xl hover:bg-gray-300  "
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
                <div className="mt-10 flex flex-col">
                    {semester.map((item, index) => {
                        const key={index};
                        if (item.name == semes || semes == "Tất cả")
                            return (
                                <div key={index}>
                                    <h1 className="">{item.name}</h1>
                                    <table className="flex-1 mt-4 table-fixed mb-20">
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
                                                    <tr className="text-center">
                                                        <td>None</td>
                                                        <td>None</td>
                                                        <td>None</td>
                                                        <td>None</td>
                                                        <td>None</td>
                                                        <td className="flex justify-center"><IconStatistic></IconStatistic></td>
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
    )
}