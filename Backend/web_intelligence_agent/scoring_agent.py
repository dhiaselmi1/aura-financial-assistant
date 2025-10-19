
import json
import os

def load_analysis_results(file_path):
    """
    Loads the analysis results from a JSON file.
    """
    with open(file_path, 'r') as f:
        return json.load(f)

def score_item(item, user_profile):
    """
    Scores an item based on the user's profile.
    """
    score = 0
    interests = user_profile.get('interests', [])
    
    # Simple keyword-based scoring
    for interest in interests:
        if interest.lower() in item.get('title', '').lower() or interest.lower() in item.get('summary', '').lower():
            score += 1
            
    return score

def filter_results(analysis_results, user_profile, threshold=1):
    """
    Filters the analysis results based on a score threshold.
    """
    filtered_results = []
    for result in analysis_results:
        filtered_result = {
            'url': result['url'],
            'news': [],
            'opportunities': [],
            'threats': []
        }
        
        for category in ['news', 'opportunities', 'threats']:
            for item in result.get(category, []):
                score = score_item(item, user_profile)
                if score >= threshold:
                    item['score'] = score
                    filtered_result[category].append(item)
                    
        filtered_results.append(filtered_result)
        
    return filtered_results

def main():
    """
    Main function to orchestrate the Scoring Agent.
    """
    # Get the absolute path to the files
    script_dir = os.path.dirname(os.path.abspath(__file__))
    profile_path = os.path.join(script_dir, 'user_profile.json')
    analysis_results_path = os.path.join(script_dir, 'analysis_results.json')
    final_results_path = os.path.join(script_dir, 'final_results.json')

    # Load user profile
    with open(profile_path, 'r') as f:
        user_profile = json.load(f)

    # Load analysis results
    analysis_results = load_analysis_results(analysis_results_path)
    
    # Filter the results
    filtered_results = filter_results(analysis_results, user_profile)
    
    # Output the results in JSON format
    output_json = json.dumps(filtered_results, indent=4)
    
    print("\nScoring complete. Final Results:\n")
    print(output_json)
    
    # Save the results to a file
    with open(final_results_path, 'w') as f:
        f.write(output_json)
        
    print("\nFinal results saved to final_results.json")

if __name__ == "__main__":
    main()
