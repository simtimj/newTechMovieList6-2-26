'use client'

import mockMovies from "@/mockData"
import AddMovies from "@/components/AddMovies";
import MovieList from "@/components/MovieList";
import Search from "@/components/Search";
import { useState } from "react";
import WatchTabs from "@/components/WatchTabs";

export default function Home() {

  interface Movie {
    id: number
    title: string
  }

  
  let [allMovies, setAllMovies] = useState<Movie[]>(mockMovies);
  let [searchText, setSearchText] = useState<string>("");
  let [addText, setAddText] = useState<string>("");

  // all filters
  let filterMovies = (): Movie[] => {
    // searchFilter
    
    let newMovies = [...allMovies];

    newMovies = newMovies.filter((movie) => {
      return (movie.title.toLowerCase()).includes(searchText.toLowerCase());
    })
    return newMovies;   
  }

  let addMovies = (addMoviesTitle: string) => {
    let newMovies = [...allMovies];
    let newMovie : Movie = {
      id: newMovies.length,
      title: addMoviesTitle
    }
    newMovies.push(newMovie);
    setAllMovies(newMovies);
  }


  return (
  <div
      className="ml-8"
  >
    <h1 className="mt-8 text-2xl">MovieList</h1>
    <AddMovies 
        addMovies={addMovies}
    />

    <div
      className="flex flex-row items-center mt-4"
    >
        <WatchTabs />
        <Search 
          setSearchText={setSearchText}
        />
        
    </div>
    
    
    <MovieList 
      movies={filterMovies().length ? filterMovies() : [{title: `No Movies matching ${searchText}`, id: 0} ]}
    />
  </div>
)
}
