import { Course } from "./coursesData"


const CoursesCard = ({course}: {course : Course}) => {
    const {src, Faculty, SubjectLink, SubjectName} = course
    return ( <div className='bg-gray-200 rounded-md shadow-md shadow-gray-300 relative overflow-hidden '>
        <img src={src} alt="/" className="w-full" />
        <div className="p-4 text-black">
            <div>{SubjectName}</div>
            <p>{SubjectLink}</p>
        </div>
        <div className="flex justify-between items-center bg-teal-100 rounded-md absolute top-2 left-2 p-2 min-w-[40%]"> 
            <div>{Faculty}</div>
        </div>
    </div>
    )
}


export default CoursesCard