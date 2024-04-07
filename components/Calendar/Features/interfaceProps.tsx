import { color } from "@material-tailwind/react/types/components/alert";

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

export interface CalendarGridProps {
}