from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests, json

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def test():
  return "Hello from the server"


@app.get("/movies")
def getMovies():

  try:
    url = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
  
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjQ3ZGI5NWQwYmYzOTM0NWFkMWE1MGFlNjM4MGVlMCIsIm5iZiI6MTU2MDU2Njk0NS4wNjQsInN1YiI6IjVkMDQ1Y2ExMGUwYTI2MGIwYWNkOGViZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VUJFsPnVEobP-KM-Aw7zQtVwb_cvyWryFPQSaYhBW8Q"
    }
    
    res = requests.get(url, headers=headers)
    res = json.loads(res.text)["results"]

    cleansedMovies = []
    
    for i in range(len(res)):
      movie = res[i]

      newMovie = {
        'id': i,
        'title': movie['title'],
        'watched': False,
        'detailedView': False,
        'year': movie['release_date'].split("-")[0],
        'runtime': movie['popularity'],
        'metascore': movie['vote_average'],
        'imdbRating': movie['vote_count']
      }
      cleansedMovies.append(newMovie)
    
    return cleansedMovies

  except Exception as e:
    print(e)
    return e







# url = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"

# headers = {
#     "accept": "application/json",
#     "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjQ3ZGI5NWQwYmYzOTM0NWFkMWE1MGFlNjM4MGVlMCIsIm5iZiI6MTU2MDU2Njk0NS4wNjQsInN1YiI6IjVkMDQ1Y2ExMGUwYTI2MGIwYWNkOGViZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VUJFsPnVEobP-KM-Aw7zQtVwb_cvyWryFPQSaYhBW8Q"
# }

# response = requests.get(url, headers=headers)

# print(response.text)