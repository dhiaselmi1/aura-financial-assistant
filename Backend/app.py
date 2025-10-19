from flask import Flask, jsonify, request
from flask_cors import CORS
import asyncio
import json
import os
import sys

# Add the web_intelligence_agent directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'web_intelligence_agent'))

# Import agent functions
from web_intelligence_agent.main import (
    load_user_profile,
    determine_targets,
    crawl_websites_async,
    extract_text_and_metadata,
    configure_gemini,
    analyze_with_gemini
)
from web_intelligence_agent.scoring_agent import (
    score_item,
    filter_results
)

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Configure Gemini API on startup
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
if GEMINI_API_KEY:
    configure_gemini(GEMINI_API_KEY)

# Cache for storing analysis results
analysis_cache = {
    'results': None,
    'timestamp': None
}

@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint
    """
    return jsonify({
        'status': 'healthy',
        'message': 'AURA Financial Assistant API is running',
        'gemini_configured': GEMINI_API_KEY is not None
    }), 200

@app.route('/api/user/profile', methods=['GET'])
def get_user_profile():
    """
    Get user profile
    """
    try:
        profile_path = os.path.join(
            os.path.dirname(__file__),
            'web_intelligence_agent',
            'user_profile.json'
        )
        user_profile = load_user_profile(profile_path)
        return jsonify({
            'success': True,
            'data': user_profile
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/user/profile', methods=['POST'])
def update_user_profile():
    """
    Update user profile
    """
    try:
        profile_data = request.json
        profile_path = os.path.join(
            os.path.dirname(__file__),
            'web_intelligence_agent',
            'user_profile.json'
        )
        
        with open(profile_path, 'w') as f:
            json.dump(profile_data, f, indent=4)
        
        return jsonify({
            'success': True,
            'message': 'Profile updated successfully'
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/intelligence/analyze', methods=['POST'])
def run_web_intelligence():
    """
    Run the web intelligence agent to analyze websites
    """
    try:
        if not GEMINI_API_KEY:
            return jsonify({
                'success': False,
                'error': 'GEMINI_API_KEY not configured'
            }), 500
        
        # Get user profile from request or use default
        user_profile_data = request.json.get('user_profile') if request.json else None
        
        if user_profile_data:
            user_profile = user_profile_data
        else:
            profile_path = os.path.join(
                os.path.dirname(__file__),
                'web_intelligence_agent',
                'user_profile.json'
            )
            user_profile = load_user_profile(profile_path)
        
        # Determine target URLs
        target_urls, keywords = determine_targets(user_profile)
        
        # Crawl websites
        scraped_data = async_to_sync(crawl_websites_async)(target_urls)
        
        all_analysis_results = []
        
        # Process each crawled website
        for result in scraped_data:
            if result.success:
                # Extract text and metadata
                extracted_data = extract_text_and_metadata(result.markdown.raw_markdown)
                
                # Analyze content with Gemini
                analysis_result = async_to_sync(analyze_with_gemini)(extracted_data['text'], user_profile)
                
                # Add URL to the analysis result
                analysis_result['url'] = result.url
                analysis_result['title'] = extracted_data['title']
                
                all_analysis_results.append(analysis_result)
            else:
                all_analysis_results.append({
                    'url': result.url,
                    'error': result.error_message,
                    'news': [],
                    'opportunities': [],
                    'threats': []
                })
        
        # Save to cache
        analysis_cache['results'] = all_analysis_results
        analysis_cache['timestamp'] = asyncio.get_event_loop().time()
        
        # Save results to file
        results_path = os.path.join(
            os.path.dirname(__file__),
            'web_intelligence_agent',
            'analysis_results.json'
        )
        with open(results_path, 'w') as f:
            json.dump(all_analysis_results, f, indent=4)
        
        return jsonify({
            'success': True,
            'data': all_analysis_results,
            'target_urls': target_urls,
            'keywords': keywords
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/intelligence/results', methods=['GET'])
def get_intelligence_results():
    """
    Get the latest web intelligence analysis results
    """
    try:
        results_path = os.path.join(
            os.path.dirname(__file__),
            'web_intelligence_agent',
            'analysis_results.json'
        )
        
        if os.path.exists(results_path):
            with open(results_path, 'r') as f:
                results = json.load(f)
            
            return jsonify({
                'success': True,
                'data': results
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'No analysis results found. Run /api/intelligence/analyze first.'
            }), 404
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/scoring/filter', methods=['POST'])
def run_scoring_agent():
    """
    Run the scoring agent to filter and score results
    """
    try:
        # Get user profile
        user_profile_data = request.json.get('user_profile') if request.json else None
        
        if user_profile_data:
            user_profile = user_profile_data
        else:
            profile_path = os.path.join(
                os.path.dirname(__file__),
                'web_intelligence_agent',
                'user_profile.json'
            )
            user_profile = load_user_profile(profile_path)
        
        # Get threshold from request or use default
        threshold = request.json.get('threshold', 1) if request.json else 1
        
        # Load analysis results
        results_path = os.path.join(
            os.path.dirname(__file__),
            'web_intelligence_agent',
            'analysis_results.json'
        )
        
        if not os.path.exists(results_path):
            return jsonify({
                'success': False,
                'error': 'No analysis results found. Run /api/intelligence/analyze first.'
            }), 404
        
        with open(results_path, 'r') as f:
            analysis_results = json.load(f)
        
        # Filter and score results
        filtered_results = filter_results(analysis_results, user_profile, threshold)
        
        # Save filtered results
        final_results_path = os.path.join(
            os.path.dirname(__file__),
            'web_intelligence_agent',
            'final_results.json'
        )
        with open(final_results_path, 'w') as f:
            json.dump(filtered_results, f, indent=4)
        
        return jsonify({
            'success': True,
            'data': filtered_results,
            'threshold': threshold
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/scoring/results', methods=['GET'])
def get_scoring_results():
    """
    Get the latest scoring results
    """
    try:
        final_results_path = os.path.join(
            os.path.dirname(__file__),
            'web_intelligence_agent',
            'final_results.json'
        )
        
        if os.path.exists(final_results_path):
            with open(final_results_path, 'r') as f:
                results = json.load(f)
            
            return jsonify({
                'success': True,
                'data': results
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'No scoring results found. Run /api/scoring/filter first.'
            }), 404
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/intelligence/full-analysis', methods=['POST'])
def run_full_analysis():
    """
    Run both web intelligence and scoring agents in sequence (SIMULATION MODE)
    """
    try:
        import time
        
        # Get user profile
        user_profile_data = request.json.get('user_profile') if request.json else None
        threshold = request.json.get('threshold', 1) if request.json else 1
        
        if user_profile_data:
            user_profile = user_profile_data
        else:
            profile_path = os.path.join(
                os.path.dirname(__file__),
                'web_intelligence_agent',
                'user_profile.json'
            )
            user_profile = load_user_profile(profile_path)
        
        # SIMULATION MODE: Wait 20 seconds to simulate analysis
        print(" SIMULATION MODE: Analyzing web sources...")
        time.sleep(20)
        print(" SIMULATION MODE: Analysis complete! Loading results...")
        
        # Get target URLs for metadata
        target_urls, keywords = determine_targets(user_profile)
        
        # Load existing analysis results
        analysis_results_path = os.path.join(
            os.path.dirname(__file__),
            'web_intelligence_agent',
            'analysis_results.json'
        )
        
        # Check if results exist
        if os.path.exists(analysis_results_path):
            with open(analysis_results_path, 'r') as f:
                all_analysis_results = json.load(f)
        else:
            all_analysis_results = []
        
        # Step 2: Run scoring agent
        filtered_results = filter_results(all_analysis_results, user_profile, threshold)
        
        # Save results
        results_path = os.path.join(
            os.path.dirname(__file__),
            'web_intelligence_agent',
            'analysis_results.json'
        )
        with open(results_path, 'w') as f:
            json.dump(all_analysis_results, f, indent=4)
        
        final_results_path = os.path.join(
            os.path.dirname(__file__),
            'web_intelligence_agent',
            'final_results.json'
        )
        with open(final_results_path, 'w') as f:
            json.dump(filtered_results, f, indent=4)
        
        return jsonify({
            'success': True,
            'data': {
                'raw_analysis': all_analysis_results,
                'filtered_results': filtered_results
            },
            'metadata': {
                'target_urls': target_urls,
                'keywords': keywords,
                'threshold': threshold
            }
        }), 200
        
    except Exception as e:
        import traceback
        error_traceback = traceback.format_exc()
        print(f"ERROR in full_analysis: {error_traceback}")
        return jsonify({
            'success': False,
            'error': str(e),
            'traceback': error_traceback
        }), 500

@app.route('/api/news/personalized', methods=['GET'])
def get_personalized_news():
    """
    Get personalized news from the latest analysis
    """
    try:
        final_results_path = os.path.join(
            os.path.dirname(__file__),
            'web_intelligence_agent',
            'final_results.json'
        )
        
        if os.path.exists(final_results_path):
            with open(final_results_path, 'r') as f:
                results = json.load(f)
            
            # Aggregate all news items
            all_news = []
            for result in results:
                for news_item in result.get('news', []):
                    news_item['source_url'] = result.get('url', '')
                    all_news.append(news_item)
            
            # Sort by score (if available)
            all_news.sort(key=lambda x: x.get('score', 0), reverse=True)
            
            return jsonify({
                'success': True,
                'data': all_news,
                'count': len(all_news)
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'No results found. Run analysis first.'
            }), 404
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/opportunities/personalized', methods=['GET'])
def get_personalized_opportunities():
    """
    Get personalized opportunities from the latest analysis
    """
    try:
        final_results_path = os.path.join(
            os.path.dirname(__file__),
            'web_intelligence_agent',
            'final_results.json'
        )
        
        if os.path.exists(final_results_path):
            with open(final_results_path, 'r') as f:
                results = json.load(f)
            
            # Aggregate all opportunities
            all_opportunities = []
            for result in results:
                for opp in result.get('opportunities', []):
                    opp['source_url'] = result.get('url', '')
                    all_opportunities.append(opp)
            
            # Sort by score
            all_opportunities.sort(key=lambda x: x.get('score', 0), reverse=True)
            
            return jsonify({
                'success': True,
                'data': all_opportunities,
                'count': len(all_opportunities)
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'No results found. Run analysis first.'
            }), 404
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/threats/personalized', methods=['GET'])
def get_personalized_threats():
    """
    Get personalized threats from the latest analysis
    """
    try:
        final_results_path = os.path.join(
            os.path.dirname(__file__),
            'web_intelligence_agent',
            'final_results.json'
        )
        
        if os.path.exists(final_results_path):
            with open(final_results_path, 'r') as f:
                results = json.load(f)
            
            # Aggregate all threats
            all_threats = []
            for result in results:
                for threat in result.get('threats', []):
                    threat['source_url'] = result.get('url', '')
                    all_threats.append(threat)
            
            # Sort by score
            all_threats.sort(key=lambda x: x.get('score', 0), reverse=True)
            
            return jsonify({
                'success': True,
                'data': all_threats,
                'count': len(all_threats)
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'No results found. Run analysis first.'
            }), 404
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
