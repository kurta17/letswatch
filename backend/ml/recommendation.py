import difflib

def get_close_match(movie_name, movie_titles):
    find_close_match = difflib.get_close_matches(movie_name, movie_titles)
    if find_close_match:
        return find_close_match[0]
    return None

def get_all_close_match(movie_name, movie_titles):
    find_close_match = difflib.get_close_matches(movie_name, movie_titles)
    if find_close_match:
        return find_close_match
    return None

def recommend_movies(movie_name, movies_data, similarity):
    list_of_all_titles = movies_data['title'].tolist()
    close_match = get_close_match(movie_name, list_of_all_titles)
    
    if not close_match:
        return []

    movie_index = movies_data[movies_data.title == close_match].index[0]
    similarity_scores = list(enumerate(similarity[movie_index]))
    sorted_similar_movies = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

    recommended_movies = []
    for i, movie in enumerate(sorted_similar_movies):
        index = movie[0]
        title = movies_data.iloc[index]['title']
        if i < 10:
            recommended_movies.append(title)
    return recommended_movies
