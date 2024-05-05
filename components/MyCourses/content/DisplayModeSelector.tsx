import React from 'react';

interface DisplayModeSelectorProps {
  onChangeMode: (mode: string) => void;
}

const DisplayModeSelector: React.FC<DisplayModeSelectorProps> = ({ onChangeMode }) => {
  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mode = e.target.value;
    onChangeMode(mode);
  };

  return (
    <div className="m-4 ">
      <label htmlFor="displayMode" className="mr-2 font-medium">
        Display Mode:
      </label>
      <select id="displayMode" onChange={handleModeChange} className="px-3 py-2 border rounded-md">
        <option value="card">Card</option>
        <option value="list">List</option>
      </select>
    </div>
  );
};

export default DisplayModeSelector;
