import React from 'react'
import Deadline from './InfoComponent/Deadline'
import HomeworkDescription from './InfoComponent/Description'

// This component is used to display the basic information of the homework, without 
// knowing the type of homework is submission or quiz
function Info() {
    return (
        <div>
            <Deadline />
            <HomeworkDescription />
        </div>
    )
}

export default Info