import ColorTabs, { Page } from "@/components/MyBiography/ColorTabs";
import MyTeacher from "@/components/MyTeacher"
import TeachCalender from "@/components/MyTeacher/information/TeachCalender";


const pages: Page[] = [
    { label: 'Trang chủ', component: MyTeacher },

];


export default function Teacher() {
    return (
        <div className=" mt-4 mx-6  bg-white  shadow-gray-200">
            <div className="p-8 text-3xl text-white font-bold bg-sky-200">Thông tin giảng viên</div>
            <ColorTabs pages={pages} />
        </div>
    )
}

