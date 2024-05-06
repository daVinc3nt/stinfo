'use client';
import React, { useEffect, useState } from "react";
import * as calendarProps from '@/components/Calendar/Features/interfaceProps';
import * as utils from '@/components/Calendar/Features/utils_calendar';
import CalendarGrid from "@/components/Calendar/CalendarGrid";
import HourGrid from "@/components/Calendar/HourGrid";
import WeekDayGrid from "@/components/Calendar/WeekDayGrid";
import WeekNumber from "@/components/Calendar/WeekNumber";
import { WeekUtils, DateUtils } from "@/components/Calendar/Features/utils_calendar";
import gradient from "@material-tailwind/react/theme/components/timeline/timelineIconColors/gradient";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

const WeekCalendar = () => {

	// Variance from the current week, diffWeekNum is used to navigate the calendar

	// diffWeekNum default value is 0 to display the current week
	const [diffWeekNum, setDiffWeekNum] = useState<number>(0);
	// showWeek is the week number to display
	const [showWeek, setShowWeek] = useState<number>(WeekUtils.getWeekNumber(new Date()));



	function changeCalendarWeek(navDirection: number) {
		setDiffWeekNum(diffWeekNum + navDirection);
		const week: Date[] = DateUtils.getWeekNavigation(diffWeekNum + navDirection);

		// these codes can cause bugs.
		setShowWeek(WeekUtils.getWeekNumber(week[0]));
	}
	const router = useRouter()
	console.log("showWeek: ", showWeek);

	const role = Cookies.get("role");

	return (
		<>
			<button onClick={() => { router.push("/dashboard/courseLec") }} className="ring-2 ring-blue-800 rounded-xl p-1 m-2"><KeyboardReturnIcon /> Quay về</button>
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
					role={role}
				></CalendarGrid>
			</div>
		</>
	);
};


export default WeekCalendar;