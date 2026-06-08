
interface Movie {
  id: number
  title: string
}

interface MovieListProps {
  movies: Movie[]
}

const MovieList = ({ movies }: MovieListProps) => {
  // console.log('movies:', movies);
  return (
    <>
      <ul className="flex flex-col divide-y divide-gray-400 border border-gray-400 mr-8 mt-)"> 
          {movies.map((movie, i) => (
            <MovieListEntry key={movie.id} movie={movie} />
          ))}
      </ul>
    </>
  )
}

const MovieListEntry = ({ movie }: { movie: Movie }) => {
  return (
    <li
      className="p-4 pl-8"
    >{movie.title}
    </li> 
  )
}

export default MovieList;

