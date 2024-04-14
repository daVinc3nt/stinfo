import React from 'react';
import { HomeworkGeneralData } from '../Data'

function Deadline() {
	return (
		<div className=" bg-blue-100 border-b-2 shadow-lg p-2 rounded-xl">
			<div>
				Bắt đầu: { HomeworkGeneralData.openedDate.toLocaleString() }
			</div>
			<div>
				Kết thúc: { HomeworkGeneralData.closedDate.toLocaleString() }
			</div>
		</div>
	)
}

export default Deadline;