// getWeekNavigation function is used to get the date of or different weeks from the current week.

export class DateUtils {
	static getWeekNavigation(offset: number = 0): Date[] {
		// Offset of 0 is the current week
		const currentDate = new Date();
		// first day in type number
		const diffFromFirstDay: number = currentDate.getDay();
		const newWeek: Date[] = [];

		for (let i = 0; i <= 6; i++) {
			newWeek.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + i - diffFromFirstDay + offset * 7));
		}

		// move Sunday to the end of the week, and Monday to the beginning
		newWeek.shift();
		newWeek.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7 - diffFromFirstDay + offset * 7));
		return newWeek;
	};

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
}

export class WeekDataUtils {
	

	static getWeekNumber(d: Date): [number, number] {
		d = new Date(+d);
		d.setHours(0, 0, 0, 0);
		d.setDate(d.getDate() + 4 - (d.getDay() || 7));
		const yearStart = new Date(d.getFullYear(), 0, 1);
		const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
		return [d.getFullYear(), weekNo];
	}

	static weeksInYear(year: number): number {
		const d = new Date(year, 11, 31);
		const week = WeekDataUtils.getWeekNumber(d)[1];
		return week === 1 ? 52 : week;
	}
}

