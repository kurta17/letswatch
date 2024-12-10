from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import requests

app = Flask(__name__)
CORS(app)

MOVIE_DATA = "data/movies.csv"
OMDB_API_KEY = "c78b646c"  # Your actual API key
OMDB_API_URL = "http://www.omdbapi.com/"


def fetch_movie_poster(title):
    try:
        response = requests.get(OMDB_API_URL, params={"t": title, "apikey": OMDB_API_KEY})
        data = response.json()
        
        # Check if the response is valid and contains a poster URL
        if response.status_code == 200:
            if data.get("Response") == "True":
                poster_url = data.get("Poster")
                if poster_url and poster_url != "N/A":
                    return poster_url
            else:
                print(f"OMDb API error: {data.get('Error')}")
    except Exception as e:
        print(f"Error fetching poster for {title}: {e}")
    
    return "https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_SX300.jpg"  # Fallback image



@app.route("/movies", methods=["GET"])
def get_movies():
    df = pd.read_csv(MOVIE_DATA)
    movies = df.head(30)[["title", "genres", "release_date", "vote_average", "vote_count"]]
    
    # Fetch poster for each movie
    movies["poster"] = movies["title"].apply(fetch_movie_poster)
    
    return jsonify(movies.to_dict(orient="records"))

@app.route("/movie/<string:title>", methods=["GET"])
def get_movie_info(title):
    # Load the CSV file into a DataFrame
    df = pd.read_csv(MOVIE_DATA)
    
    # Find the movie by title (case-sensitive matching)
    movie = df[df["title"].str.lower() == title.lower()]
    
    # Check if movie exists
    if movie.empty:
        return jsonify({"error": "Movie not found"}), 404
    
    movie["poster"] = movie["title"].apply(fetch_movie_poster)
    # Convert the movie data to a dictionary and return it as JSON
    return jsonify(movie.to_dict(orient="records")[0])  # Return the first match (in case of multiple)


    


if __name__ == "__main__":
    app.run(debug=True)