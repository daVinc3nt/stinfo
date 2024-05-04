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

const Input = () => {
    const [rightformat, setRightformat] = useState(true);
    const pattern = /^\d+(\.\d)?$/;
    const handleText = (e) => {
        if (e.target.value == "") setRightformat(true);
        else setRightformat(pattern.test(e.target.value));
    }
    return (
        <input type="text" onChange={(e) => handleText(e)} className={`text-center h-6 w-12 ${rightformat ? "focus:outline-blue-400 bg-slate-100" : "focus:outline-red-500 bg-red-200"} focus:ring-blue-400 rounded-lg`} ></input>
    )
}


const Score = forwardRef((props: { class_id: string, course_id: string, token: token }, ref) => {
    const [Class, setClass] = useState<CLASS>({ class_id: "", students: [] })
    const it = ["LAB", "BT", "GK", "CK"];
    const [ele, setEle] = useState(0);
    const [dropdown, setDropdown] = useState(1);
    const [search, setSearch] = useState("");
    const [curselect, setCurselect] = useState(0);
    const [scorechange, setScorechange] = useState(false);
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    useEffect(() => {
        const course = new ClassOperation()
        const fetchData = async () => {
            await course.getScoreForTeacher({ class_id: props.class_id }, props.token).then(data => console.log(data))
        }
        fetchData()
    }, [])
    useEffect(() => {
        const Class = new CourseOperation()
        let Data: CLASS[]
        const fetchData = async () => {
            await Class.findClasses({ course_id: props.course_id }, props.token)
                .then(data => {
                    Data = data.data
                    for (let i = 0; i < Data.length; i++) {
                        if (Data[i].class_id == props.class_id) { setClass(Data[i]); break }
                    }
                })
        }
        fetchData()
    }, [])
    useImperativeHandle(ref, () => ({
        getChangescore: () => { return scorechange; },
    }))
    return (
        <div className="p-2">
            <div className="p-2 flex-col  rounded-lg bg-slate-200">
                <div className=" flex flex-col lg:flex-row lg:justify-between">
                    <div className="flex flex-row">
                        <div>
                            <button onClick={() => { if (dropdown) setDropdown(0); else setDropdown(1) }} id="dropdownRadioButton" className="truncate flex-none inline-flex h-[38px] items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5" type="button">
                                Tìm kiếm theo
                                <svg className="ml-2 w-3 h-3 " aria-hidden="true" fill="none" viewBox="0 0 12 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 4 6 8 10 4" />
                                </svg>
                            </button>

                        </div>
                        <div className="ml-2 px-2 h-[38px] flex flex-row items-center border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
                            <SearchIcon className="w-4 h-4 cursor-pointer " />
                            <input type="text" id="table-search" className="flex-1 block p-2 ps-10 text-sm text-gray-900 outline-none bg-gray-50" placeholder="Search for items" />
                        </div>
                    </div>
                    {/*Button for scorechange */}
                    <div className="flex flex-col">
                        <div className="relative inline ml-2 mr-2 mt-2 lg:mt-0 rounded-md hover:scale-110 hover:ease-in-out text-center truncate hover:bg-blue-700 hover:text-black p-2 bg-blue-500 text-white cursor-pointer"
                            onClick={() => { scorechange ? setScorechange(false) : setScorechange(true) }}>
                            {scorechange ? "Hoàn tất" : "Nhập và chỉnh sửa điểm"}
                            <div className={`${ele ? '' : 'hidden'} w-20 h-20 mt-2`}></div>
                        </div>
                        <div className="flex-1"></div>
                    </div>
                </div>

                <div className="relative flex flex-col lg:flex-row gap-2">
                    <div className={`z-30  ${dropdown ? 'hidden' : 'mt-2'} absolute w-48 bg-white  divide-y rounded-lg shadow"`}  >
                        <ul className=" p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2" />
                                    <label className="w-full ms-2 text-sm font-medium text-gray-900 rounded ">Mã số sinh viên</label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2" />
                                    <label className="w-full ms-2 text-sm font-medium text-gray-900 rounded ">Tên</label>
                                </div>
                            </li>

                        </ul>
                    </div>
                    {/* TABLE FOR SCORE INFO*/}
                    <div className="flex-1 lg:w-2/5 mt-4 h-80 flex flex-col">
                        <div className=" overflow-auto border-[1px] border-gray-500 rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase border-b-[1px] border-gray-500">
                                    <tr>
                                        {scorechange && <th scope="col" className="w-1/12 p-4 bg-blue-200" />}
                                        <th scope="col" className="w-1/6 px-6 py-3 bg-white">Mã số sinh viên</th>
                                        <th scope="col" className="w-1/4 px-6 py-3 bg-blue-200">Họ và tên</th>
                                        {!scorechange && <th scope="col" className="w-1/2 px-6 py-3 bg-white">Điểm thành phần</th>}
                                    </tr>
                                </thead>
                                <tbody>

                                    {Class.students.map((item, index) => {
                                        return (
                                            <tr className="cursor-pointer border-b-[1px] border-gray-500 bg-white dark:bg-gray-800 hover:bg-slate-30">
                                                {scorechange && <td className="p-4 bg-blue-200">
                                                    <div className="flex items-center justify-center">
                                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                                    </div>
                                                </td>}
                                                <td className="px-6 py-4 bg-white">{item}</td>
                                                <td className="px-6 py-4 bg-blue-200">Hà Trường Phước</td>
                                                {!scorechange && <td className="px-6 py-4 bg-white">None</td>}
                                            </tr>


                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex-1"></div>
                    </div>

                    {/*TABLE FOR SCORE CHANGING */}
                    {scorechange &&
                        <div className="flex-1 mt-4 flex flex-col h-80">

                            <div className="overflow-auto border-[1px] border-gray-500 rounded-lg text-sm">
                                <div className=" flex flex-row border-b-[1px] border-gray-500 bg-blue-300 p-3 justify-center text-center">
                                    Nhập và chỉnh sửa điểm
                                </div>
                                {Class.students.length != 0 &&
                                    Class.students.map((item) => {
                                        return (
                                            <div className="border-b-[1px] border-gray-500">
                                                <div className="flex flex-row bg-white">
                                                    <div className="py-3 flex-1 flex justify-center">MSSV:{item}</div>
                                                    <div className="w-[1px] bg-black h-11"></div>
                                                    <div className="py-3 flex-1 flex justify-center">Điểm trung bình: None</div>
                                                </div>
                                                <div className="bg-blue-200 flex flex-row py-3">
                                                    {it.map((other, index) => {
                                                        return (
                                                            <div className="flex-1 flex flex-row ">

                                                                <div className="flex-1 flex flex-row gap-2 px-2 items-center justify-between">
                                                                    <p className="flex-1 ">{other}</p>
                                                                    <Input />
                                                                </div>
                                                                {index != (it.length - 1) && <div className="w-[2px] h-full rounded-lg bg-gray-400 m-[1px]"></div>}
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