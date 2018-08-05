# importing Dependencies
from bs4 import BeautifulSoup
import requests
import pymongo
from splinter import Browser
import pandas as pd
import numpy as np

def init_browser():
    executable_path = {'executable_path': 'chromedriver.exe'}
    return Browser('chrome', **executable_path, headless=False)

    # Initializing pymongo to work with MongoDB
    #conn = 'mongodb://localhost:27017'
    #client = pymongo.MongoClient(conn)

    # defining the database and collection
    #db = client.marsmission_db
    #collection = db.marsmission_db

def scrape():
    #Initialize browser
    browser = init_browser()
   

    # url of the page to be scraped
    url = 'https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest'
    browser.visit(url)

    # Scraping and storing Mars news info
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
        
# Scraping and storing Mars news info
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')

    results = soup.find('li', class_='slide')

    for result in results:
        news_title = result.find('div', class_="content_title").text
        news_p = result.find('div', class_='article_teaser_body').text
        print(news_title)
        print("--------------")
        print(news_p)
        print("-----------")

    # JPL Mars Space Image - featured image
    url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    browser.visit(url)

    featured_image_url = "https://www.jpl.nasa.gov/spaceimages/images/mediumsize/PIA02570_ip.jpg"

    # Mars weather twitter account
    url = "https://twitter.com/marswxreport?lang=en"
    browser.visit(url)

    # Scraping and storing Mahttps://www.jpl.nasa.gov/spaceimages/images/mediumsize/PIA02570_ip.jpgrs tweets info
    #for x in range(1,100):
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
        
    mars_weather = soup.find('div', 'js-tweet-text-container').text

    print(mars_weather)

    # Mars facts
    url = "https://space-facts.com/mars/"
    browser.visit(url)

    # scraping data for mars facts
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')

    mars_facts = soup.find('table', class_ = 'tablepress tablepress-id-mars').text

    print(mars_facts)

    mars_facts_list = [x.split(':') for x in mars_facts.splitlines()]
    #print(mars_facts_list)
    df = pd.DataFrame(mars_facts_list)
    df

    #df = pd.DataFrame(mars_facts)
    #df

    df = df.replace(to_replace='None', value=np.nan).dropna()

    # converting the data into a table format
    mars_facts_table = df.to_html(border=1)
    mars_facts_table

    # url's of the mars hemisphere photos
    mars_hemisphere_urls = [
        {'title':'Cerberus Hemisphere', 'img_url':'https://astrogeology.usgs.gov/cache/images/cfa62af2557222a02478f1fcd781d445_cerberus_enhanced.tif_full.jpg' },
        {'title': 'Schiaparelli Hemisphere', 'img_url': 'https://astrogeology.usgs.gov/cache/images/3cdd1cbf5e0813bba925c9030d13b62e_schiaparelli_enhanced.tif_full.jpg'},
        {'title': 'Syrtis Major Hemisphere', 'img_url': 'https://astrogeology.usgs.gov/cache/images/ae209b4e408bb6c3e67b6af38168cf28_syrtis_major_enhanced.tif_full.jpg'},
        {'title': 'Valles Marineris Hemisphere', 'img_url': 'https://astrogeology.usgs.gov/cache/images/7cf2da4bf549ed01c17f206327be4db7_valles_marineris_enhanced.tif_full.jpg'}
    ]

    # A Mars dictionary that will become a Mongodb document
    mars = {
        'title': news_title,
        'content':news_p,
        'featured_image_url':featured_image_url,
        'mars_weather':mars_weather,
        'mars_facts': mars_facts_table,    
        'mars_hemisphere_urls': mars_hemisphere_urls
    }

    return mars
