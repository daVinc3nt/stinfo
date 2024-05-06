'use client';
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { bool } from "prop-types";
import { eventsData, subjectData, fillMissingData, generateWeekCalendar } from "./EventData";
import { EventProps, SubjectProps } from "./Features/interfaceProps";
import { Key } from "lucide-react";
import { DateUtils, WeekUtils } from "./Features/utils_calendar";
import { VisualEffect } from "./Features/utils_calendar";
import Index from "../MyCourses/Information";
import { off } from "process";
import { Co2Sharp } from "@mui/icons-material";
import { get } from "http";
import { StudentOperation, TeacherOperation, token } from "@/ambLib/amb";
import { UserAccountProps } from "./Features/interfaceProps";


// Build a component that will display the event based on the interface EventProps and fill the background color 
// based on the startHour and endHour of the event

const EventBlock = (props: { event: EventProps }) => {

    let eventGridArea = DateUtils.convertFromHourToIndex(props.event.endTime) - DateUtils.convertFromHourToIndex(props.event.startTime);
    let eventBlockClassesStyles = `${props.event.color}`;
    let eventBlockStyle = {
        height: `${(eventGridArea + 1) * 8}px`
    };

    // let eventBlockStyle = { gridRow: `span ${eventGridArea} / span ${eventGridArea}` };

    // console.log("eventGridArea: ", eventGridArea);

    return (
        <div className={`${eventBlockClassesStyles} z-10 box-border h-[140px] text-[13px] rounded-md shadow-md 
        hover:shadow-lg  p-1 `}
            style={eventBlockStyle}>
            <div className="text-wrap lg:text-sm text-xs leading-tight">{props.event.title}</div>
            <div className="text-wrap lg:text-sm text-xs leading-tight"> {DateUtils.removeAM_PM(props.event.startTime) + ' - ' + DateUtils.removeAM_PM(props.event.endTime)} </div>
        </div>
    );
}

const borderMinuteBlockStyles =
{
    topEdge: "border-t border-r border-b-slate-500 bg-white box-border w-full h-2",
    middle: "border-r border-b-slate-500 bg-white box-border w-full h-2",
    bottomEdge: "border-b border-r border-b-slate-500 bg-white box-border w-full h-2"
}

const HourBlock = (props: { indexHour: number }) => {
    // component logic here
    let edgeOrMiddle: string;
    if (props.indexHour % 12 === 0) {
        edgeOrMiddle = "topEdge";
    }
    // else if (props.indexHour % 12 === 11)
    // {
    //     edgeOrMiddle = "bottomEdge";
    //     this code is not necessary
    // }
    else {
        edgeOrMiddle = "middle";
    }

    return (
        <div className={borderMinuteBlockStyles[edgeOrMiddle]}>
        </div>
    );
};

const HoursInDay = (props: { day: number, eventsInDay: Array<EventProps> }) => {
    // component logic here

    // create an array to store 216 blocks for each 5 minutes in a day
    // props.eventsInDay store the list of events in the current iterated day

    let getEventsInDay: Array<EventProps> = props.eventsInDay;
    let currentEvent = 0;

    // console.log("debug HoursInDay: ", getEventsInDay);

    // console.log(typeof getEventsInDay);

    // console.log(typeof getEventsInDay[0]);


    let numOfEvents: number = getEventsInDay.length;
    // console.log("numOfEvents in the current day", props.day, " ", numOfEvents);
    let hourBlocks = [];


    let count: number = 0;

    let countEventRender = 0;
    let countHourRender = 0;
    for (let index = 0; index < 216; index++) {
        if (numOfEvents > 0 && index == DateUtils.convertFromHourToIndex(getEventsInDay[currentEvent].startTime)) {
            hourBlocks.push(EventBlock({ event: getEventsInDay[currentEvent] }));
            index = index + (DateUtils.convertFromHourToIndex(getEventsInDay[currentEvent].endTime) - DateUtils.convertFromHourToIndex(getEventsInDay[currentEvent].startTime));
            numOfEvents--;
            currentEvent++;
            countEventRender++;
        }
        else {
            hourBlocks.push(HourBlock({ indexHour: index }));
            countHourRender++;
        }
    }

    return (
        <div className="grid grid-rows-216 h-[432px]" key={props.day}>
            {
                hourBlocks
            }
        </div>
    );
}

