import React, { useEffect, useState } from "react";

const QuizHeader = ( props: {header : string}) => {
    return (
        <div className=" bg-white text-3xl mb-10 border border-black rounded text-blue-700">
            <div className=" m-2">
                {props.header}
            </div>
        </div>
    );
};

export default QuizHeader;