import json
import asyncio
import os
import google.generativeai as genai
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
from bs4 import BeautifulSoup

def load_user_profile(profile_path):
    """
    Loads the user profile from a JSON file.
    """
    with open(profile_path, 'r') as f:
        return json.load(f)

def determine_targets(user_profile):
    """
    Determines the target URLs and keywords based on the user profile.
    """
    interests = user_profile.get('interests', [])
    financial_data = user_profile.get('financial_data', {})
    
    target_urls = [
        'https://www.bct.gov.tn',
        'http://www.cmf.tn',
        'https://www.ilboursa.com',
        'https://www.leconomistemaghrebin.com'
    ]
    
    keywords = {
        'financial_news': ['inflation', 'interest rate', 'gdp', 'unemployment', 'economic growth', 'bourse de tunis', 'tunindex'],
        'opportunities': ['investment opportunity', 'market alert', 'ipo', 'startup funding', 'fintech innovation'],
        'anomalies': ['risk', 'security event', 'volatility', 'market manipulation', 'fraud', 'cybersecurity threat'],
        'regulations': ['bct', 'cmf', 'regulatory update', 'financial regulation', 'compliance']
    }
    
    if 'real estate' in interests and 'houses in Gabes' in financial_data.get('owns', []):
        # target_urls.append('https://www.tunisie-annonce.com/annonces/immobilier/vente/maison-villa/gabes')
        keywords['opportunities'].append('real estate investment')
        
    if 'AI' in interests:
        target_urls.append('https://www.forbes.com/ai')
        keywords['opportunities'].append('AI investment')

    return target_urls, keywords

async def crawl_websites_async(urls):
    """
    Asynchronously crawls a list of websites using crawl4ai.
    """
    results = []
    crawler_cfg = CrawlerRunConfig(page_timeout=30000)
    async with AsyncWebCrawler() as crawler:
        for url in urls:
            result = await crawler.arun(url=url, config=crawler_cfg)
            results.append(result)
    return results

def extract_text_and_metadata(html_content):
    """
    Extracts clean text and metadata from HTML content.
    """
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Extract title
    title = soup.title.string if soup.title else ''
    
    # Extract all text
    text = soup.get_text(separator=' ', strip=True)
    
    # Extract metadata (e.g., meta description)
    meta_description = ''
    meta_tag = soup.find('meta', attrs={'name': 'description'})
    if meta_tag:
        meta_description = meta_tag.get('content', '')
        
    return {
        'title': title,
        'text': text,
        'meta_description': meta_description
    }

def configure_gemini(api_key):
    """
    Configures the Gemini API with the provided API key.
    """
    genai.configure(api_key=api_key)

def extract_json_from_markdown(markdown_text):
    """
    Extracts a JSON object from a markdown code block.
    """
    try:
        return json.loads(markdown_text.split('```json')[1].split('```')[0])
    except (IndexError, json.JSONDecodeError):
        return None

async def analyze_with_gemini(text, user_profile):
    """
    Analyzes the scraped text using the Gemini API.
    """
    model = genai.GenerativeModel('gemini-pro-latest')
    
    prompt = f"""
    Analyze the following text based on the user's profile and identify relevant news, opportunities, and threats.

    User Profile:
    {json.dumps(user_profile, indent=4)}

    Text to Analyze:
    {text}

    Provide the analysis in a valid JSON format, with the following structure:
    ```json
    {{
        "news": [],
        "opportunities": [],
        "threats": []
    }}
    ```
    """
    
    try:
        response = await model.generate_content_async(prompt)
        json_response = extract_json_from_markdown(response.text)
        if json_response:
            return json_response
        else:
            return json.loads(response.text)
    except json.JSONDecodeError:
        print("Error decoding JSON from Gemini API response:")
        print(response.text)
        return {"news": [], "opportunities": [], "threats": []}

async def main():
    """
    Main function to orchestrate the Web Intelligence Agent.
    """
    # Get Gemini API key from environment variable
    gemini_api_key = os.environ.get("GEMINI_API_KEY")
    if not gemini_api_key:
        print("Please set the GEMINI_API_KEY environment variable.")
        return

    # Configure Gemini API
    configure_gemini(gemini_api_key)

    # Get the absolute path to the user_profile.json file
    script_dir = os.path.dirname(os.path.abspath(__file__))
    profile_path = os.path.join(script_dir, 'user_profile.json')

    # Load user profile
    user_profile = load_user_profile(profile_path)
    
    # Determine target URLs and keywords
    target_urls, _ = determine_targets(user_profile)
    
    print("Starting Web Intelligence Agent...")
    print(f"Target URLs: {target_urls}")
    
    # Crawl websites
    scraped_data = await crawl_websites_async(target_urls)
    
    all_analysis_results = []
    
    # Process each crawled website
    for result in scraped_data:
        if result.success:
            print(f"Processing content from {result.url}...")
            
            # Extract text and metadata
            extracted_data = extract_text_and_metadata(result.markdown.raw_markdown)
            
            # Analyze content with Gemini
            analysis_result = await analyze_with_gemini(extracted_data['text'], user_profile)
            
            # Add URL to the analysis result
            analysis_result['url'] = result.url
            
            all_analysis_results.append(analysis_result)
        else:
            print(f"Failed to crawl {result.url}: {result.error_message}")
        
    # Output the results in JSON format
    output_json = json.dumps(all_analysis_results, indent=4)
    
    print("\nAnalysis complete. Results:\n")
    print(output_json)
    
    # Save the results to a file
    analysis_results_path = os.path.join(script_dir, 'analysis_results.json')
    with open(analysis_results_path, 'w') as f:
        f.write(output_json)
        
    print(f"\nResults saved to {analysis_results_path}")

if __name__ == "__main__":
    asyncio.run(main())