const adAuth = async (props: { name: string, pass: string }) => {
    const { name, pass } = props;
    if (!name || !pass)
        return null;
    console.log(name, pass)
    const cai_gi_cung_duoc = new StudentOperation()
    await cai_gi_cung_duoc.login(name, pass)
        .then(data => { console.log("Data: ", data) })
    // .catch(error => console.log(error))
}

const fetchStudentData = async (props: { token: string }) => {
    const { token } = props;
    if (!token)
        return null;
    console.log(token)
    const student = new StudentOperation();
    await student.findStudentRegisteredClass({ token: token })
        .then(data => {
            console.log("Data: ", data);
        })
        .catch(error => console.log(error));
}

export default function CalendarGrid(props: { offset: number, showWeek: number, role: string }) {
    const [listEvent, setListEvent] = useState<SubjectProps[]>([]);
    const [weekEventsData, setWeekEventsData] = useState<Array<Array<EventProps>>>(new Array(7));
    const [loadingState, setLoadingState] = useState<boolean>(true);
    const [userToken, setUserToken] = useState<token>({ token: "" });

    if (props.role == "student") {
        let student = new StudentOperation();

        useEffect(() => {
            student.login("long.nguyen24243004", "Student@24243004")
                .then(data => {
                    console.log("Data: ", data);
                    const newToken = { token: data.token };
                    if (newToken) {
                        setUserToken(newToken);
                        console.log("newToken: ", newToken.token);
                    }
                });


        }, []);

        useEffect(() => {
            if (userToken) {
                student.findStudentRegisteredClass({ token: userToken.token })
                    .then(data => {
                        console.log("data: ", data);
                        const getData: SubjectProps[] = data.data;
                        if (getData) {
                            let newData: SubjectProps[] = fillMissingData(getData);
                            // console.log(getData);
                            setListEvent(newData);
                            let getWeekEventsData: Array<Array<EventProps>> = generateWeekCalendar(newData, props.showWeek);
                            if (getWeekEventsData) {
                                setWeekEventsData(getWeekEventsData);
                            }
                        }
                    });
            }

            if (weekEventsData)
                setLoadingState(false);
        }, [userToken]);
    }
    else if (props.role == "teacher") {
        let teacher = new TeacherOperation();

        useEffect(() => {
            teacher.login("huy.bui53587", "huy.bui53587")
                .then(data => {
                    console.log("Data: ", data);
                    const newToken = { token: data.token };
                    if (newToken) {
                        setUserToken(newToken);
                        console.log("newToken: ", newToken.token);
                    }
                });


        }, []);

        useEffect(() => {
            if (userToken) {
                teacher.findTeacherRegisteredClass({ token: userToken.token })
                    .then(data => {
                        const getData: SubjectProps[] = data.data;
                        if (getData) {
                            let newData: SubjectProps[] = fillMissingData(getData);
                            console.log("newData: ", newData);
                            setListEvent(newData);
                            let getWeekEventsData: Array<Array<EventProps>> = generateWeekCalendar(newData, props.showWeek);
                            if (getWeekEventsData) {
                                setWeekEventsData(getWeekEventsData);
                            }
                        }
                    });
            }

            if (weekEventsData)
                setLoadingState(false);
        }, [userToken]);
    }


    // Runs when the listEvent is updated
    useEffect(() => {
        if (listEvent) {
            setWeekEventsData(generateWeekCalendar(listEvent, props.showWeek));
        }
    }, [props.showWeek]);

    // offset is the variance from the current week
    // showWeek is the week number to display

    // eventsData is the previous testing data
    // weekEventsData is the data get from the API
    // console.log("length of weekEventsData: ", weekEventsData.length)

    // console.log("variable: " , variable);
    // console.log("render weekEventsData: ", weekEventsData);

    let hoursInDay = [];
    if (!loadingState) {
        for (let index = 0; index < 7; index++) {
            // index 
            hoursInDay.push(HoursInDay({ day: index, eventsInDay: weekEventsData[/*props.offset * 7 + */index] }));
        }
        return (
            <div className="grid grid-cols-7 grid-rows-1">
                {
                    // render the hoursInDay array
                    hoursInDay
                }
            </div>
        );
    }
    else {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

}