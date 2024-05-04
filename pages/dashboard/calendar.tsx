'use client';
import React, { useEffect, useState } from "react";
import * as calendarProps from '@/components/Calendar/Features/interfaceProps';
import * as utils from '@/components/Calendar/Features/utils_calendar';
import CalendarGrid from "@/components/Calendar/CalendarGrid";
import HourGrid from "@/components/Calendar/HourGrid";
import WeekDayGrid from "@/components/Calendar/WeekDayGrid";
import WeekNumber from "@/components/Calendar/WeekNumber";
import { WeekUtils } from "@/components/Calendar/Features/utils_calendar";
import gradient from "@material-tailwind/react/theme/components/timeline/timelineIconColors/gradient";

const WeekCalendar = () => {

	// Variance from the current week, diffWeekNum is used to navigate the calendar

	// diffWeekNum default value is 0 to display the current week
	const [diffWeekNum, setDiffWeekNum] = useState<number>(0);
	// showWeek is the week number to display
	const [showWeek, setShowWeek] = useState<number>(WeekUtils.getWeekNumber(new Date()));


	function changeCalendarWeek(navDirection: number) {
		setDiffWeekNum(diffWeekNum + navDirection);
		setShowWeek(showWeek + navDirection);
	}

	console.log("diffWeekNum: ", diffWeekNum);

	return (
		<div className={`w-full h-auto grid grid-cols-[60px_auto] grid-rows-[140px_auto]
		[@media(max-width:600px)]:grid-cols-[40px_auto]
		[@media(max-width:600px)]:grid-rows-[140px_auto]
		`}>
			{/* <NavigationBar changeCalendar={changeCalendar}></NavigationBar> */}
			<WeekNumber weekNum={showWeek}></WeekNumber>
			<WeekDayGrid offset={diffWeekNum} changeCalendar={changeCalendarWeek}  ></WeekDayGrid>
			<HourGrid></HourGrid>
			<CalendarGrid 
				offset={diffWeekNum} 
				showWeek={showWeek}
				role={"student"}
			></CalendarGrid>
		</div>
	);
};


export default WeekCalendar;