'use client';
import React, {useEffect, useState} from "react";
import { render } from "react-dom";
import {bool} from "prop-types";
import eventsData from "./EventData";
import { EventProps } from "./Features/interfaceProps";
import { Key } from "lucide-react";
import { DateUtils } from "./Features/utils_calendar";


// Build a component that will display the event based on the interface EventProps and fill the background color 
// based on the startHour and endHour of the event

const EventBlock = (props: { event: EventProps }) => {

    let eventGridArea = DateUtils.convertFromHourToIndex(props.event.endTime) - DateUtils.convertFromHourToIndex(props.event.startTime);
    let eventBlockClassesStyles = `bg-blue-200 z-10 box-border border-2 border-black h-[140px] ${props.event.color} text-[13px] p-[0.5]`;
    let eventBlockStyle = {
        height: `${(eventGridArea + 1) * 8}px`
    };

    // let eventBlockStyle = { gridRow: `span ${eventGridArea} / span ${eventGridArea}` };

    // console.log("eventGridArea: ", eventGridArea);

    return (
        <div className={eventBlockClassesStyles} style={eventBlockStyle}>
            <div className="text-wrap text-xs w-[5vw]">{props.event.title}</div>
            <div className="text-wrap text-xs w-[5vw]"> { DateUtils.removeAM_PM(props.event.startTime) + ' - ' + DateUtils.removeAM_PM(props.event.endTime)} </div>
        </div>
    );
}

const borderMinuteBlockStyles =
    {
        topEdge: "border-t border-r   border-b-slate-500 bg-white box-border w-full h-2",
        middle: "border-r   border-b-slate-500 bg-white box-border w-full h-2",
        bottomEdge: "border-b border-r   border-b-slate-500 bg-white box-border w-full h-2"
    }

const HourBlock = (props: { indexHour: number}) => {
    // component logic here
    let edgeOrMiddle: string;
    if (props.indexHour % 12 === 0)
    {
        edgeOrMiddle = "topEdge";
    }
    // else if (props.indexHour % 12 === 11)
    // {
    //     edgeOrMiddle = "bottomEdge";
    //     this code is not necessary
    // }
    else
    {
        edgeOrMiddle = "middle";
    }

    return (
        <div className={borderMinuteBlockStyles[edgeOrMiddle]}>
        </div>
    );
};

const HoursInDay = (props: { day: number , eventsInDay: EventProps[]}) => {
    // component logic here

    // create an array to store 216 blocks for each 5 minutes in a day
    // props.eventsInDay store the list of events in the current iterated day

    let getEventsInDay: EventProps[] = props.eventsInDay;
    let currentEvent = 0;
    let numOfEvents: number = getEventsInDay.length;
    let hourBlocks = [];
    

    let count: number = 0;
    // if (props.day == 0)
    //     console.log("numOfEvents in the current day", props.day, " ", numOfEvents);

    let countEventRender = 0;
    let countHourRender = 0;
    for (let index = 0; index < 216; index++) 
    {
        if (numOfEvents > 0 && index == DateUtils.convertFromHourToIndex(getEventsInDay[currentEvent].startTime))
        {
            // console.log(convertFromHourToIndex(getEventsInDay[0].endTime) - convertFromHourToIndex(getEventsInDay[0].startTime));
            hourBlocks.push(EventBlock({event: getEventsInDay[currentEvent]}));
            // props.eventsInDay.shift();
            index = index + (DateUtils.convertFromHourToIndex(getEventsInDay[currentEvent].endTime) - DateUtils.convertFromHourToIndex(getEventsInDay[currentEvent].startTime));
            numOfEvents--;
            currentEvent++;
            countEventRender++;
        }
        else
        {
            hourBlocks.push(HourBlock({indexHour: index}));
            countHourRender++;
        }
    }
    if (props.day == 0)
    {
        //console.log("countEventRender in the current day", props.day, " ", countEventRender);
        //console.log("countHourRender in the current day", props.day, " ", countHourRender);
    }
    // console.log(count);

    return (
        <div className="grid grid-rows-216 h-[432px]" key={props.day}>
            {
                hourBlocks
            }
        </div>
    );
}

export default function CalendarGrid( props: { offset: number }) {

    

    let hoursInDay = [];
    // Render 7 days in the week
    for (let index = 0; index < 7; index++) {
        // index 
        hoursInDay.push(HoursInDay({ day: index, eventsInDay: eventsData[props.offset * 7 + index] }));
        // console.log("eventsDataIndex: ", eventsData[index])
    }
    console.log(eventsData);

    return (
        <div className="grid grid-cols-7 grid-rows-1">
            {
                // render the hoursInDay array
                hoursInDay
            }
        </div>
    );
}