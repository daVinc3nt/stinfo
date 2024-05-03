// getWeekNavigation function is used to get the date of or different weeks from the current week.

const weekDay: string[] = ['Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'CN'];

export class DateUtils {
	static getWeekNavigation(offset: number = 0): Date[] {
		const result: Date[] = [];
		const currentDate = new Date();
		const today = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturda
		const diff = today === 0 ? 6 : today - 1; // Adjust if today is Sunday
	
		currentDate.setDate(currentDate.getDate() - diff + (offset * 7)); // Adjust for offset
	
		// Generate dates for the week starting from Monday
		for (let i = 0; i < 7; i++) {
			result.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() + 1);
		}
	
		return result;
	}

	static convertNumberToMonth(month: number): string {
		switch (month) {
			case 0:
				return 'January';
			case 1:
				return 'February';
			case 2:
				return 'March';
			case 3:
				return 'April';
			case 4:
				return 'May';
			case 5:
				return 'June';
			case 6:
				return 'July';
			case 7:
				return 'August';
			case 8:
				return 'September';
			case 9:
				return 'October';
			case 10:
				return 'November';
			case 11:
				return 'December';
			default:
				return 'Invalid month';
		}
	}

	static getMonth(offset: number = 0): string {
		const week = DateUtils.getWeekNavigation(offset);
		const firstDay = week[0];
		const lastDay = week[6];
		const month1: string = DateUtils.convertNumberToMonth(firstDay.getMonth());
		const month2: string = DateUtils.convertNumberToMonth(lastDay.getMonth());

		if (month1 === month2) {
			return month1;
		}
		else {
			const month = month1 + ' - ' + month2;
			return month;
		}
	}

	static getCurrentDate = (): string =>
		Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', })
			.format(new Date());

	static getTimeFromString(timeString: string): { hour: number; minute: number; ampm: string } {
		let text = timeString.split(':');
		let hourStr: string = text[0];
		let hour = Number(hourStr);
		let ampm = text[1];
		if (ampm[ampm.length - 2] == 'A') {
			ampm = "AM";
		}
		else {
			ampm = "PM";
			if (hour != 12) {
				hour += 12;
			}
		}
		let minute = Number(text[1].slice(0, -2));

		return { hour, minute, ampm };
	}

	static convertFromHourToIndex(time: string): number {
		// the hour must in range from 6:00AM to 12:00PM
		// block 0 -> 6:00AM and block 216 -> 12:00PM
		let { hour, minute, ampm } = DateUtils.getTimeFromString(time);
		return (hour - 6) * 12 + minute / 5;
	}

	static getYear(): number {
		return new Date().getFullYear();
	}

	static removeAM_PM(time: string): string {
		return time.slice(0, -2);
	}

	static isTodayDate(date: Date): boolean {
		const currentDate = new Date();
		const check: boolean = date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
		// if (check == true)
		// {
		// 	console.log(check);
		// 	console.log(date.getDate());
		// 	console.log(currentDate.getDate());
		// }
		// console.log(date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear());
		return check;
	}

	static isTodayDay(day: string): boolean {
		let currentDay: number = new Date().getDay() - 1;
		if (currentDay === -1) {
			currentDay = 6;
		}
		let dayIndex: number = weekDay.indexOf(day);
		return dayIndex === currentDay;
	}

	static convertDayToNumber(day: string): number {
		// Remove any leading or trailing whitespace
		day = day.trim();
	
		// Extract the numeric part of the string
		const numericPart = day.match(/\d+/);
	
		if (numericPart) {
			// Convert the numeric part to a number and subtract 2 to get the index (0 for "Thứ 2", 1 for "Thứ 3", and so on)
			const numericValue = parseInt(numericPart[0]);
			return numericValue - 2;
		} else {
			// If no numeric part found, return -1 indicating an error
			return -1;
		}
	}

}

export class WeekUtils {
	static getWeekNumber(d: Date): number {
		d = new Date(+d);
		d.setHours(0, 0, 0, 0);
		d.setDate(d.getDate() + 4 - (d.getDay() || 7));
		const yearStart = new Date(d.getFullYear(), 0, 1);
		const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
		return weekNo;
	}

	static weeksInYear(year: number): number {
		const d = new Date(year, 11, 31);
		const week = WeekUtils.getWeekNumber(d)[1];
		return week === 1 ? 52 : week;
	}

	// static generateCurrentWeekEvent(): EventProps[][] {
	// }
}

export class HourUtils {
	static convetPeriodToHourBlock(period: number[]): string[] {
		let startTime = "", endTime = "";

		if (period[0] >= 1 && period[0] <= 6 )
		{
			const hoursToAdd = period[0] + 5; // Since the startTime starts from 1
			startTime = `${hoursToAdd < 10 ? '0' : ''}${hoursToAdd}:00AM`;
		}
		else if (period[0] == 7)
		{
			startTime = '12:00PM';
		}
		else if (period[0] >= 8 && period[0] <= 14)
		{
			const hoursToAdd = period[0] - 7;
			startTime = `${hoursToAdd < 10 ? '0' : ''}${hoursToAdd}:00PM`;
		}

		if (period[1] >= 2 && period[1] <= 6)
		{
			const hoursToAdd = period[1] + 4; // Since the endTime starts from 2
			endTime = `${hoursToAdd < 10 ? '0' : ''}${hoursToAdd}:50AM`
		}
		else if (period[1] == 7)
		{
			endTime = '00:50PM';
		}
		else if (period[1] >= 8 && period[1] <= 14)
		{
			const hoursToAdd = period[1] - 7;
			endTime = `${hoursToAdd < 10 ? '0' : ''}${hoursToAdd}:50PM`;
		}

		return [startTime, endTime];
	}
}

export class VisualEffect {
	static hoverColor(color: string): string {
		// get the last 3 characters of the color
		let colorCode = color.slice(-3);
		// convert the color code to a number
		let colorCodeNumber = parseInt(colorCode);
		// increase the color code number by 100
		colorCodeNumber += 100;
		// convert the color code number back to a string
		let newColorCode = colorCodeNumber.toString();
		// return the new color
		let newColor = color.slice(0, -3) + newColorCode;
		console.log("newColor: ", newColor)
		return newColor;
	}
}