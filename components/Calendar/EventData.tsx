// generate two event for today and tomorrow, and store it in an array based on the interface EventProps
import { EventProps } from '@/components/Calendar/Features/interfaceProps';

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

// sample dataset

const eventsData: EventProps[][] = 
[
	
/* -- FIRST WEEK -- */
	// Monday
	[
		{
			title: 'Lab OS',
			startTime: "07:00AM",
			endTime: "08:50AM",
			startWeek: 1,
			endWeek: 1,
			id: 1,
			color: "bg-blue-200"
		},
		{
			title: 'Đi chơi',
			startTime: "12:00PM",
			endTime: "02:50PM",
			startWeek: 1,
			endWeek: 1,
			id: 1,
			color: "bg-green-200"
		},

	],
	// Tuesday
	[

	],
	// Wednesday
	[

	],
	// Thursday
	[
		{
			title: 'Hệ điều hành',
			startTime: "07:00AM",
			endTime: "08:50AM",
			startWeek: 1,
			endWeek: 1,
			id: 1,
			color: "bg-red-200"
		},
		{
			title: 'Xác chết thống kê',
			startTime: "12:00PM",
			endTime: "02:50PM",
			startWeek: 1,
			endWeek: 1,
			id: 1,
			color: "bg-green-200"
		},
	],
	// Friday
	[
		{
			title: 'Kinh tế chính trị Mác Lênin',
			startTime: "7:00AM",
			endTime: "08:50AM",
			startWeek: 1,
			endWeek: 1,
			id: 1,
			color: "bg-yellow-300"
		}
	],
	// Saturday
	[

	],
	// Sunday
	[

	],

/* -- SECOND WEEK -- */

	// Monday
	[
		{
			title: 'Đi chơi',
			startTime: "12:00PM",
			endTime: "02:50PM",
			startWeek: 1,
			endWeek: 1,
			id: 1,
			color: "bg-green-200"
		},
		{
			title: 'Lab ',
			startTime: "07:00AM",
			endTime: "08:50AM",
			startWeek: 1,
			endWeek: 1,
			id: 1,
			color: "bg-blue-200"
		},
	],
	// Tuesday
	[
		{
			title: 'Lại làm gì đó',
			startTime: "07:00AM",
			endTime: "08:50AM",
			startWeek: 1,
			endWeek: 1,
			id: 1,
			color: "bg-blue-200"
		},
	],
	// Wednesday
	[

	],
	// Thursday
	[
		{
			title: 'Làm gì đó',
			startTime: "07:00AM",
			endTime: "08:50AM",
			startWeek: 1,
			endWeek: 1,
			id: 1,
			color: "bg-red-200"
		},
		{
			title: 'Chết vì deadline',
			startTime: "12:00PM",
			endTime: "02:50PM",
			startWeek: 1,
			endWeek: 1,
			id: 1,
			color: "bg-yellow-200"
		},
	],
	// Friday
	[
	],
	// Saturday
	[

	],
	// Sunday
	[

	],

/* -- THIRD WEEK -- */

	// Monday
	[
		{
			title: 'Lab ',
			startTime: "07:00AM",
			endTime: "08:50AM",
			startWeek: 1,
			endWeek: 1,
			id: 1,
			color: "bg-blue-200"
		},
	],
	// Tuesday
	[
		{
			title: 'Lại làm gì đó',
			startTime: "07:00AM",
			endTime: "08:50AM",
			startWeek: 1,
			endWeek: 1,
			id: 1,
			color: "bg-blue-200"
		},
	],
	// Wednesday
	[
		{
			title: 'Chết vì deadline',
			startTime: "2:00PM",
			endTime: "4:50PM",
			startWeek: 1,
			endWeek: 1,
			id: 1,
			color: "bg-red-200"
		},
	],
	// Thursday
	[
		{
			title: 'Chết vì deadline',
			startTime: "12:00PM",
			endTime: "02:50PM",
			startWeek: 1,
			endWeek: 1,
			id: 1,
			color: "bg-orange-200"
		},
	],
	// Friday
	[
	],
	// Saturday
	[

	],
	// Sunday
	[

	],

];


export default eventsData;