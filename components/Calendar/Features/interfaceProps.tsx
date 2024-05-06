export interface EventProps {
	title: string;
	startTime: string;
	endTime: string;
	startWeek: number;
	endWeek: number;
	id: number;
	color: string;
}

export interface WeekDayProps {
	day: string;
	date: number;
	isToday: boolean;
	isFuture: boolean;
}

export interface TimeRowProps {
	rowIndex: number;
	events: Event[];
	currentWeek: number;
	currentTime: Date;
}

export interface SubjectProps {
	course_id: string
	course_name: string
	credits: number
	day: string
	period: number[]
	room: string
	semester: string
	weeks: number[]
	color: string
}

export interface UserAccountProps{
	username: string
	password: string
}