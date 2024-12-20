from ml.data_preprocessing import load_and_preprocess_data
from ml.feature_extraction import calculate_similarity, extract_features
from ml.recommendation import get_all_close_match, recommend_movies

from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import requests
from flask import request
import numpy as np
import logging
from functools import lru_cache
from flask_caching import Cache
import openai

app = Flask(__name__)
CORS(app)

cache = Cache(app, config={'CACHE_TYPE': 'simple'})

MOVIE_DATA = "data/movies.csv"
OMDB_API_KEY = '${process.env.OMDB_API_KEY}'
OMDB_API_URL = '${process.env.OMDB_API_URL}'
KINO_API_KEY = '${process.env.KINO_API_KEY}'
KINO_API_URL = '${process.env.KINO_API_URL}'

openai.api_key = '${process.env.key}'

@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.json
    user_question = data.get("question")
    
    if not user_question:
        return jsonify({"error": "Question is required"}), 400
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5",
            messages=[
                {"role": "system", "content": "You are a helpful assistant specialized in answering movie-related questions."},
                {"role": "user", "content": user_question}
            ],
            max_tokens=150,
            temperature=0.7
        )
        answer = response.choices[0].message['content'].strip()
        return jsonify({"answer": answer})
    except openai.error.RateLimitError:
        return jsonify({"error": "You have exceeded your API quota. Please check your plan and billing details."}), 429
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def fetch_movie_poster(title):
    try:
        response = requests.get(OMDB_API_URL, params={"t": title, "apikey": OMDB_API_KEY})
        data = response.json()
        if response.status_code != 200:
            return "https://via.placeholder.com/300"  # Fallback image
        
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


def fetch_movie_trailer(tmdb_id):
    """
    Fetch the trailer from KinoCheck API using the TMDB ID.
    """
    url = f"{KINO_API_URL}?tmdb_id={tmdb_id}&categories=Trailer&language=en"
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Api-Key': KINO_API_KEY,
        'X-Api-Host': 'api.kinocheck.com'
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        print(f"KinoCheck API response: {data}")  # Debugging log
        if data.get("trailer"):
            return data["trailer"]["url"]
        else:
            return None
    else:
        print(f"KinoCheck API error: {response.status_code} - {response.text}")  # Debugging log
    return None


@app.route("/helpmedicede", methods=["GET"])
def helpmedicede():
    movie_title = request.args.get("title", "").strip()
    if not movie_title:
        return jsonify({"error": "Please provide a movie title"}), 400

    movies_data = load_and_preprocess_data(MOVIE_DATA)
    feature_vectors = extract_features(movies_data)
    similarity_matrix = calculate_similarity(feature_vectors)

    recommendations = recommend_movies(movie_title, movies_data, similarity_matrix)
    rec_titles = get_all_close_match(movie_title, movies_data['title'].tolist())
    
    if not recommendations:
        return jsonify({"error": "Movie not found or no recommendations available"}), 404

    # Format response with title and poster URL
    response = []
    response.append({"title": (rec_titles)})
    for movie_title in recommendations:
        # Check if the movie exists in movies_data
        movie_row = movies_data[movies_data["title"] == movie_title]
        
        if not movie_row.empty:
            poster_url = fetch_movie_poster(movie_title)
            # Ensure you are retrieving the first row of data for that movie
            release_date = movie_row["release_date"].values[0]
            vote_average = float(movie_row["vote_average"].values[0])
            vote_count = int(movie_row["vote_count"].values[0])
            
            response.append({
                "title": movie_title,
                "poster": poster_url,
                "release_date": release_date,
                "vote_average": vote_average,
                "vote_count": vote_count
            })
        else:
            # Handle the case where movie title is not found in the data
            response.append({
                "title": movie_title,
                "poster": "https://via.placeholder.com/300",  # Fallback image
                "release_date": "N/A",
                "vote_average": "N/A",
                "vote_count": "N/A"
            })
            
    return jsonify(response)


@app.route("/top20movies", methods=["GET"])
@cache.cached(timeout=300)
def get_top20movie():
    df = pd.read_csv(MOVIE_DATA)
    top20 = df.sort_values(by="vote_average", ascending=False).head(20)
    top20["poster"] = top20["title"].apply(fetch_movie_poster)

    # Replace NaN and problematic values with None
    top20 = top20.replace({np.nan: None})

    return jsonify(top20.to_dict(orient="records"))

# logging.basicConfig(level=logging.DEBUG)

@lru_cache(maxsize=1000)
def fetch_movie_poster(title):
    api_key = 'c78b646c'
    url = f"http://www.omdbapi.com/?t={title}&apikey={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data.get('Poster', 'https://example.com/default_poster.jpg')
    return 'https://example.com/default_poster.jpg'

@app.route("/movies", methods=["GET"])
@cache.cached(timeout=60, query_string=True)
def get_movies():

    page = int(request.args.get("page", 1))  # Default to page 1
    limit = int(request.args.get("limit", 15))  # Default to 15 movies per page

    df = pd.read_csv(MOVIE_DATA, nrows=1000)    
    total_movies = len(df)
    total_pages = (total_movies + limit - 1) // limit  # Calculate total pages

    movies = df[["title", "genres", "release_date", "vote_average", "vote_count"]]
    
    start = (page - 1) * limit
    end = start + limit
    paginated_movies = movies.iloc[start:end]

    # Fetch posters only for the movies in the current page
    paginated_movies["poster"] = paginated_movies["title"].apply(fetch_movie_poster)
    
    return jsonify({
        "movies": paginated_movies.to_dict(orient="records"),
        "total_pages": total_pages
    })
    




@app.route("/movie/<string:title>", methods=["GET"])
def get_movie_info(title):
    # Load the CSV file into a DataFrame
    df = pd.read_csv(MOVIE_DATA)

    # Filter for the requested movie title
    movie = df[df["title"].str.lower() == title.lower()]

    # Check if movie exists
    if movie.empty:
        return jsonify({"error": "Movie not found"}), 404

    # Fetch the poster and trailer for the movie
    movie["poster"] = movie["title"].apply(fetch_movie_poster)
    tmdb_id = movie.iloc[0]["id"]  # Assuming the TMDB ID is in the "id" column
    trailer = fetch_movie_trailer(tmdb_id)

    # Convert the movie data to a dictionary and add the trailer
    movie_info = movie.iloc[0].to_dict()
    movie_info["poster"] = movie["poster"].iloc[0]
    movie_info["trailer"] = trailer or "Trailer not available"

    # Replace NaN values with None
    movie_info = {k: (None if pd.isna(v) else v) for k, v in movie_info.items()}

    # Return the movie data as JSON
    return jsonify(movie_info)


if __name__ == "__main__":
    app.run(debug=True)
