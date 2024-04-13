import { Course } from "./data1"
import { useState } from "react"
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import { ReportOutlined } from "@mui/icons-material";
export default function Registration() {
    const [dropdown, setDropdown] = useState(1);
    const [course, setCourse] = useState([]);
    const [search, setSearch] = useState("");
    const [choose, setChoose] = useState([]);
    const [anounce, setAnounce] = useState(1);
    const [check, setCheck] = useState(1);
    const [delt, setDelt] = useState([]);
    console.log(delt);
    console.log(choose);
    console.log(check);
    const handleDelt = (idx) => {
        if (idx < 0) {
            const temp = [...delt];
            temp.map((item, index) => { if (!temp[index]) temp[index] = 1; })
            setDelt(temp);
            console.log("H");
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
            delt.map((item, index) => {
                if (delt[index] == 1) { console.log("HELLO"); temp.push(choose[index]); temp1.push(1); }
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
        let temp = choose;
        setChoose([...choose, e]);
        setDelt([...delt, 1]);
    }
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    const searchCourse = (name: String) => {
        const temp: { courseID: String, name: String, numofCredit: Number, numofStudent: Number }[] = [];
        function checksubStr(child: String, parent: String) {
            child = child.toLowerCase();
            parent = parent.toLowerCase();
            let cLen = child.length;
            let pLen = parent.length - cLen;
            for (let i = 0; i <= pLen; i++) {
                if (parent.substring(i, i + cLen) == child) return true;

            }
            return false;
        }
        {
            let x = 0; Course.map((item) => {
                if (checksubStr(name, item.name)) temp.push(item);
            })
        }
        setCourse(temp);
    }
    return (
        <div className="flex flex-col lg:flex-row p-2 bg-slate-200">
            <div className=" flex flex-col">
                <div className="border-t-2 flex flex-col  p-2 bg-orange-200 rounded-lg h-20">
                    Lịch đăng ký
                    <div>Trạng thái: Chưa mở đăng ký</div>
                </div>
                <div className="flex-1"></div>
            </div>
            <div className="flex-1 flex flex-col lg:ml-6 ">
                <div className="shadow-lg bg-blue-300 flex flex-col p-4 border rounded-md border-blue-400  mb-4">
                    <div className="text-center">Chọn môn đăng ký</div>
                    <div className="flex-1 mt-2 flex flex-col sm:flex-row flex-wrap space-y-4   justify-between pb-4">
                        <div>
                            <button onClick={() => { if (dropdown) setDropdown(0); else setDropdown(1) }} id="dropdownRadioButton" className="inline-flex h-[38px] items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5" type="button">
                                Last 30 days
                                <svg className="ml-2 w-2.5 h-2.5 ms-2.5" aria-hidden="true" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <div id="dropdownRadio" className={`z-10  ${dropdown ? 'hidden' : ''} w-48 bg-white divide-y rounded-lg shadow"`} data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" >
                                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                                    <li>
                                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input id="filter-radio-example-1" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                            <label className="w-full ms-2 text-sm font-medium text-gray-900 rounded ">Last day</label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input id="filter-radio-example-2" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                            <label className="w-full ms-2 text-sm font-medium text-gray-900 rounded ">Last 7 days</label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input id="filter-radio-example-3" type="radio" value="" name="filter-radio" className=" outline-none w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                            <label className="w-full ms-2 text-sm font-medium text-gray-900 rounded ">Last 30 days</label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input id="filter-radio-example-4" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                            <label className="w-full ms-2 text-sm font-medium text-gray-900 rounded ">Last month</label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input id="filter-radio-example-5" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                            <label className="w-full ms-2 text-sm font-medium text-gray-900 rounded ">Last year</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="px-2 h-[38px] flex flex-row items-center border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
                            <button onClick={() => searchCourse(search)}><SearchIcon /></button>
                            <input type="text" id="table-search" className="flex-1 block p-2 ps-10 text-sm text-gray-900 outline-none bg-gray-50" placeholder="Search for items" onChange={handleSearch} value={search} />
                        </div>
                    </div>
                    <div className="h-80 overflow-auto border rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 bg-slate-200">
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
                                        Số sinh viên đã đăng ký
                                    </th>
                                    <th scope="col" className="px-6 py-3">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>

                                {course.map((item) => {
                                    return (
                                        <tr onClick={() => { if (choose.includes(item) == false) handleChoose(item); }} className="cursor-pointer bg-white dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.courseID}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.numofCredit}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.numofStudent}
                                            </td>
                                            <td className=" px-6 py-4">{choose.includes(item) ? "Đã thêm vào danh sách đăng ký" : ""}</td>
                                        </tr>

                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                {!check && <div className="p-2 border rounded-lg bg-white w-1/2 mb-2 animate-jump">
                    <div className="flex justify-center gap-2"><ReportOutlinedIcon />Nhắc nhở  </div>
                    <div className="p-2">Nếu bạn huỷ đăng ký các môn đã chọn có thể các môn đó sẽ không còn đăng ký được do giới hạn số lượng. Bạn có muốn tiếp tục huỷ đăng ký không ?</div>
                    <div className="m-2 grid grid-cols-2 gap-2 justify-center">
                        <button className="inline p-2 rounded-lg bg-slate-300" onClick={() => { setAnounce(1); handleDelt(0); }}>Có</button>
                        <button className=" inline p-2 rounded-lg bg-slate-300" onClick={() => { setAnounce(1); handleDelt(-1); }}>Không</button>
                    </div>
                </div>}
                <div className=" p-2 border rounded-lg bg-green-300">
                    <div className="text-center mb-4">Môn học đã đăng ký</div>
                    <button className="h-4 mb-4" onClick={() => handleAnounce()}>
                        {anounce ? <div className="flex flex-row animate-fade-right gap-2 items-center"><ChangeCircleOutlinedIcon />Chỉnh sửa phiếu đăng ký</div>
                            : <div className="flex flex-row animate-fade-left gap-2 items-center">Nhấn vào để xác nhận huỷ đăng ký môn học đã chọn <DeleteIcon /></div>}
                    </button>
                    <div className="grid grid-cols-3 gap-3">
                        {
                            choose.map((item, index) => {
                                return (
                                    <div className="border flex flex-col rounded-lg hover:shadow-md">
                                        <div className="relative bg-green-200 flex items-center justify-center h-10">
                                            {item.name}
                                            {!anounce && <input type="checkbox" className="absolute top-2 right-2 " onClick={() => handleDelt(index)}></input>}
                                        </div>
                                        <div className="bg-white flex-1 flex flex-col">
                                            <div>Mã môn học: {item.courseID}</div>
                                            <div>Số tín chỉ: {item.numofCredit}</div>
                                            <div>Giảng viên: Đang cập nhật</div>
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
