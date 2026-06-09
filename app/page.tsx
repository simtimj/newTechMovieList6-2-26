'use client'

import mockMovies from "@/mockData"
import AddMovies from "@/components/AddMovies";
import MovieList from "@/components/MovieList";
import Search from "@/components/Search";
import { useEffect, useState } from "react";
import WatchTabs from "@/components/WatchTabs";

import { MovieType } from "./types";
import { MovieListProps } from "../components/MovieList";
import { watch } from "fs";


export default function Home() {
  let [allMovies, setAllMovies] = useState(mockMovies);
  let [searchText, setSearchText] = useState<string>("");
  let [addText, setAddText] = useState<string>("");
  let [watchFilter , setWatchFilter] = useState<string>("");


      useEffect(() => {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjQ3ZGI5NWQwYmYzOTM0NWFkMWE1MGFlNjM4MGVlMCIsIm5iZiI6MTU2MDU2Njk0NS4wNjQsInN1YiI6IjVkMDQ1Y2ExMGUwYTI2MGIwYWNkOGViZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VUJFsPnVEobP-KM-Aw7zQtVwb_cvyWryFPQSaYhBW8Q'
          }
        };

        let cleansedMovies = [];

        fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
          .then(res => res.json())
          .then(res => {
            let newMovies = res.results;
            // console.log(456, newMovies)
            for (let i = 0; i < newMovies.length; i++) {
              let movie = res.results[i];

              let newMovie = {
                id: i,
                title: movie.title,
                watched: false,
                detailedView: false,
                year: movie.release_date.split("-")[0],
                runtime: movie.popularity,
                metascore: movie.vote_average,
                imdbRating: movie.vote_count
              }
              cleansedMovies.push(newMovie);
            }
            setAllMovies(cleansedMovies);
          })
          .catch(err => console.error(err));          
      }, [])

      






  // all filters
  let filterMovies = () => {
    console.log('...allMovies:', allMovies);

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
