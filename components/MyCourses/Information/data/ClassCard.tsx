import React from 'react';
import { Person } from './classData';

interface ClassCardProps {
    person: Person;
}

const ClassCard: React.FC<ClassCardProps> = ({ person }) => {
    const { ID, Name, poisition } = person;

    return (
        <div className="flex justify-between gap-4 py-4 px-1 md:px-10 mb-4 rounded-sm border  ">
            <div className="text-start ">{ID}</div>
            <div className="">{Name}</div>
            <div className="">{poisition}</div>
        </div>
    );
};

export default ClassCard;
