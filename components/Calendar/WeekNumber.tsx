import React from 'react'

const WeekNumber = ( props: { weekNum: number}) => {
  return (
    <div className='sticky top-0 z-20 shadow-md bg-purple-100'>
        <div className='text-center text-1xl font-bold my-2'>
            Tuần
        </div>
        <div className='text-center text-2xl font-bold'>
            {props.weekNum}
        </div>
    </div>
  )
}

export default WeekNumber;