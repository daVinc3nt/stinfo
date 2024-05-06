import { useEffect, useState } from "react";
import { ClassID, CourseOperation, StudentOperation, token } from "@/ambLib/amb";
import cookie from "js-cookie"



const myToken: token = {
  token: cookie.get("token"),
};

interface CardModeProps {
  CourseID: string;
  CourseName: string;
  Teacher: string;
  ClassID: string;
}



const CardMode: React.FC<CardModeProps> = ({ CourseID,CourseName,Teacher,ClassID }) => {
 console.log(CourseID)
const [classID, setClassID] = useState<any>([]);
const fetchClassID = async (/*courseID: string*/) => {  
  try {
      const getClassIDAPI = new StudentOperation();
      const response12 = await getClassIDAPI.findStudentRegisteredClass(myToken);
      // const response1 = await getClassIDAPI.findClasses(  {course_id: "CS2976"}, myToken);
       console.log(response12.data[0])
      setClassID(response12.data[0]);
  } catch (error) {
      console.error("Error fetching class data:", error);
  }
};
useEffect(() => {
  fetchClassID();  
}, []);

const handleLinkClick = (ClassID_input:string) => {
  const url = `./class_info?class_id=${ClassID_input}`;
  window.open(url, '_blank');
};


    // return (
    //   <div>
    //     {classID && (
    //       <div className="bg-gray-200 rounded-md shadow-md hover:scale-105 duration-100 ease-in-out shadow-gray-300 relative overflow-hidden">
    //       <img src="https://th.bing.com/th/id/OIP.8bss3pk_BMm06NPJfvQrHAHaDm?rs=1&pid=ImgDetMain"  className="w-full" />
    //       <div className="p-4 text-black">
    //           <div className="flex justify-between items-center">
    //               <div className="font-bold text-lg mb-2">{classID.course_name}-{classID.course_id} </div>
    //               {/* <div className="font-bold text-lg mb-2 text-blue-400">{classID.program}</div> */}
    //           </div>
    //             <button>
    //               <span className="cursor-pointer text-blue-500 border-b border-blue-500 hover:border-transparent hover:bg-transparent" 
    //               onClick={() => handleLinkClick(classID.class_id)}>
    //                 Lớp:{classID.class_id}----- GV:{classID.teacher} 
    //               </span>
    //             </button>
    //              <div className="flex justify-between items-center bg-teal-100 rounded-md absolute top-2 left-2 p-2 md:w-2/3">
    //              <div className="text-sm">{classID.program}-- MÃ MÔN:{classID.course_id}</div>
                 
    //              </div>
    //       </div>
    //   </div>
    //     )}
    //   </div>
    // )
    return (
        <div>
         
          <div className="bg-gray-200 rounded-md shadow-md hover:scale-105 duration-100 ease-in-out shadow-gray-300 relative overflow-hidden group">
          <img src="https://th.bing.com/th/id/OIP.s5i4oFXbcoqebKq3ylnzqgHaHa?w=158&h=180&c=7&r=0&o=5&pid=1.7"  className="w-full" />
          <div className="p-4 text-black">
              <div className="flex justify-between items-center">
                  <div className="font-bold text-lg mb-2">{CourseName}-{CourseID} </div>
                  {/* <div className="font-bold text-lg mb-2 text-blue-400">{classID.program}</div> */}
              </div>
                <button>
                  <span className="cursor-pointer text-blue-500 border-b border-blue-500 hover:border-transparent hover:bg-transparent" 
                  onClick={() => handleLinkClick(ClassID)}>
                    <div>
                    Lớp:{ClassID}
                    </div>
                    <div>
                    GV:{Teacher} 
                    </div>
               
                  </span>
                </button>
                 {/* <div className="flex justify-between items-center bg-teal-100 rounded-md absolute top-2 left-2 p-2 md:w-2/3">
                 <div className="text-sm">{classID.program}-- MÃ MÔN:{classID.course_id}</div>
                 
                 </div> */}
          </div>
      </div>
        
      </div>
    )
}


export default CardMode;









  
 
