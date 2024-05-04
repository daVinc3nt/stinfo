import { forwardRef, useEffect, useState } from "react";
import { ClassOperation, CourseOperation, TeacherOperation, token } from "@/ambLib/amb";


const Submiss = forwardRef((props: { class_id: string, course_id: string, token: token }, ref) => {

    const [listFileName, setListFileName] = useState<string[]>([]);
    const fetchFile = async () => {
        const file = new ClassOperation()
        await file.getSubmitFile({ class_id: props.class_id }, props.token)
            .then(data => console.log(data))
    }

    useEffect(() => {
        const operation = new ClassOperation();
        if (props.class_id && props.token) {
            operation.showSubmitFile({ class_id: props.class_id }, props.token)
                .then(data => {
                    const getData = data;
                    if (getData.data) {
                        // console.log("list of submit File: ", getData);
                        setListFileName(getData.data);
                    }
                }
                )
        }
    }, []);
    const ShowUploadFile = () => {
        if (listFileName) {
            if (listFileName.length > 0)
                return (
                    <div className='bg-green-200'>
                        {
                            // show all the File Name based on listFileName
                            listFileName.map((fileName, index) => {
                                return (
                                    <div key={index}>
                                        {fileName}
                                    </div>
                                )
                            })
                        }
                    </div>
                )

        }
        else {
            return (
                <div>
                    Không có tập tin
                </div>
            )
        }
    }

    return (
        <div>

            <button className="ml-2 mt-1 shadow-lg rounded-lg hover:scale-110 bg-blue-400 text-white p-1 inline" onClick={() => fetchFile()}>
                Download
            </button>
            <ShowUploadFile />
        </div>

    )
})
export default Submiss