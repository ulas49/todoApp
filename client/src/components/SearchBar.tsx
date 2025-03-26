import React,{ChangeEvent} from 'react'
import { IoMdClose } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchBarProps {
value:string;
onChange: (event: ChangeEvent<HTMLInputElement>) => void;
handleSearch: (search: string) => void;
}

const SearchBar:React.FC<SearchBarProps>= ({value,onChange,handleSearch}) => {
  return (
    <div className='w-100  flex items-center px-4 bg-slate-100 rounded-md'>
        <input type="text"  className='w-full text-xs bg-transparent py-[11px] h-[25px] outline-none' value={value} onChange={onChange}/>
        <FaMagnifyingGlass className='text-slate-400 cursor-pointer hover:text-black  ' onClick={()=>handleSearch}/>

    </div>
  )
}

export default SearchBar