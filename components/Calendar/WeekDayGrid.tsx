'use client';

import React, { useEffect, useState } from "react";
import * as calendarProps from '@/components/Calendar/Features/interfaceProps';
// import { getWeekNavigation, getMonth, getYear } from "@/components/Calendar/Features/utils_calendar";
import { DateUtils } from "@/components/Calendar/Features/utils_calendar";

// get the current week
let offset = 0;
let weekDate: Date[] = DateUtils.getWeekNavigation(0);
let weekDay: string[] = ['Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'CN'];
let month: string = DateUtils.getMonth(0);
let year: number = DateUtils.getYear();
import NavigationBar from "@/components/Calendar/NavigationBar";


const WeekDateItem = (props: { day: Date }) => {
    // component logic here
    // use useState
    const [day, setDay] = useState<Date>(props.day);

    return (
        <div className="justify-center text-center">
            <div>
                {props.day.getDate()}
            </div>
        </div>
    );
};
const WeekDayItem = (props: { day: string }) => {
    // component logic here
    // use useState
    const [day, setDay] = useState<string>(props.day);

    return (
        <div className="justify-center text-center">
            {
                props.day
            }
        </div>
    );
}
const MonthYearItem = (props: { month: string, year: number}) => {
    // component logic here

    // use useState
    const [month, setMonth] = useState<string>(props.month);


    return (
        <div className="justify-center text pl-16">
            {props.month + ' ' + props.year}
        </div>
    );
}

export default function WeekDayGrid(props: { offset: number , changeCalendar: (navDirection: number) => void}) {

    // useEffect when the offset changes to update the weekDate, weekDay, and month

    const [weekDate, setWeekDate] = useState<Date[]>(DateUtils.getWeekNavigation(0));
    const [month, setMonth] = useState<string>(DateUtils.getMonth(0));
    const [year, setYear] = useState<number>(DateUtils.getYear());

    useEffect(() => {
        setWeekDate(DateUtils.getWeekNavigation(props.offset));
        setMonth(DateUtils.getMonth(props.offset));
        setYear(DateUtils.getYear());
    }, [props.offset]);

    return (
            <div className="flex flex-col sticky top-0 z-20">
                <div className="basis-1/4 relative bg-white">
                    <NavigationBar changeCalendar={props.changeCalendar}></NavigationBar>
                </div>
                <div className="basis-1/4 relative  bg-lime-200">
                    <MonthYearItem month={month} year={year} />
                </div>
                <div className="grid grid-cols-7 bg-blue-300 text-center relative basis-1/4 text-3xl">
                    {
                        weekDate.map((day, index) => {
                            return <WeekDateItem day={weekDate[index]} />
                        })
                    }
                </div>
                <div className="grid grid-cols-7 bg-yellow-200 text-center relative basis-1/4">
                    {
                        weekDay.map((day, index) => {
                            return <WeekDayItem day={weekDay[index]} />
                        })
                    }
                </div>
            </div>

    );
}