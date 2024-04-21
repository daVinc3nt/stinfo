import React, { useState, useEffect } from 'react';
import { Person } from './classData';
import ClassCard from './ClassCard';

const StudentList: React.FC<{ persons: Person[] }> = ({ persons }) => {
    const [sortedPersons, setSortedPersons] = useState<Person[]>(persons);
    const [sortType, setSortType] = useState<'name' | 'ID'>('name'); // Default sort by name

    useEffect(() => {
        // Sort the persons based on the current sortType
        const sorted = [...persons].sort((a, b) => {
            if (sortType === 'name') {
                return a.Name.localeCompare(b.Name);
            } else if (sortType === 'ID') {
                return a.ID.localeCompare(b.ID);
            }
            return 0; // Default case
        });
        setSortedPersons(sorted);
    }, [persons, sortType]);

    const handleSort = (type: 'name' | 'ID') => {
        setSortType(type);
    };

    return (
        <div>
            <div className="flex items-center justify-center space-x-4 mb-4">
                <span>Sort by:</span>
                <select value={sortType} onChange={(e) => handleSort(e.target.value as 'name' | 'ID')}>
                    <option value="name">Name</option>
                    <option value="ID">ID</option>
                </select>
            </div>
            <div>
                {sortedPersons.map(person => (
                    <ClassCard key={person.ID} person={person} />
                ))}
            </div>
        </div>
    );
};

export default StudentList;
