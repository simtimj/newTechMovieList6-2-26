import { MovieType } from "@/app/types"

export interface MovieListProps {
  movies: MovieType[]
  changeWatchState: (id: number) => void
}

const MovieList = ({ movies, changeWatchState }: MovieListProps) => {

  return (
    <>
      <ul className="flex flex-col divide-y divide-gray-400 border border-gray-400 mr-8"> 
          {movies.map((movie, i) => (
            <MovieListEntry key={movie.id} id={movie.id} title={movie.title} watched={movie.watched} changeWatchState={changeWatchState}/>
          ))}
      </ul>
    </>
  )
}

interface MovieListEntryProps {
  title: string
  id: number
  key: number
  watched: boolean
  changeWatchState: (i: number) => void
}

const MovieListEntry = ({ title, id, watched, changeWatchState }: MovieListEntryProps) => {

  // console.log('1234 changeWatchState:', changeWatchState);

  let watchStateText = () => {
    return watched ? "Watched" : "To Watch"
  }

  return (
    <li
      className="p-4 pl-8 flex justify-between "
      >{title}
      <button
        className="border text-gray-400 px-2"
        onClick={(e) => changeWatchState(id)}
        > {watchStateText()}
      </button>
    </li> 

  )
}

export default MovieList;

