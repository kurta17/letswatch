import pandas as pd

def load_and_preprocess_data(filepath):
    movies_data = pd.read_csv(filepath)
    selected_features = ['genres', 'keywords', 'tagline', 'cast', 'director']
    
    for feature in selected_features:
        movies_data[feature] = movies_data[feature].fillna('')
    
    movies_data['combined_features'] = movies_data['genres'] + ' ' + \
                                        movies_data['keywords'] + ' ' + \
                                        movies_data['tagline'] + ' ' + \
                                        movies_data['cast'] + ' ' + \
                                        movies_data['director']
    return movies_data
