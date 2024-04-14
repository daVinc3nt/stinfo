import React, { useEffect, useState } from "react";
import Deadline from "../InfoComponent/Deadline";
import MultipleChoiceField from "./MultipleChoiceField";

const MultipleChoiceContent = () => {

    // component logic here

    return (
        <div className=" flex-auto">
            <div className="">
                <MultipleChoiceField />
            </div>
        </div>
    );
}

export default MultipleChoiceContent;