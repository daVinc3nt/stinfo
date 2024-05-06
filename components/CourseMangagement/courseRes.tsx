import { useEffect, useState } from "react";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Registration from "./registration";
import { toNonAccentVietnamese } from "../CourseRegistration/nonAccentVietnamese";
import { StudentOperation, token } from "@/ambLib/amb";
import { CourseOperation } from "@/ambLib/amb";
import { error } from "console";



export default function CourseRegistration(props: { token: token }) {
    const [current, setCurrent] = useState(0)

    return (
        <>
            <div className="rounded-t-lg">
                <div className="mx-2 flex flex-col border rounded-lg shadow-blue-200 shadow-lg mb-8 md:text-base text-sm">
                    {/*NavBar */}

                    <div className=" text-center bg-slate-300 text-sm sm:text-lg p-2 rounded-t-lg">Đăng ký môn giảng dạy</div>

                    {current == 0 && <Registration token={props.token} />}


                </div>
            </div>
        </>
    )
}