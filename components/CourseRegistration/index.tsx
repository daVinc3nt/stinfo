import { useState } from "react";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Registration from "./registration";
import History from "./history";
import Result from "./result";


export default function CourseRegistration() {
    const [current, setCurrent] = useState(0);
    return (
        <>
            <div className="lg:text-base text-sm">
                <div className=" text-center m-2 text-sm sm:text-lg">Đăng ký môn học</div>
                <div className="mx-2 flex flex-col border rounded-lg shadow-blue-200 shadow-lg mb-8">
                    {/*NavBar */}
                    <div className="pl-4 flex justify-between items-center bg-blue-400 rounded-t-lg h-14">
                        <div className=" flex flex-row">
                            <div onClick={() => setCurrent(0)} className="text-sm md:text-base hover:border-b-[3px] p-4 flex-1  flex items-center justify-center  hover:border-blue-500"><div className="cursor-default">Đăng ký</div></div>
                            <div onClick={() => setCurrent(2)} className="text-sm md:text-base hover:border-b-[3px] p-4 flex items-center justify-center  hover:border-blue-500"><div className="cursor-default">Kết quả đăng ký</div></div>
                        </div>
                        <button className="pr-4"><NotificationsOutlinedIcon /></button>
                    </div>


                    {current == 0 && <Registration />}

                    {/*Result */}
                    {current == 2 && <Result />}
                </div>
            </div>
        </>
    )
}