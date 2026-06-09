import { MovieType } from "@/app/types"

export interface MovieListProps {
  movies: MovieType[]
  changeWatchState: (id: number) => void
  changeView: (id: number) => void
}

const MovieList = ({ movies, changeWatchState, changeView }: MovieListProps) => {

  return (
    <>
      <ul className="flex flex-col divide-y divide-gray-400 border border-gray-400 mr-8"> 
          {movies.map((movie, i) => (
            <MovieListEntry 
              key={movie.id} 
              id={movie.id} 
              title={movie.title} 
              watched={movie.watched} 
              detailedView={movie.detailedView}
              changeWatchState={changeWatchState}
              changeView={changeView}
              year={movie.year}
              runtime={movie.runtime}
              metascore={movie.metascore}
              imdbRating={movie.imdbRating}
            />
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
  detailedView: boolean
  year: number
  runtime: number
  metascore: number
  imdbRating: number
  changeWatchState: (i: number) => void
  changeView: (i: number) => void
}

const MovieListEntry = (
  { title, 
    id, 
    watched, 
    detailedView, 
    year, 
    runtime, 
    metascore, 
    imdbRating, 
    changeWatchState, changeView }: MovieListEntryProps) => {

  let watchStateText = () => {
    return watched ? "Watched" : "To Watch"
  }

  if (detailedView) {
    return (
      <div className="">
        <p
          className="ml-8 pb-1"
          onClick={() => { changeView(id) }}
          >{title}
        </p>
        <ul
          className="text-xs ml-8 pb-4"
          >
          <li>Year: {year}</li>
          <li>Runtime: {runtime}</li>
          <li>Metascore: {metascore}</li>
          <li>imdbRating: {imdbRating}</li>
          <div 
            className="flex flex-row"
          >
            <li
              className="mr-1"
              >Watched:
            </li>
            <input
              type="radio"
              checked={watched}
              onChange={() => changeWatchState(id)}
            >
            </input>
          </div>
          
        </ul>
      </div>
    )
  } else {
    return (
    <li
      className="p-4 pl-8 flex justify-between"
        onClick={() => {changeView(id)}}
    >{title}
      <button
        className="border text-gray-400 px-2"
        onClick={(e) => changeWatchState(id)}
      > {watchStateText()}
      </button>
    </li>
    )
  }

  
}

export default MovieList;

