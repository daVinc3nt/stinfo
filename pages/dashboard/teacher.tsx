import ColorTabs, { Page } from "@/components/MyBiography/ColorTabs";
import MyTeacher from "@/components/MyTeacher"
import TeachCalender from "@/components/MyTeacher/information/TeachCalender";


const pages: Page[] = [
    { label: 'Trang chủ', component: MyTeacher },
    { label: 'Lịch dạy', component: TeachCalender },
   
  ];


const teacher = () => {
    return (
        <div className="w-[92%] mt-10 mx-auto bg-white border border-gray-300 rounded-md shadow-sm shadow-gray-200 overflow-y-scroll">
            <div className="p-8 text-3xl text-white font-bold bg-sky-200">Thông tin giảng viên</div>
                <ColorTabs pages={pages} /> 
        </div>
    )
}

export default teacher