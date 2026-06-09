
export interface MovieType {
  id: number
  title: string
  watched: boolean
  detailedView: boolean
  year: number
  runtime: number
  metascore: number
  imdbRating: number
}


export interface MovieListProps {
  movies: MovieType[]
}
