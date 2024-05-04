import { useState } from "react";
import { SearchIcon } from "lucide-react";
import course from "@/pages/dashboard/course_registration";
import AddIcon from '@mui/icons-material/Add';

export default function Lecture() {
    const it = [0];
    const [changeorMakenew, setChangeorMakenew] = useState(0);

    return (

        <div className="p-2">
            <div className="bg-slate-200 border rounded-lg p-2">
                <div className="rounded-lg flex justify-center items-center hover:bg-blue-700 bg-blue-400 w-20 cursor-pointer"><AddIcon></AddIcon></div>
                <div className="border p-2 bg-indigo-300 rounded-lg mt-2">
                    <div className="mb-4">Tạo chủ đề mới</div>
                    <div className="flex flex-row justify-between mb-2">
                        <input type="text" className="p-1 focus:outline-none focus:ring focus:ring-indigo-600 rounded-md" placeholder="Tên chủ đề"></input>
                        <div className="flex flex-row bg-white items-center justify-between rounded-l-md rounded-r-lg">
                            <div className="pl-1 pr-8">Thêm nội dung mới</div>
                            <div className="rounded-md flex justify-center items-center h-8 hover:bg-blue-600 bg-blue-400 w-20 cursor-pointer"><AddIcon></AddIcon></div>
                        </div>
                    </div>
                    {/*CONTENT*/}
                    {
                        it.map((item, index) => {
                            return (
                                <div>
                                    <div className="mt-4 inline-flex p-1 rounded-lg bg-slate-300">Nội dung {index + 1}</div>
                                    <div className="flex flex-row my-1 items-center">
                                        <input type="text" className="h-8 p-1 focus:outline-none focus:ring focus:ring-indigo-600 rounded-md" placeholder="Tên nội dung"></input>
                                        <div className="flex-1 flex">
                                            <input className="ml-4 mr-4 flex-1  block  text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50 border-black" type="file" />

                                        </div>
                                    </div>
                                    <div className="m-2">Ghi chú</div>
                                    <textarea className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}