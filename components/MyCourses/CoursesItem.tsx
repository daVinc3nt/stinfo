
import CoursesCard from "./content/CoursesCard"
import { coursesData } from "./content/coursesData"




const CoursesItem = () => {
    return ( 
        <div>
            <h1 className="flex justify-start items-start border-b shadow-black shadow-sm bg-teal-300
                        font-bold text-white text-start text-2xl p-4 ">Tổng quan khóa học</h1>
            <div className="p-6 rounded-sm shadow-sm shadow-gray-200 bg-gray-200
                            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
                {coursesData.map((course,index)=> <CoursesCard  key={index} course={course}/>)}
                
            </div>
        </div>
        



    )
}

export default CoursesItem