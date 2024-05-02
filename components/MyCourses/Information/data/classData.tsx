// import { CourseOperation, CourseID, token } from "@/ambLib/amb";
// import { useState } from "react";

// interface FormKey {
//     CourseID?: CourseID;
//     token?: token;
// }

// export interface Person {
//     ID: string,
// }

// const getStudentList = async (): Promise<Person[]> => {
//     const initialValues: FormKey = { CourseID: null, token: null};
//     const { CourseID, token } = initialValues; 
//   

//     try {
//         const result = await fetchStudentListID.findClasses(CourseID, token);
//         if (result.error) {
//             throw new Error(result.error);
//         }
//         const studentsData: any[] = result.data; 
//         const students: Person[] = studentsData.map((student: any) => ({
//             ID: student.ID,
//         }));

//         return students;
//     } catch (error) {
//         console.error("Error fetching student list:", error);
//         return [];
//     }
// }

// export default getStudentList;


