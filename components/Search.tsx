
import {useState} from "react";

interface SearchProps {
  setSearchText: (text: string) => void
}

let Search = ({setSearchText}: SearchProps) => {
  // type into search input box
  // on click of input button, send to MovieList for filtering

  let [inputText, setInputText] = useState<string>("");


  return (
    <div>
      <form
        className="flex flex-row w-0.5 ml-2"
        onSubmit={(e) => { 
          setSearchText(inputText) 
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          className="border border-r-0 rounded-l-sm border-gray-400 placeholder-gray-400 px-2"
          onChange={(e) => {setInputText(e.target.value)}}
        />
        <button
          type="submit"
          className="px-1 border rounded-r-sm border-gray-400 text-gray-700"
        >
          Go!
        </button>

      </form>
    </div>
  )
}

export default Search;