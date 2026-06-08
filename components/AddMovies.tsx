import { useState } from "react"

interface AddMoviesProps {
  addMovies: (text: string) => void
}

export default function AddMovies({ addMovies } : AddMoviesProps ) {

  let [tempAddText, setTempAddText] = useState<string>("")

  return (
    <div>
      <form
        onSubmit={(e) => {
          addMovies(tempAddText);
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Add movie title here"
          onChange={(e) => setTempAddText(e.target.value)}
          className="border border-r-0 rounded-l-sm  border-gray-400 placeholder-gray-400 px-2 mt-2"
          >
        </input>
        <button
          className="border rounded-r-sm border-gray-400 placeholder-gray-400 px-2"
          >Add
        </button>
      </form>
    </div>
  )
}



