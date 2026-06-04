import mockMovies from "../mockData"
import MovieList from "../components/MovieList";

export default function Home() {
  console.log('mockMovies:', mockMovies);
  return (
  <>
    <MovieList movies={mockMovies}/>
  </>
)
}
