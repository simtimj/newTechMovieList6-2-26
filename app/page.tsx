'use client'

import mockMovies from "@/mockData"
import MovieList from "@/components/MovieList";
import Search from "@/components/Search";
import { useState } from "react";

export default function Home() {

  interface Movie {
    id: number
    title: string
  }

  
  let [allMovies, setAllMovies] = useState<Movie[]>(mockMovies);
  let [searchText, setSearchText] = useState<string>("");


  // all filters
  let filterMovies = () => {
    // searchFilter
    
    let newMovies = [...allMovies];

    newMovies = newMovies.filter((movie) => {
      return (movie.title.toLowerCase()).includes(searchText.toLowerCase());
    })
    return newMovies;   
  }


  return (
  <>
    <h1 className="ml-8 mt-8 text-2xl">MovieList</h1>
    <Search 
      setSearchText={setSearchText}
    />
    <MovieList 
      movies={filterMovies().length ? filterMovies() : [{title: `No Movies matching ${searchText}`, id: 0} ]}
    />
  </>
)
}
