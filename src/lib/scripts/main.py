import re
import scrapy
from scrapy.crawler import CrawlerProcess
from bewertung.spiders.amazon_ue_test import AmazonspiderSpider
from bewertung.spiders.trustpilot import TrustpilotSpider
from scrapy.utils.project import get_project_settings
import json
import os

def run_spider_am(link):
    settings = get_project_settings()
    process = CrawlerProcess(settings)

    process.crawl(AmazonspiderSpider, start_url=link) 
    process.start()

def run_spider_trust(link):
    settings = get_project_settings()
    process = CrawlerProcess(settings)

    process.crawl(TrustpilotSpider, start_url=link)
    process.start()

def read_file():
    print(os.getcwd())
    directory = ".\\src\\json\\files\\"

    # Iterate over each file in the directory
    for filename in os.listdir(directory):
        # Construct the full file path
        filepath = os.path.join(directory, filename)
        # Check if it's a file and not a directory (or use any other filter you need)
        if os.path.isfile(filepath):
            # Open and read the file
            with open(filepath, 'r') as f:
                data = json.load(f)
                if data:
                    print(data)
                    link = data.get("link", '')
                    url = link
                else:
                    print("No data in the JSON.")
                    return

                regex = r"https:\/\/([\w.-]+)"

                match = re.search(regex, url)

                if match:
                    result = match.group(1)
                    regex_am = r"amazon"
                    match = re.search(regex_am, result)
                    regex_trust = r"trustpilot" 
                    match2 = re.search(regex_trust, result)
                    if match:
                        result = match.group()
                        run_spider_am(url)
                    elif match2:
                        result = match2.group()
                        run_spider_trust(url)
                    else:
                        print("Nicht Supportet")
                else:
                    print("No match found.")

read_file()