import React, { useEffect, useState } from "react";
import Deadline from "../InfoComponent/Deadline";
import SubmissionField from "./SubmissionField";

const SubmissionContent = ( props: {role : string}) => {
    // component logic here

    return (
        <div className="flex-auto">
            <SubmissionField role={props.role} />
        </div>
    );
}

export default SubmissionContent;