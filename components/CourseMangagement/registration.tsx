import { useState, useEffect } from "react"
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import { toNonAccentVietnamese } from "../CourseRegistration/nonAccentVietnamese";
import { ClassOperation, token, CourseOperation, UpdatingCourseInfo, RegisterClassInfo, StudentOperation } from "@/ambLib/amb";
import CloseIcon from '@mui/icons-material/Close';

interface registerdCourse {
    class_id: string
    course_id: string
    course_name: string
    credit: number
    day: string
    teacher: string
    semester: string
    room: string
    period: number[]
}

interface Course {
    course_id: string
    course_name: string
    credits: number
    course_type: string
    class_id: string[]
    classState: string
}

export default function Registration(props: { token: token }) {
    const [course, setCourse] = useState<Course[]>([]);
    const [search, setSearch] = useState("");
    const [choose, setChoose] = useState<Course[]>([]);
    const [anounce, setAnounce] = useState(1);
    const [check, setCheck] = useState(1)
    const [delt, setDelt] = useState([])
    const [courselst, setCourselst] = useState<Course[]>([])
    const [buttonClass, setButtonclass] = useState(false)
    const [curcourse, setCurcourse] = useState(-1)
    const [buttonRegister, setButtonRegister] = useState(true)

    useEffect(() => {
        if (!anounce || choose.length == 0) setButtonRegister(false)
        else setButtonRegister(true)
    }, [check, anounce, choose])


    useEffect(() => {
        if (courselst.length == 0) return
        const fetchClass = async () => {
            const Class = new CourseOperation()
            let temp: Course[] = courselst
            let len = courselst.length
            for (let i = 0; i < len; i++) {
                await Class.findClasses({ course_id: courselst[i].course_id }, props.token)
                    .then(data => {
                        let x = data.data
                        for (let j = 0; j < x.length; j++) {
                            temp[i].class_id.push(x[j].class_id)
                        }
                    }
                    )
            }
        }
        fetchClass()
    }, [courselst])

    useEffect(() => {
        const fetchCourse = async () => {
            let temp: UpdatingCourseInfo
            const course = new CourseOperation()
            let lst: Course[] = []
            await course.findAllCourses(temp, props.token).then(data => {
                if (data.data) {
                    let x: Course[] = data.data
                    for (let i = 0; i < x.length; i++) {
                        lst.push({ class_id: [], course_id: x[i].course_id, course_name: x[i].course_name, credits: x[i].credits, course_type: x[i].course_type, classState: "" })
                    }
                    setCourselst(lst)
                }
            })
        }
        fetchCourse()
    }, [])

    const handleRegister = (id: number, classState: string) => {
        const temp: Course[] = choose
        temp[id].classState = classState
        setChoose(temp)
    }
    const handleDelt = (idx) => {
        if (idx < 0) {
            const temp = [...delt];
            temp.map((item, index) => {
                if (!temp[index]) temp[index] = 1;
            })
            setDelt(temp);
            setCheck(1);
            return;
        }

        if (check) {

            const temp = [...delt];
            if (temp[idx]) temp[idx] = 0;
            else temp[idx] = 1;
            setDelt(temp);
        }
        else {
            const temp = [];
            const temp1 = [];
            const temp2: Course[] = choose
            delt.map((item, index) => {
                if (delt[index] == 1) {
                    temp.push(choose[index]);
                    temp1.push(1);
                } else temp2[index].classState = ""
            })
            setDelt(temp1);
            setChoose(temp);
            setCheck(1);
        }
    }

    const handleAnounce = () => {
        if (anounce && choose.length != 0) setAnounce(0);
        else {
            if (choose.length != 0) {
                if (delt.find(ele => ele == 0) == undefined) setAnounce(1);
                else setCheck(0);
            }
        }
    }
    const handleChoose = (e) => {
        setChoose([...choose, e]);
        setDelt([...delt, 1]);
    }
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const searchCourse = (name: String) => {
        const temp: Course[] = [];
        function checksubStr(child: String, parent: String) {
            child = toNonAccentVietnamese(child)
            child = child.toLowerCase()
            parent = toNonAccentVietnamese(parent)
            parent = parent.toLowerCase()
            let cLen = child.length;
            let pLen = parent.length - cLen;
            for (let i = 0; i <= pLen; i++) {
                if (parent.substring(i, i + cLen) == child) return true;

            }
            return false;
        }
        courselst.map((item) => {
            if (checksubStr(name, item.course_name)) temp.push(item);
        })

        setCourse(temp);
    }
    const handleResToServer = () => {
        const postClass = new ClassOperation()
        for (let i = 0; i < choose.length; i++) {
            postClass.register({ class_id: choose[i].classState, course_id: choose[i].course_id }, props.token).then(data => console.log(data))
        }
    }
    return (
        <div className=" p-2 bg-slate-200 ">

            <div className="flex-1 flex flex-col ">
                <div className="shadow-lg bg-blue-300 flex flex-col p-4 border rounded-md border-blue-400  mb-4">
                    <div className="text-center">Chọn môn đăng ký</div>

                    <div className="my-2 px-2 h-[38px] flex flex-row items-center border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
                        <button onClick={() => { searchCourse(search), setButtonclass(false) }}><SearchIcon /></button>
                        <input type="text" id="table-search" className="flex-1 inline p-2 ps-10 text-sm text-gray-900 outline-none bg-gray-50" placeholder="Search for items" onChange={handleSearch} value={search} />
                    </div>
                    <div className="h-80 flex flex-col overflow-auto">
                        <div className="flex flex-row">
                            <div className=" flex-1 border ">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                    <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 bg-slate-200 ">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Mã môn học
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Tên môn học
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Số tín chỉ
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Phân loại môn học
                                            </th>
                                            <th scope="col" className="px-6 py-3">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {course.map((item, index) => {
                                            return (
                                                <tr onClick={() => { if (choose.includes(item) == false) handleChoose(item); setCurcourse(index); setButtonclass(true) }} className="cursor-pointer bg-white dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-600">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.course_id}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {item.course_name}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {item.credits}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {item.course_type}
                                                    </td>
                                                    <td className=" px-6 py-4">{choose.includes(item) ? (item.classState == "") ? "Chọn lớp" : "Đã thêm vào danh sách đăng ký" : ""}</td>
                                                </tr>

                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {buttonClass &&
                                <div className="relative ml-2 w-24 text-center rounded-t-lg">
                                    <div className="absolute top-0 right-0 cursor-pointer" onClick={() => setButtonclass(false)}><CloseIcon /></div>
                                    <div className="py-2 items-center bg-slate-200 rounded-t-lg">Lớp</div>
                                    <div className="flex flex-col bg-white">
                                        {course[curcourse].class_id.length != 0 &&
                                            course[curcourse].class_id.map((item) => {
                                                return (
                                                    <button className="p-1 focus:bg-blue-500 hover:bg-blue-500 text-sm" onClick={() => handleRegister(choose.indexOf(course[curcourse]), item)}>{item}</button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            }
                            <div className="w-0"></div>
                        </div>
                        <div className="flex-1"></div>
                    </div>
                </div>
                {!check && <div className="p-2 border rounded-lg bg-white w-1/2 mb-2 animate-jump">
                    <div className="flex justify-center gap-2"><ReportOutlinedIcon />Nhắc nhở  </div>
                    <div className="p-2">Nếu bạn huỷ đăng ký các môn đã chọn, khi chọn lại các môn đó có thể sẽ đăng ký được do giới hạn số lượng. Bạn có muốn huỷ các môn đã chọn không ?</div>
                    <div className="m-2 grid grid-cols-2 gap-2 justify-center">
                        <button className="inline p-2 rounded-lg bg-slate-300" onClick={() => { setAnounce(1); handleDelt(0); }}>Có</button>
                        <button className=" inline p-2 rounded-lg bg-slate-300" onClick={() => { setAnounce(1); handleDelt(-1); }}>Không</button>
                    </div>
                </div>}
                <div className=" p-2 border rounded-lg bg-green-300">
                    <div className="text-center mb-4">Môn học đã đăng ký</div>
                    <div className="flex flex-row justify-between items-center mb-4">
                        <button className="h-4" onClick={() => handleAnounce()}>
                            {anounce ? <div className="flex flex-row animate-fade-right gap-2 items-center"><ChangeCircleOutlinedIcon />Chỉnh sửa phiếu đăng ký</div>
                                : <div className="flex flex-row animate-fade-left gap-2 items-center">Nhấn vào để xác nhận huỷ đăng ký môn học đã chọn <DeleteIcon /></div>}
                        </button>
                        {buttonRegister && <button className="bg-green-500 p-1 text-white rounded-lg shadow-lg hover:text-black hover:scale-110" onClick={() => { handleResToServer() }}>Xác nhận đăng ký</button>}
                    </div>
                    {choose.length != 0 && <div className="flex flex-col h-screen_1/5">

                        <div className="grid grid-cols-3 gap-3 overflow-auto">

                            {
                                choose.map((item, index) => {
                                    if (choose[index].classState.length != 0)
                                        return (
                                            <div className="border flex flex-col rounded-lg hover:shadow-md">
                                                <div className=" relative bg-green-200 flex items-center justify-center rounded-t-lg h-10">
                                                    {item.course_name}
                                                    {!anounce && <input type="checkbox" className="absolute top-2 right-2 " onClick={() => { if (check) handleDelt(index) }}></input>}
                                                </div>
                                                <div className="pl-1 pt-1 bg-white flex-1 flex flex-col rounded-b-lg">
                                                    <div>Mã môn học: {item.course_id}</div>
                                                    <div>Số tín chỉ: {item.credits}</div>
                                                    <div>Lớp: {item.classState}</div>
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
}
