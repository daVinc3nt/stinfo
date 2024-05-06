import { useEffect, useState } from "react";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Registration from "./registration";
import Result from "./result";
import { StudentOperation, token } from "@/ambLib/amb";
import { CourseOperation } from "@/ambLib/amb";
import { error } from "console";



export default function CourseRegistration() {
    const [current, setCurrent] = useState(0)
    const token: token = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiMjQyNDMwMDQiLCJyb2xlIjoiU2luaCB2acOqbiIsImFjdGl2ZSI6MSwiaWF0IjoxNzE0OTY3MDg1LCJleHAiOjE3MTUwMDMwODV9.fdrPBmSUhT1R91w8qC6Zkj402ixiqbn3DQa1E1xVRLc"

    }


    return (
        <>
            <div className="">
                <div className=" text-center m-2 text-sm sm:text-lg">Đăng ký môn học</div>
                <div className="mx-2 flex flex-col border rounded-lg shadow-blue-200 shadow-lg mb-8 md:text-base text-sm">
                    {/*NavBar */}
                    <div className="pl-4 flex justify-between items-center bg-blue-400 rounded-t-lg h-14">
                        <div className="flex flex-row">
                            <div className="relative flex items-center justify-center " >
                                <div className={`flex items-center justify-center m-1 w-32 h-[50px] ${current == 0 ? '' : 'hover:bg-slate-400 hover:rounded-lg'} cursor-pointer `} onClick={() => { setCurrent(0) }}>Đăng ký</div>
                                {current == 0 && <div className="absolute bottom-[2px]  h-[4px] w-full bg-slate-400 rounded-t-2xl"></div>}
                            </div>
                            <div className="relative flex items-center justify-center " >
                                <div className={`flex items-center justify-center m-1 w-32 h-[50px] ${current == 1 ? '' : 'hover:bg-slate-400 hover:rounded-lg'} cursor-pointer `} onClick={() => { setCurrent(1) }}>Kết quả ĐKMH</div>
                                {current == 1 && <div className="absolute bottom-[2px]  h-[4px] w-full bg-slate-400 rounded-t-lg"></div>}
                            </div>
                        </div>
                        <button className="pr-4"><NotificationsOutlinedIcon /></button>
                    </div>


                    {current == 0 && <Registration token={token} />}

                    {/*Result */}
                    {current == 1 && <div className="p-2"><Result token={token} />
                    </div>}
                </div>
            </div>
        </>
    )
}