import React from 'react'
import { HomeworkMultipleChoiceData } from '@/components/Homework/Data';
import { MultipleChoiceQuestion } from '@/components/Homework/Utilities/interfaceProps';

const QuestionCard = (props: { question: MultipleChoiceQuestion }) => {
    return (
        <div className='border border-gray-500 rounded-lg p-3'>
            <div className='text-lg font-bold'>{props.question.question}</div>
            <div className='grid grid-cols-2 gap-2'>
                {
                    props.question.answers.map((choice, index) => {
                        return (
                            <div key={index} className='border border-gray-300 rounded-lg p-2'>
                                <div>{choice}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const MultipleChoiceContent = () => {

    let listOfQuestions = []

    HomeworkMultipleChoiceData.listOfQuestions.forEach((question) => {
        listOfQuestions.push(<QuestionCard question={question} />)
    })

    return (
        <div className='flex'>
            <div className=''>
                Question
            </div>
            <div className='grid'>
                {
                    listOfQuestions
                }
            </div>
        </div>
    );
}


export default MultipleChoiceContent;