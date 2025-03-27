import React, { ChangeEvent } from 'react'
import { IoMdClose } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchBarProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, handleSearch }) => {
  return (
    <div className='w-100  flex items-center px-4 bg-white-100 border border-gray-300 rounded-lg h-8 '>
      <input type="text" className='w-full text-xs  bg-transparent py-[11px] h-[25px] outline-none' value={value} onChange={onChange} />
      <div className="flex items-center gap-4">
        <FaMagnifyingGlass className="text-slate-400 cursor-pointer hover:text-black w-7 " onClick={handleSearch} />
      </div>

    </div>
  )
}

export default SearchBar