'use client'

import mockMovies from "@/mockData"
import AddMovies from "@/components/AddMovies";
import MovieList from "@/components/MovieList";
import Search from "@/components/Search";
import { useState } from "react";
import WatchTabs from "@/components/WatchTabs";

import { MovieType } from "./types";
import { MovieListProps } from "../components/MovieList";
import { watch } from "fs";

export default function Home() {


  
  let [allMovies, setAllMovies] = useState<MovieType[]>(mockMovies);
  let [searchText, setSearchText] = useState<string>("");
  let [addText, setAddText] = useState<string>("");
  let [watchFilter , setWatchFilter] = useState<string>("");

  // all filters
  let filterMovies = () => {
    let newMovies = [...allMovies];

    // search
    newMovies = newMovies.filter((movie) => {
      return (movie.title.toLowerCase()).includes(searchText.toLowerCase());
    })

    // watch filter
    if (watchFilter == "Watched") {
      newMovies = newMovies.filter((movie) => {
        return movie.watched == true;
      })
    } else if (watchFilter == "To Watch")
      newMovies = newMovies.filter((movie) => {
        return movie.watched == false;
      })
    
    return newMovies;   
  }

  let addMovies = (addMoviesTitle: string) => {
    if (addMoviesTitle.length == 0) {
      return "No movie title";
    }

    let newMovies = [...allMovies];
    let newMovie: MovieType = {
      id: newMovies.length,
      title: addMoviesTitle,
      watched: false,
      detailedView: false
    }
    newMovies.push(newMovie);
    setAllMovies(newMovies);
  }

  let changeWatchState = (id: number) => {
    let newMovies = [...allMovies];
    newMovies[id].watched = !(newMovies[id].watched)
    setAllMovies(newMovies);
  }

  let changeView = (id: number) => {
    let newMovies = [...allMovies];
    newMovies[id].detailedView = !(newMovies[id].detailedView)
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
        <WatchTabs
          setWatchFilter={setWatchFilter}
        />
        <Search 
          setSearchText={setSearchText}
        />
        
    </div>
    
    
    <MovieList 
      movies={
        filterMovies().length ? 
          filterMovies() : 
          [{title: `No Movies matching ${searchText}`, id: 0} ]
      }
      changeWatchState={changeWatchState}
      changeView={changeView}
    />
  </div>
)
}
