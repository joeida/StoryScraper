# Story Scraper Application

### Overview
* Create a basic Story Scraping Application which allows users to store notes on scraped items.

### Objective
* Demonstrate use of node, express, html, css, routing, handlebars, Mongoose, Cheerio, and request in the creation of a basic story scraping application allowing users to store notes about scraped items.  Use MVC design pattern.
  1. Create Mongoose models as follows.
    1. Article model.
      1. title.
      2. link.
      3. note (foreign key using objectID of Note model).
    2. Note Model.
      1. title.
      2. body.
  2. Create ‘/scrape’ endpoint to scrape static web site of choice using the following.
    1. request module - to get website html content.
    2. cheerio module - to load requested website and parse information from it (scrape web site).
    3. Create new Article model object with parsed data and save to mongo DB.
  3. Create ‘/articles’ endpoint to fetch scraped information from DB.
    1. Return fetched data to front end and output to web page.
  4. Create ‘/article’ post requests for the following.
    1. Create method to fetch clicked article, add note, save to database, and re-render page to show note on page.
    2. Create method to fetch clicked article, delete note, save to database, and re-render page to delete note from page.

* Application Logic

  1. Data is scraped when the ‘/scrape’ endpoint is requested.
  2. User can click on any one of the returned results and add notes.
  3. User can input a note body and title from left input field.
  4. User will submit the note and it will save and link in the Mongo DB.
  5. New note will show up on right side of page.
  6. User has ability to delete previously entered note.
  7. User can choose another scraped item and take notes on it also.
  
### Screenshot
<img width="576" alt="storyscraper" src="https://cloud.githubusercontent.com/assets/18523345/20692863/7b9a8136-b58f-11e6-835b-6aac19bef6a5.png">

### Links
[Story Scraper Application](https://morning-wave-99812.herokuapp.com)

