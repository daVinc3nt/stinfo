import React, { useEffect, useState } from "react";
import SubmissionContent from "./SubmissionComponent/SubmissionContent";
import MultipleChoiceContent from "./MultipleChoiceComponent/MultipleChoiceContent";
import { HomeworkType } from "./Utilities/interfaceProps";

const HomeworkContent = ( props: { typeOfHomework: HomeworkType, role: string}) => {

    // console.log(props.typeOfHomework);
    return (

        // If typeOfHomework is 0, render the SubmissionContent component
        // If typeOfHomework is 1, render nothing
        <div className=" flex">
            {
                props.typeOfHomework === HomeworkType.submission ? 
                    <SubmissionContent role={props.role}/> : null
            }
            {
                props.typeOfHomework === HomeworkType.multipleChoice ? 
                    <MultipleChoiceContent /> : null
            }
        </div>

    );
};

export default HomeworkContent;