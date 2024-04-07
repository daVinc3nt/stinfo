import React from 'react'
import { useState } from 'react';
import {MouseEvent} from 'react';

const NavBar = (props: {changeCalendar: (navDirection: number) => void}) => {
    return (
        <div className='flex sticky top-0 z-20'>
            <NavBarButton navDirection={-1} changeCalendar={props.changeCalendar} />
            <NavBarButton navDirection={1} changeCalendar={props.changeCalendar} />
        </div>
    )
};


const NavBarButton = (props: {navDirection: number, changeCalendar: (navDirection: number) => void}) => {
    let text = '';
    if (props.navDirection == 1) {
        text = '>';
    }
    else {
        text = '<';
    }
    return (
        <button className={"relative w-16 h-8 rounded-md border-2 bg-blue-200 hover:bg-blue-500 flex items-center justify-center"}
                onClick={
                    () => 
                        {
                            props.changeCalendar(props.navDirection)
                            
                        }
                        }>
            <div className=""> {text} </div>
        </button>
    )   
}

export default NavBar;