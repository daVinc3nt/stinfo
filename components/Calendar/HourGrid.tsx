'use client';

import React, { useEffect, useState } from "react";
import * as calendarProps from '@/components/Calendar/Features/interfaceProps';

// declare a string list to hold the hours of the day
const hours: string[] = [
    '6 AM', '7 AM', '8 AM', '9 AM',
    '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM',
    '8 PM', '9 PM', '10 PM', '11 PM'
];

const HourItem = (props: { hour: string }) => {

    return (
        <div className=" bg-white border border-black text-black box-border
        relative h-24">
            {
                <div className="text-[10px] items-center px-1 py-1">
                    {props.hour}
                </div>
            }
        </div>
    );
};

export default function HourGrid() {

    return (
            <div className="grid box-border">
                {
                    hours.map((hour, index) => {
                        return <HourItem hour={hours[index]} />
                    })
                }
            </div>

    )
}