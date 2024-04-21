import React from 'react';

interface DataTableControlsProps {
  onSearch: (query: string) => void;
  onFilter: (filterKey: string, value: string) => void;
}

const DataTableControls: React.FC<DataTableControlsProps> = ({ onSearch, onFilter }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onSearch(query);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filterKey = e.target.name;
    const value = e.target.value;
    onFilter(filterKey, value);
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearchChange}
        className="px-3 py-2 border rounded-md"
      />
      <select name="status" onChange={handleFilterChange} className="px-3 py-2 border rounded-md">
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      {/* Add more filter options as needed */}
    </div>
  );
};

export default DataTableControls;
