from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def extract_features(data):
    vectorizer = TfidfVectorizer()
    feature_vectors = vectorizer.fit_transform(data['combined_features'])
    return feature_vectors

def calculate_similarity(feature_vectors):
    return cosine_similarity(feature_vectors)
