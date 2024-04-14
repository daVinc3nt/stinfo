'use client';
import React, { useEffect, useState } from "react";
import Header from "@/components/Homework/Header";
import HomeworkContent from "@/components/Homework/Content";
import Info from "@/components/Homework/Info";
import { HomeworkType } from "@/components/Homework/Utilities/interfaceProps";
import { HomeworkGeneralData } from "@/components/Homework/Data";


const Quiz = () => {
    return (
        <div className=" block m-10">
            <Header />
            <Info />
            <HomeworkContent typeOfHomework={HomeworkGeneralData.whichHomeworkType}/>
        </div>
    );
};

export default Quiz;