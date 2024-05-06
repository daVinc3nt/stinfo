// generate two event for today and tomorrow, and store it in an array based on the interface EventProps
import { EventProps, SubjectProps } from '@/components/Calendar/Features/interfaceProps';
import { WeekUtils, DateUtils, HourUtils, VisualEffect } from './Features/utils_calendar';
// sample dataset


let eventsData: EventProps[][] =
[
	/* -- FIRST WEEK */
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
	[],
	[],
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
	[],
	[],

	/* -- SECOND WEEK -- */
	[
		{
			title: 'Lab OS',
			startTime: "07:00AM",
			endTime: "08:50AM",
			startWeek: 2,
			endWeek: 2,
			id: 1,
			color: "bg-blue-200"
		},
	],
	[],
	[],
	[
		{
			title: 'Xác chết thống kê',
			startTime: "12:00PM",
			endTime: "02:50PM",
			startWeek: 2,
			endWeek: 2,
			id: 1,
			color: "bg-green-200"
		},
	],
	[
		{
			title: 'Kinh tế chính trị Mác Lênin',
			startTime: "7:00AM",
			endTime: "08:50AM",
			startWeek: 2,
			endWeek: 2,
			id: 1,
			color: "bg-yellow-300"
		}
	],
	[],
	[],
];

let subjectData: SubjectProps[] = [];


// parse JSON string into JSON object

function fillMissingData(subjectData) : SubjectProps[]
{
	// fill the weeks array with the week number
	// this function runs before the generateWeekCalendar function
	let fillListOfSubjects: SubjectProps[] = [];
	for (let i = 0; i < subjectData.length; i++)
	{
		let subject: SubjectProps = {
			course_id: subjectData[i].course_id,
			course_name: subjectData[i].course_name,
			credits: subjectData[i].credits,
			day: subjectData[i].day,
			period: subjectData[i].period,
			room: subjectData[i].room,
			semester: subjectData[i].semester,
			weeks: subjectData[i].weeks,
			color: VisualEffect.chooseColor(i),
		};
		fillListOfSubjects.push(subject);
	}

	return fillListOfSubjects;
}

function generateWeekCalendar(subjectData: SubjectProps[], currentWeek: number): Array<Array<EventProps>>
{
	// let weekData: EventProps[][] = [];
	let weekData = new Array(7);

	if (!subjectData)
	{
		return weekData;
	}

	for (let i = 0; i < 7; i++)
	{
		weekData[i] = new Array();
	}
	if (subjectData == null)
	{
		console.log("It is null!!!");
		return null;
	}
	console.log("Lịch dạy trong tuần");

	for (let i = 0; i < subjectData.length; i++)
	{
		// Kiểm tra xem môn nào có tiết trong tuần hiện tại
		if (subjectData[i].weeks)
		{
			console.log(subjectData[i].weeks);
		}
		if (subjectData[i].weeks && subjectData[i].weeks.includes(currentWeek) && subjectData[i].semester == "HK232")
		{
			// console.log("There is a subject in this week: ", subjectData[i].course_name);
			const index: number = DateUtils.convertDayToNumber(subjectData[i].day.toString());
			if (index != -1)
			{
				let startTimeSubject = "", endTimeSubject =  "";;
				[startTimeSubject, endTimeSubject] = HourUtils.convetPeriodToHourBlock(subjectData[i].period);

				weekData[index].push({
					title: subjectData[i].course_name,
					startTime: startTimeSubject,
					endTime: endTimeSubject,
					startWeek: subjectData[i].weeks[0],
					endWeek: subjectData[i].weeks[subjectData[i].weeks.length - 1],
					color: subjectData[i].color,
					weeks: subjectData[i].weeks,
				});
			}
		}
	}

	// console.log("weekData: ", weekData);

	return weekData;
}

function isEmptyData(data: Array<Array<EventProps>>): boolean
{
	return data.every((day) => day.length == 0);
}


export { eventsData, subjectData, fillMissingData, generateWeekCalendar };