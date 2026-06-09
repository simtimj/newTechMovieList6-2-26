
export interface MovieType {
  id: number
  title: string
  watched: boolean
}


export interface MovieListProps {
  movies: MovieType[]
}
