import React, { useState } from "react";
import StudentList from "./data/StudentList";
import { Person, classData } from "./data/classData"; 

export default function MyClass() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPersons, setFilteredPersons] = useState<Person[]>(classData);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredPersons = classData.filter(person =>
      person.Name.toLowerCase().includes(term)
    );
    setFilteredPersons(filteredPersons);
  };

  return (
    <div className="w-[98%] min-h-screen mt-4 border border-gray-200 rounded-md mx-auto">
      <div className="bg-sky-200 p-6 flex justify-between items-center">
        <h1 className="uppercase font-bold text-2xl text-white">Danh sách sinh viên</h1>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-[40%] px-3 py-2 border rounded-md"
        />
      </div>
      <div className="p-3 md:p-6">
        <StudentList persons={filteredPersons} />
      </div>
    </div>
  );
}
