from fuzzywuzzy import fuzz

def find_similar_match(search_query, candidates, amount_of_return_candidate=4):
    """
    Finds a match from a list of candidates with a similarity score
    greater than or equal to the specified threshold.
    
    Args:
        search_query (str): The string to search for.
        candidates (list): A list of strings to search within.
        threshold (int): The minimum similarity score (0-100) required for a match.
        
    Returns:
        tuple: A tuple containing the best match and its score, or (None, 0) if no match is found.
    """

    query_lower = search_query.lower()
    similar_candidates_with_scores = []

    for candidate in candidates:
        candidate_lower = candidate.lower()

        score = fuzz.ratio(query_lower, candidate_lower)
        similar_candidates_with_scores.append((score, candidate))

    similar_candidates_with_scores.sort(key=lambda x: x[0], reverse=True)
    sorted_candidates = [candidate for _, candidate in similar_candidates_with_scores]

    return sorted_candidates[:amount_of_return_candidate]


if __name__ == "__main__":
    print(find_similar_match('Git', ['C++', 'C#', 'pygame', 'docker', 'python', 'git', 'Linux', 'react', 'django']))

